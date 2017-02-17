/**
 * 与我相关界面
 * 逻辑部分
 * @anthor an
 */
//页码，请求第几页数据
var pageIndex = 1;
//每页条数
var pageCount = 10;
//当前留言的总条数
var totalPage = 0;
//提醒总页码
var alertTotalPage = 0;
//获取个人信息                                                        
var personalUTID;
//判断是加载更多1，还是刷新2
var flag = 2;
var pId;
var pName;
var msgType = 0; //消息类型
var comData = {}; //回复传值
var repliedCell;
var repliedItem; //回复的对象
//页码请求到要显示的数据，array[model_userSpaceAboutMe]
var aboutMeArray = [];
mui.init();
mui.plusReady(function() {
		var pInfo = window.myStorage.getItem(window.storageKeyName.PERSONALINFO);
		personalUTID = pInfo.utid;
		pId = parseInt(pInfo.utid);
		pName = pInfo.unick;
		initNativeObjects();
		//页码1
		pageIndex = 1;
		//请求并放置数据
		requestData();
		addReplyView();
		addReplyLisetner();
	})
	/**
	 * 界面放置数据
	 * @param {Object} data 请求成功后返回的数据
	 */
var setData = function(data) {
		var list = document.getElementById('list-container');
		data.forEach(function(cell, i) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = createInner(cell);
			if(cell.MsgType != 6&& cell.MsgType!=3) {
				li.querySelector('.reply').cell = cell;
			}
			list.appendChild(li);
		})
	}
	/**
	 * 创建Inner
	 * @param {Object} cell
	 */
var createInner = function(cell) {
	var cellData = getCellData(cell);
	if(cellData.MsgType != 6) {
		var inner = '<a>' +
			'<div class="cell-title">' +
			'<img class="title-img" headId="' + cellData.headID + '" src="' + ifHaveImg(cellData) + '"/>' +
			zanNoReply(cellData.MsgType) +
			'<div class="title-words">' +
			'<h4 class="title-title">' + cellData.title + '</h4>' +
			'<p class="title-words">' + events.shortForDate(cellData.time) + '</p>' +
			'</div>' +
			'</div>' +
			//最新内容
			'<p class="comment-content single-line">' + ifHave(cellData.content) + '</p>' +
			ifHaveReferContent(cellData) +
			'<div class="extras">' + ifHave(cellData.messages) + '</div>'
		'</a>';
	} else {
		var inner = '<div class="cell-title">' +
			'<img class="title-img" headId="' + cellData.headID + '" src="' + ifHaveImg(cellData) + '"/>' +
			//		'<span class="reply">回复</span>' +
			'<div class="title-words">' +
			'<h4 class="title-title">' + cellData.title + '</h4>' +
			'<p class="title-words">' + events.shortForDate(cellData.time) + '</p>' +
			'</div>' +
			'</div>' +
			'<p class="comment-content">' + ifHave(cellData.UserContent) + '</p>' +
			//		'<div class="refer-content">' + '<span>' + cellData.UserOwnerNick + ':</span>' + ifHave(cellData.referContent) + '</div>' +
			//		'<div class="extras">' + ifHave(cellData.messages) + '</div>'
			'</a>';
	}
	return inner;
}
var zanNoReply=function(msgType){
	if(msgType==3){
		return '';
	}
	return '<span class="reply">回复</span>';
}
var ifHaveReferContent = function(cellData) {
	if(cellData.referContent) {
		return '<div class="refer-content single-line">' + '<span>' + cellData.UserOwnerNick + ':</span>' + cellData.referContent + '</div>'
	} else {
		return '';
	}
}
var addReplyView = function() {
	mui('.mui-table-view').on('tap', '.reply', function() {
		var replyContainer = document.getElementById('footer');
		replyContainer.style.display = 'block';
		showSoftInput('#msg-content');
		repliedCell = this.cell;
		repliedItem = this.parentElement.parentElement.querySelector(".extras");
		console.log('点击的回复包含数据：' + JSON.stringify(repliedCell));
		msgType = this.cell.MsgType;
		document.getElementById('msg-content').value = '';
	})
	mui('.mui-table-view').on('tap', '.title-img', function() {
		var id = this.getAttribute('headId');
		console.log(id);
		mui.openWindow({
			url: 'zone_main.html',
			id: 'zone_main.html',
			styles: {
				top: '0px', //设置距离顶部的距离
				bottom: '0px'
			},
			extras: {
				data: id,
				NoReadCnt: 0
			}

		});
	})
}
var addReplyLisetner = function() {
		document.getElementById("msg-content").onblur = function() {
			document.getElementById('footer').className = '';
			document.getElementById('footer').style.display = 'none';
		}
		events.addTap('btn-reply', function() {

			var replyValue = document.getElementById('msg-content').value;
			console.log('监听没反应' + replyValue)
			if(replyValue) {
				postReply(function() {
					document.getElementById('footer').className = '';
					document.getElementById('footer').style.display = 'none';
					jQuery('#msg-content').blur();
					var p = document.createElement('p');
					p.className = "single-line";
					p.innerHTML = '<span>' + pName + '</span>回复<span>' + events.shortForString(repliedCell.MaxUserName, 4) + ':</span>' + replyValue;
					//				<p class="single-line" ><span>' + msg.MsgFromName + '</span>回复<span>' + msg.MsgToName + ':</span>' + msg.MsgContent + '</p>'
					repliedItem.appendChild(p);
				})
			} else {
				mui.toast('请输入回复内容！')
			}
		})
	}
	/**
	 * 
	 * @param {Object} callback
	 */
