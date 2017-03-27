/**
 * 求知子页面界面逻辑
 */
var pageIndex = 1; //当前页数
var totalPage; //总页数
var channelInfo; //选择的话题
var allChannels; //所有的话题
var answerIsReady = false; //页面已就绪
mui.init();
var lazyLoadApi = mui('#pullrefresh').imageLazyload({
	autoDestroy: false,
	placeholder: '../../image/utils/default_load_2.gif'
});
mui.plusReady(function() {
	mui.fire(plus.webview.getWebviewById('qiuzhi_home.html'), 'subIsReady');
	events.preload("qiuzhi-answerDetail.html", 80);
	window.addEventListener('answerIsReady', function() {
		answerIsReady = true;
	})

	window.addEventListener('channelInfo', function(e) {

		console.log('求知子页面获取的 :' + JSON.stringify(e.detail.data))
		pageIndex = 1; //当前页数
		totalPage = 0; //总页数
		channelInfo = e.detail.data.curChannel; //选择的话题
		allChannels = e.detail.data.allChannels; //所有的话题
		//话题--求知
		//		mod.model_Channel = {
		//			TabId: '', //话题ID
		//			ChannelCode: '', //话题编号
		//			ChannelName: '' //话题名称
		//		}
		//获取所有符合条件问题
		requestChannelList(channelInfo);
		//清理问题列表
		events.clearChild(document.getElementById('list-container'));
		//清理专家列表
		resetExpertsList();
		//2.获取符合条件的专家信息
		getExpertsArray(channelInfo.TabId);

	});
	window.addEventListener("refreshQuestionList", function() {
		pageIndex = 1;
		//清理问题列表
		events.clearChild(document.getElementById('list-container'));
		//清理专家列表
		resetExpertsList();
		//2.获取符合条件的专家信息
		getExpertsArray(channelInfo.TabId);
		//刷新的界面实现逻辑
		requestChannelList(channelInfo);
	})

	//加载h5下拉刷新方式
	h5fresh.addRefresh(function() {
		pageIndex = 1;
		//清理问题列表
		events.clearChild(document.getElementById('list-container'));
		//清理专家列表
		resetExpertsList();
		//2.获取符合条件的专家信息
		getExpertsArray(channelInfo.TabId);
		//刷新的界面实现逻辑
		requestChannelList(channelInfo);
	}, {
		style: 'circle',
	});
	setListener();
	pullUpFresh();
});

/**
 * 请求专家数据
 * //2.获取符合条件的专家信息
 */
function getExpertsArray(channelId) {
	//需要加密的数据
	var comData = {
		askId: '0', //问题ID，传入0，则不包括问题参数
		userIds: '[0]', //用户编号列表,Array,传入0，获取所有专家
		channelId: channelId.toString(), //话题ID,传入0，获取所有话题数据
		pageIndex: '1', //当前页数
		pageSize: '10' //每页记录数,传入0，获取总记录数
	};
	// 等待的对话框
	var wd = events.showWaiting();
	//2.获取符合条件的专家信息
	postDataQZPro_getExpertsByCondition(comData, wd, function(data) {
		console.log('2.获取符合条件的专家信息:' + data.RspCode + ',RspData:' + JSON.stringify(data.RspData) + ',RspTxt:' + data.RspTxt);
		if(data.RspCode == 0) {
			//添加人员信息
			//回调中的临时数据
			var tempRspData = data.RspData.Data;
			//获取当前回调的个人信息，主要是头像、昵称
			var tempArray = [];
			//先遍历回调数组，获取
			for(var item in tempRspData) {
				//当前循环的model
				var tempModel0 = tempRspData[item];
				//将当前model中id塞到数组
				tempArray.push(tempModel0.UserId);
			}
			//给数组去重
			tempArray = arrayDupRemoval(tempArray);
			//发送获取用户资料申请
			var tempData = {
				vvl: tempArray.join(), //用户id，查询的值,p传个人ID,g传ID串
				vtp: 'g' //查询类型,p(个人)g(id串)
			}
			console.log('tempData:' + JSON.stringify(tempData));
			// 等待的对话框
			var wd2 = events.showWaiting();
			//21.通过用户ID获取用户资料
			postDataPro_PostUinf(tempData, wd2, function(data1) {
				console.log('21.获取个人资料success:RspCode:' + data1.RspCode + ',RspData:' + JSON.stringify(data1.RspData) + ',RspTxt:' + data1.RspTxt);
				if(data1.RspCode == 0) {
					//循环当前的个人信息返回值数组
					for(var i in data1.RspData) {
						//当前model
						var tempModel = data1.RspData[i];
						//更新头像
						tempModel.uimg = updateHeadImg(tempModel.uimg, 2);
						//循环回调数组
						for(var item in tempRspData) {
							//当前循环的model
							var tempModel0 = tempRspData[item];
							//对比id是否一致
							if(tempModel0.UserId == tempModel.utid) {
								//合并
								tempModel0 = $.extend(tempModel0, tempModel);
							}
						}
					}
				}
				console.log('专家循环遍历后的值：' + JSON.stringify(tempRspData));
				//刷新界面
				for(var i = 0; i < tempRspData.length; i++) {
					expertsItem(channelId, tempRspData[i]);
				}
				wd2.close();
			});
		} else {
			mui.toast(data.RspTxt);
		}
		wd.close();
	});
};

