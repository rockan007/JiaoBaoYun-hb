mui.init()
var pInfo; //{"gid":1,"gutid":9,"utid":5,
//"ugname":"BugHunter","ugnick":"BugHunter",
//"uimg":"http://oh2zmummr.bkt.clouddn.com/headimge5.png","mstype":3}
var accountInfo;
mui.plusReady(function() {
		events.preload('zone_main.html',100);
		events.preload('../mine/qun_data_details.html',200);
		window.addEventListener('postPInfo', function(e) {
			pInfo = e.detail.data;
			console.log('獲取的個人信息：' + JSON.stringify(pInfo));
			getGroupPersonData(manageGroupPersonData);
			getAccountInfo(manageAccountInfo);
		})
		addListener();
	})
	/**
	 * 獲取個人賬號信息
	 */
var getAccountInfo = function(callback) {
	var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
	postDataPro_PostUinf({
		vvl: pInfo.utid,
		vtp: 'p'
	}, wd, function(data) {
		wd.close();
		console.log('詳細資料頁面獲取的個人資料：' + JSON.stringify(data));
		if(data.RspCode == '0000') {
			callback(data.RspData[0]);
		} else {
			mui.toast(data.RspTxt);
		}
	})
}
var manageAccountInfo = function(data) {
	accountInfo=data;
	console.log('獲取的個人賬號信息：' + JSON.stringify(data));
	//{"utid":5,"uid":"18853113151","uname":"test867830028690115",
	//"unick":"BugHunter","usex":0,"utxt":null,
	//"uimg":"http://oh2zmummr.bkt.clouddn.com/headimge5.png"}
	document.getElementById('info-headImg').src=data.uimg;
	document.getElementById('info-name').innerText=data.uname;
	document.getElementById('info-nick').innerText=data.unick;
}
/**
 *40.通过用户ID获取用户各项资料
 * @param {Object} callback
 */
var getGroupPersonData = function(callback) {
	var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
	postDataPro_PostGusinf({
		vvl: pInfo.gutid,
	}, wd, function(data) {
		wd.close();
		console.log('获取的用户群资料：' + JSON.stringify(data));
		if(data.RspCode == '0000') {
			callback(data.RspData[0]);
		} else {
			mui.toast(data.RspTxt);
		}
	})
}
var manageGroupPersonData = function(data) {
	accountInfo=data;
	console.log('获取的用户群资料：' + JSON.stringify(data));
	$.extend(pInfo,data);
	console.log('得到后的参数'+JSON.stringify(pInfo));
}
var addListener=function(){
	events.addTap('personal-space',function(){
		events.fireToPageWithData('zone_main.html','postUTID',pInfo.utid);
	})
	events.addTap('person-gData',function(){
		events.fireToPageWithData('../mine/qun_data_details.html','postPGData',pInfo);
	})
}