var postReply = function(callback) {
	var msgContent = document.getElementById('msg-content');
	console.log('类型:' + msgType)
	switch(msgType) {
		//1为其他用户评论
		case 1:
			//2为评论的回复
		case 2:
			//3为其他用户点赞
		case 3:

			var comData = {
				userId: pId, //用户ID
				upperId: repliedCell.TabId, //上级评论ID
				replyUserId: repliedCell.MaxUser, //回复ID
				userSpaceId: repliedCell.SpaceId, //用户空间ID
				commentContent: msgContent.value //回复内容
			};
			console.log('开始post回复数据' + JSON.stringify(comData));
			var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
			postDataPro_addUserSpaceCommentReply(comData, wd, function(data) {
				console.log('发布回复后返回的数据：' + JSON.stringify(data))
				wd.close();
				if(data.RspCode == 0) {
					callback();
				}
			})
			break;

			//4为其他用户留言
		case 4:
			//5为留言的回复
		case 5:
			var comData = {
				userId: pId, //用户ID
				upperId: repliedCell.TabId, //上级评论ID
				replyUserId: repliedCell.MaxUser, //回复ID
				userOwnerId: repliedCell.UserOwnerId, //用户空间ID
				msgContent: msgContent.value //回复内容
			};
			var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
			postDataPro_addUserSpaceMsgReply(comData, wd, function(data) {
				wd.close();
				if(data.RspCode == 0) {
					callback();
				}
			})
			break;
		default:
			break;
	}
}

var ifHave = function(data) {
	return data ? data : '';
}
var ifHaveImg = function(cellData) {
		if(cellData.headImg) {
			return cellData.headImg;
		} else if(cellData.UserImg) {
			return cellData.UserImg;
		} else {
			return '../../image/utils/default_personalimage.png'
		}

	}
	/**
	 * 根据获取信息 设置
	 * @param {Object} cell 单个cell数据
	 */