/**
 * 放置专家数据
 * @param {Object} channelId 话题id
 * @param {Object} data 专家数据
 */
function expertsItem(channelId, data) {
	//console.log('expertsItem ' + channelId + '|' + JSON.stringify(data));
	var element = document.createElement('a');
	element.id = 'experts_' + channelId + '_' + data.TabId;
	element.className = 'mui-control-item';
	element.setAttribute('data-info', JSON.stringify(data));
	element.innerHTML = '<img src="' + updateHeadImg(data.uimg, 2) + '" />' +
		'<p id="experts_name_' + data.TabId + '" class="mui-ellipsis" style="color:#323232;"></p>';
	var table = document.getElementById("experts_sc");
	var allExpert = document.getElementById("allExpert");
	table.insertBefore(element, allExpert);
	document.getElementById("experts_name_" + data.TabId).innerText = data.unick;
}

/**
 * 重置专家列表
 */
function resetExpertsList() {
	var table = document.getElementById("experts_sc");
	table.innerHTML = '<a id="allExpert" class="mui-control-item">' +
		'<img src="../../image/qiuzhi/expert_more.png" />' +
		'<p>查看全部</p>' +
		'</a>';
	var scroll = mui('#experts_sw').scroll();
	scroll.scrollTo(0, 0, 100); //100毫秒滚动到顶
}

/**
 * 请求求知数据
 */
//4.获取所有符合条件问题
function requestChannelList(channelInfo) {
	var personalUTID = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).utid; //当前登录账号utid
	//所需参数
	var comData = {
		userId: personalUTID, //用户ID
		askTitle: '', //问题标题,用于查找，可输入部分标题
		channelId: channelInfo.TabId, //话题ID,传入0，获取所有话题数据
		pageIndex: pageIndex, //当前页数
		pageSize: 10 //每页记录数,传入0，获取总记录数
	};
	// 等待的对话框
	var wd = events.showWaiting();
	//4.获取所有符合条件问题
	postDataQZPro_getAsksByCondition(comData, wd, function(data) {
		wd.close();
		console.log('获取所有符合条件问题:' + JSON.stringify(data));
		if(data.RspCode == 0) {
			totalPage = data.RspData.totalPage;
			//			var datas = data.RspData.Data;
			getIds(data.RspData.Data)
			//			setChannelList();
		} else {
			mui.toast(data.RspTxt);
		}
	});
}
var getIds = function(datas) {
	var personIds = [];
	for(var i in datas) {
		if(datas[i].AnswerMan) {
			personIds.push(datas[i].AnswerMan);
		}
	}
	requireInfos(datas, events.arraySingleItem(personIds));
}
/**
 * 
 * @param {Object} datasource
 * @param {Object} pInfos
 */
var requireInfos = function(datas, pInfos) {
	if(pInfos.length > 0) {
		//发送获取用户资料申请
		var tempData = {
			vvl: pInfos.toString(), //用户id，查询的值,p传个人ID,g传ID串
			vtp: 'g' //查询类型,p(个人)g(id串)
		}
		//21.通过用户ID获取用户资料
		var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
		postDataPro_PostUinf(tempData, wd, function(data) {
			wd.close();
			console.log('获取的个人信息:' + JSON.stringify(data));
			if(data.RspCode == 0) {
				rechargeInfos(datas, data.RspData);
			} else {
				setChannelList(datas);
			}
		})
	} else {
		setChannelList(datas);
	}

}
var rechargeInfos = function(datas, infos) {
	for(var i in datas) {
		for(var j in infos) {
			if(datas[i].AnswerMan == infos[j].utid) {
				datas[i].AnswerManName = infos[j].unick;
			}
		}
	}
	setChannelList(datas);
}

/**
 * 放置求知数据
 */
var setChannelList = function(data) {
	console.log('求知主界面加载的数据信息：' + JSON.stringify(data));
	var list = document.getElementById('list-container');
	for(var i in data) {
		var li = document.createElement('li');
		li.className = "mui-table-view-cell";
		li.innerHTML = getInnerHTML(data[i]);
		list.appendChild(li);
		if(li.querySelector('.answer-container')) {
			li.querySelector('.answer-container').answerInfo = data[i];
		}
		if(li.querySelector('.answer-img')) {
			li.querySelector('.answer-img').style.width = "100%";
		}
		if(li.querySelector(".clip-img")){
			li.querySelector(".clip-img").style.width=li.querySelector(".imgs-container").offsetWidth+"px";
			li.querySelector(".clip-img").style.height=li.querySelector(".imgs-container").offsetWidth*0.45+"px";
		}
		li.querySelector('.focus-status').questionInfo = data[i];
	}
	lazyLoadApi.refresh(true);
}
var getInnerHTML = function(cell) {
	console.log("回答内容：" + cell.AnswerContent);
	var inner = '<div>' +
		'<div class="channel-info">' +
		'<p class="channel-title"><img src="' + getChannelIcon(cell) + '" class="channel-icon"/>来自话题:' + cell.AskChannel + '</p>' +
		'</div>' +
		'<div class="ask-container">' +
		'<h5 class="single-line ask-title" askId="' + cell.TabId + '">' + cell.AskTitle + '</h5>';
	if(cell.AnswerContent && cell.AnswerContent.length > 0) {
		inner += '<div class="answer-container"><div class="imgs-container">' + getImgs(cell) + '</div>' +
			'<p class="answer-content triple-line" answerInfo="' + cell.AnswerId + '">' + isAnonymity(cell) + ":" + cell.AnswerContent.replace(/<[^>]*>/g, '') + '</p>' +
			'</div></div>' +
			'<div class="extra-info"></div>' +
			'<p class="question-bottom">' + cell.IsLikeNum + '赞·' + cell.CommentNum + '评论·' + setFocusCondition(cell) + '</p></div>'
	} else {
		inner += '<p class="question-bottom">' + setFocusCondition(cell) + '</p></div>'
	}
	return inner;
}
var isAnonymity = function(cell) {
	if(cell.IsAnonym) {
		return "匿名用户"
	}
	return cell.AnswerManName;
}
var setFocusCondition = function(cell) {
	if(cell.IsFocused) {
		return '<span class="focus-status">已关注<span>';
	}
	return '<span class="focus-status">关注问题<span>';
}
var getImgs = function(cell) {
	if(cell.AnswerCutImg && cell.AnswerCutImg != "") {
		var imgArray = cell.AnswerEncAddr.split('|');
		var clipImg = cell.AnswerCutImg;
		imgInner = '<img class="clip-img" data-lazyload="' + clipImg + '"/>';
		return imgInner;
	}
	return '';
}
/**
 *
 * @param {Object} cell
 */
var getChannelIcon = function(cell) {
	var iconSourse = "../../image/qiuzhi/";
	switch(cell.AskChannel) {
		case "教学":
			iconSourse += "channel-edu.png";
			break;
		case "美食":
			iconSourse += "channel-food.png";
			break;
		case "健康":
			iconSourse += "channel-health.png";
			break;
		case "其他":
			iconSourse += "channel-others.png";
			break;
		case "科普":
			iconSourse += "channel-science.png";
			break;
		default:
			iconSourse = "";
			break;
	}
	return iconSourse;
}
/**
 * 上拉加载的实现方法
 */