var getCellData = function(cell) {
	var cellData = new Object();
	cellData.MsgType = cell.MsgType;
	cellData.UserName = cell.UserName;
	if(cell.MsgType==6) {
		cellData.headID = cell.UserId;
	} else {
		cellData.headID = cell.MaxUser;
	}
	cellData.UserImg = cell.UserImg;
	cellData.UserContent = cell.Content;
	cellData.headImg = cell.MaxUserImg;

	cellData.content = cell.MaxContent;
	cellData.referContent = cell.MsgContent;
	cellData.UserOwnerNick = cell.UserOwnerNick;
	switch(cell.MsgType) {
		//其他用户评论
		case 1:
			cellData.title = events.shortForString(cell.MaxUserName, 4) + ' 评论了我';

			break;
			//评论的回复
		case 2:
			cellData.title = events.shortForString(cell.MaxUserName, 4) + " 回复";
			break;
			//其他用户点赞
		case 3:
			cellData.title = events.shortForString(cell.MaxUserName, 4) + " 赞了我";
			break;
			//其他用户留言
		case 4:
			cellData.title = events.shortForString(cell.MaxUserName, 4) + " 给我留言";
			break;
			//留言的回复
		case 5:
			cellData.title = events.shortForString(cell.MaxUserName, 4) + " 给我留言的回复";
			break;
		case 6:
			cellData.title = events.shortForString(cell.UserName, 4) + ' 的作业提醒';
			break;
		default:
			break;
	}
	cellData.time = cell.MsgDate;
	if(cellData.MsgType != 6) {
		var messages = new Array();
		if(cellData.MsgType != 4) {
			if(cell.Content) {
				messages.push('<p class="single-line"><span>' + events.shortForString(cell.UserName, 4) + ':</span>' + cell.Content + '</p>')
			}
		}

		if(cell.MsgArray && cell.MsgArray.length > 0) {
			cell.MsgArray.forEach(function(msg, i, msgArray) {
				if(msg.MsgContent) {
					if(msg.MsgToName) {
						messages.push('<p class="single-line" ><span>' +events.shortForString(msg.MsgFromName, 4)  + '</span>回复<span>' +events.shortForString(msg.MsgToName, 4)  + ':</span>' + msg.MsgContent + '</p>');
					} else {
						messages.push('<p class="single-line" ><span>' + events.shortForString(msg.MsgFromName, 4) + ':</span>' + msg.MsgContent + '</p>');
					}
				}

			});
		}
		cellData.messages = messages.join('');
	}

	return cellData;
}

/**
 * 请求数据
 * @param {Object} callback 请求数据后的回调
 */
function requestData() {
	if(pageIndex > 1) {
		if(pageIndex <= totalPage) {
			requireAboutMe();
		} else if(pageIndex <= alertTotalPage) {
			requireHomeworkAlert();
		}
	} else {
		requireAboutMe();
	}
}
var getRoleInfos = function(tempRspData) {
	var idsArray = [];
	for(var i in tempRspData) {
		idsArray.push(tempRspData[i].UserId);
		if(tempRspData[i].MsgType != 6) {
			idsArray.push(tempRspData[i].MaxUser);
			idsArray.push(tempRspData[i].UserOwnerId);
			for(var j in tempRspData[i].MsgArray) {
				idsArray.push(tempRspData[i].MsgArray[j].MsgFrom);
				idsArray.push(tempRspData[i].MsgArray[j].MsgTo);
			}
		}
	}
	console.log('身份数组：' + idsArray);
	if(idsArray.length > 0) {
		idsArray = events.arraySingleItem(idsArray);
		//发送获取用户资料申请
		var tempData = {
			vvl: idsArray.toString(), //用户id，查询的值,p传个人ID,g传ID串
			vtp: 'g' //查询类型,p(个人)g(id串)
		}
		console.log('tempData:' + JSON.stringify(tempData));
		var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
		//21.通过用户ID获取用户资料
		postDataPro_PostUinf(tempData, wd, function(infos) {
			wd.close();
			console.log('获取个人资料success:RspCode:' + JSON.stringify(infos));
			if(infos.RspCode == 0) {
				var rechargedData = replenishData(tempRspData, infos.RspData);
				console.log('最终数据：' + JSON.stringify(rechargedData));
				setData(rechargedData);
			}

		});
	}
};
var setCommentMsgReadByUser = function() {
	var comData = {
		userId: personalUTID, //用户ID
		spaceTypes: '[4,5,6,7,8]'
	}
	var wd;
	postDataPro_setCommentMsgReadByUser(comData, wd, function(data) {
		console.log('与我相关设置成已读success:RspCode:' + JSON.stringify(data));
	})

}
var replenishData = function(data, infos) {
	var hashInfos = rechargeArraysToHash(infos);
	for(var i in data) {
		data[i].UserName = hashInfos[data[i].UserId].unick;
		data[i].UserImg = hashInfos[data[i].UserId].uimg;
		if(data[i].MsgType != 6) {
			data[i].MaxUserName = hashInfos[data[i].MaxUser].unick;
			data[i].MaxUserImg = hashInfos[data[i].MaxUser].uimg;
			data[i].UserOwnerNick = hashInfos[data[i].UserOwnerId].unick;
			//		idsArray.push(tempRspData[i].MaxUser);
			for(var j in data[i].MsgArray) {
				data[i].MsgArray[j].MsgFromName = hashInfos[data[i].MsgArray[j].MsgFrom] ? hashInfos[data[i].MsgArray[j].MsgFrom].unick : '数据错误'
				data[i].MsgArray[j].MsgToName = hashInfos[data[i].MsgArray[j].MsgTo] ? hashInfos[data[i].MsgArray[j].MsgTo].unick : '数据错误'
			}
		}

	}
	return data;
}
var rechargeArraysToHash = function(infos) {
	var hash = new Object();
	infos.forEach(function(info) {
		hash[info.utid] = info;
	});
	return hash;
}