var pullUpFresh = function() {
	document.addEventListener("plusscrollbottom", function() {
		console.log('我在底部pageIndex:' + pageIndex + ':总页数:' + totalPage);
		if(pageIndex < totalPage) {
			pageIndex++;
			requestChannelList(channelInfo);
		} else {
			mui.toast('到底啦，别拉了！');
		}
	}, false);
}
/**
 * 各种监听事件
 */
var setListener = function() {
	events.addTap('submit-question', function() {
		console.log(JSON.stringify(allChannels))
		events.openNewWindowWithData('qiuzhi-newQ.html', { curChannel: channelInfo, allChannels: allChannels });
	});

	//标题点击事件
	mui('.mui-table-view').on('tap', '.ask-title', function() {
		events.openNewWindowWithData('qiuzhi-question.html', {
			askID: this.getAttribute('askId'), //问题id
			channelInfo: channelInfo, //当前话题
			allChannels: allChannels //全部话题
		});
	});

	//点击回答
	mui('.mui-table-view').on('tap', '.answer-container', function() {
		fireToPageReady(1, this.answerInfo)
		//		events.fireToPageNone('qiuzhi-answerDetailSub.html', 'answerInfo', this.answerInfo);
		//		console.log('传递的answerInfo:' + JSON.stringify(this.answerInfo));
		//		plus.webview.getWebviewById('qiuzhi-answerDetail.html').show();
	});

	//点击专家列表
	mui('#experts_sc').on('tap', '.mui-control-item', function() {
		//console.log('点击专家列表 ' + this.id);
		//console.log('当前话题的信息 ' + JSON.stringify(channelInfo));
		if(this.id == 'allExpert') { //查看某个话题的全部专家
			events.openNewWindowWithData('experts_main.html', {
				askID: '0',
				channelInfo: channelInfo, //当前话题
				allChannels: allChannels //所有话题
			});
		} else { //查看某个话题的某个专家
			//console.log('当前专家的信息 ' + JSON.stringify(JSON.parse(this.getAttribute('data-info'))));
			events.openNewWindowWithData('expert-detail.html', JSON.parse(this.getAttribute('data-info')));
		}
	});
	mui(".mui-table-view").on('tap', '.focus-status', function() {
		setQuestionFocus(this);
	})
}
//关注问题
var setQuestionFocus = function(item) {
	var wd = events.showWaiting();
	var questionInfo = item.questionInfo;
	console.log('当前问题信息：' + JSON.stringify(questionInfo));
	var selfId = myStorage.getItem(storageKeyName.PERSONALINFO).utid;
	postDataQZPro_setAskFocus({
		userId: selfId, //用户ID
		askId: questionInfo.TabId, //问题ID
		status: questionInfo.IsFocused ? 0 : 1 //关注状态,0 不关注,1 关注
	}, wd, function(data) {
		wd.close();
		if(data.RspCode == 0 && data.RspData.Result) {
			if(questionInfo.IsFocused) { //原来是已关注
				item.questionInfo.IsFocused = 0;
				item.innerText = "关注问题";
			} else { //原来是未关注
				item.questionInfo.IsFocused = 1;
				item.innerText = "已关注";
			}
		} else {
			mui.toast('设置关注失败');
		}
	})
}
/**
 *
 * @param {Object} type 0问题 1答案
 */
var fireToPageReady = function(type, options) {
	console.log("answerIsReady:" + answerIsReady)
	if(type) {
		if(answerIsReady) { //求知回答界面已加载完毕
			events.closeWaiting();
			events.fireToPageNone('qiuzhi-answerDetailSub.html', 'answerInfo', options);
			plus.webview.getWebviewById('qiuzhi-answerDetail.html').show("slide-in-right", 250);
		} else {
			setTimeout(function() {
				events.showWaiting();
				fireToPageReady(type, options);
			}, 500);
		}
	}
}