/**
 * 加载刷新
 */
events.initRefresh('list-container',
	function() {
		pageIndex = 1;
		requestData();
	},
	function() {
		console.log('请求页面：page：' + pageIndex + ',总页面：' + totalPage + '，作业提醒总页数：' + alertTotalPage);
		mui('#refreshContainer').pullRefresh().endPullupToRefresh(pageIndex >= totalPage && pageIndex >= alertTotalPage);
		if(pageIndex < totalPage || pageIndex < alertTotalPage) {
			pageIndex++;
			requestData();
		}
	});
/**
 * 获取与我相关
 */
var requireAboutMe = function() {
		var comData = {
			userId: personalUTID, //用户ID
			pageIndex: pageIndex + '', //当前页数
			pageSize: pageCount + '' //每页记录数
		};
		var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
		//56.（用户空间）获取与我相关
		postDataPro_getAboutMe(comData, wd, function(data) {
			wd.close();
			console.log('获取的与我相关的数据：' + JSON.stringify(data));
			if(data.RspCode == '0000') {
				setCommentMsgReadByUser();
				totalPage = data.RspData.TotalPage;
				if(pageIndex == 1 || pageIndex <= alertTotalPage) {
					requireHomeworkAlert(data.RspData.Data);
				} else {
					getRoleInfos(data.RspData.Data)
				}

			} else {
				mui.toast(data.RspTxt);
			}
		});
	}
	/**
	 * 获取作业提醒并和与我相关的消息合并
	 * @param {Object} aboutMeData 与我相关的数据
	 */
var requireHomeworkAlert = function(aboutMeData) {
		var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
		//	userId，学生/家长Id；
		//pageIndex，页码，从1开始；
		//pageSize，每页记录数；
		postDataPro_GetHomeworkAlert({
			userId: personalUTID,
			pageIndex: pageIndex,
			pageSize: 5
		}, wd, function(data) {
			wd.close();
			console.log('与我相关界面获取的作业提醒：' + JSON.stringify(data));
			if(data.RspCode == 0) {
				alertTotalPage = data.RspData.TotalPage;
				if(!aboutMeData) {
					aboutMeData = [];
				}
				for(var i in data.RspData.Data) {
					data.RspData.Data[i].MsgDate = new Date(data.RspData.Data[i].MsgDate).Format('yyyy-MM-dd HH:mm:ss')
				}
				//拼接数据
				var allData = aboutMeData.concat(data.RspData.Data);
				//数据排序
				allData.sort(function(a, b) {
					return -((new Date(a.MsgDate.replace(/-/g, '/')).getTime()) - (new Date(b.MsgDate.replace(/-/g, '/')).getTime()));
				})
				console.log('与我相关界面获取的所有数据:' + JSON.stringify(allData))
					//获取人员信息
				getRoleInfos(allData);
			} else {
				mui.toast(data.RspTxt);
			}
		})
	}
	//格式化日期
Date.prototype.Format = function(fmt) {
	var o = {
		"y+": this.getFullYear(),
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S+": this.getMilliseconds() //毫秒
	};
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			if(k == "y+") {
				fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
			} else if(k == "S+") {
				var lens = RegExp.$1.length;
				lens = lens == 1 ? 3 : lens;
				fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
			} else {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
	}
	return fmt;
}