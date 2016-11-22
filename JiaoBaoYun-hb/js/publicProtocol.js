//本页面存放界面中需要的协议，接口作用、需要传值内容、调用的方法

//本地存储
document.write('<script src="../../js/libs/myStorage/myStorage.js"><\/script>');
document.write('<script src="../../js/storageKeyName.js"><\/script>');
//加密
document.write('<script src="../../js/libs/RSA/Barrett.js"><\/script>');
document.write('<script src="../../js/libs/RSA/BigInt.js"><\/script>');
document.write('<script src="../../js/libs/RSA/RSA.js"><\/script>');
document.write('<script src="../../js/utils/RSAEncrypt.js"><\/script>');
//网络请求
document.write('<script src="../../js/utils/postData.js"><\/script>');
//签名
document.write('<script src="../../js/libs/crypto-js/require.js"><\/script>');
//document.write('<script src="../../js/utils/sortSign.js"><\/script>');
document.write('<script src="../../js/utils/signHmacSHA1.js"><\/script>');
document.write('<script src="../../js/libs/jquery.js"><\/script>');


	//6.用户修改各项用户信息
//调用方法
//var comData = {
//	vtp: 'unick', //uimg(头像),utxt(签名),unick(昵)称,usex(性别),uemail(邮件)
//	vvl: '测试修改昵称'//对应的值
//}; 
//// 等待的对话框
//var wd = plus.nativeUI.showWaiting(storageKeyName.WAITING);
//var postDataPro_jiaobaoYunPro_PostReUinf(comData, wd, function(data) {
//	wd.close();
//	console.log('90909090success:RspCode:' + data.RspCode + ',RspData:' + JSON.stringify(data.RspData) + ',RspTxt:' + data.RspTxt);
//	if(data.RspCode == 0) {
//
//	} else {
//		mui.toast(data.RspTxt);
//	}
//});

var postDataPro_PostReUinf=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostReUinf', enData, commonData, 1, wd, callback);
}

//7.用户创建群
//	//需要参数
//	var comData = {
//		gname: '测试群名',//群名
//		gimg: 'jjjjjjj',//群头像
//	};
var postDataPro_PostCrGrp=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostCrGrp', enData, commonData, 1, wd, callback);
}

//8.用户修改群各项信息
//	//需要参数
//	var comData = {
//		vtp: 'gname',//指更改用户信息的相应项,对应后面的vvl值,gimg(头像),gname(群名)
//		vvl: '测试修改群名',//要修改成的值
//		rid: '3'//要修改的群id
//	};
var postDataPro_PostReGinfo=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostReGinfo', enData, commonData, 1, wd, callback);
}

//9.获取用户群
//获取个人信息
//	var personalUTID = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).utid;
//	//需要参数
//	var comData = {
//		vtp: 'cg', //要获取的项:cg(创建的群),ug(参与群),mg(协管的群),ag(所有的群),ig(群信息vvl对应群ID)
//		vvl: personalUTID//查询的各项，对应人的utid，可以是查询的任何人
//	};
//返回值model：model_groupList
var postDataPro_PostGList=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostGList', enData, commonData, 1, wd, callback);
}

//10.Token续订(之前有过相同登陆数据的才能续订成功)
//获取个人信息
//		var personalUTID = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).utid;
//		//需要参数
//		var comData = {
//			uuid: plus.device.uuid,
//			utid: personalUTID,
//			appid: plus.runtime.appid
//		};
//修改本地存储中的值，返回值
//window.myStorage.getItem(window.storageKeyName.PERSONALINFO).token = data.RspData;
var postDataPro_PostTokenRenew=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostTokenRenew', enData, commonData, 0, wd, callback);
}

//11.通过用户账号和手机号搜索用户
//		//需要参数
//		var comData = {
//			vvl: '111111'//查询的值
//		};
//返回值model：model_userInfo
var postDataPro_PostUList=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostUList', enData, commonData, 1, wd, callback);
}

//12.邀请用户入群
//		//需要参数
//		var comData = {
//			gid: '111111',//群ID
//			beinvutid:'',//被邀请人ID
//			beinvnick:'',//被邀请人昵称
//			mstype:'',//被邀请人类型,0家长,2老师,3学生
//			stat:'',//入群状态,0待审,1同意
//			lnkinfid:'',//关联资料ID,无资料关联填写0
//			urel:'',//与资料关系,与资料关系,一般申请加入家长的时候填写,如爸爸,妈妈,其他类型留空
//			vtp:''//邀请类型,0老师邀请家长,1个人申请入群,2群员邀请群员
//		};
var postDataPro_PostInvGuser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostInvGuser', enData, commonData, 1, wd, callback);
}

//13.通过群ID获取群的正常用户
//		//需要参数
//		var comData = {
//			top: '',//选择条数
//			vvl:'',//群ID，查询的值
//			vvl1:''//群员类型，0家长,1管理员,2老师,3学生,-1取全部
//		};
//返回值model：model_groupNormalUser
var postDataPro_PostGusers=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostGusers', enData, commonData, 1, wd, callback);
}

//14.验证Token是否已过期
//获取个人信息
//		var personalToken = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).token;
//		//需要参数
//		var comData = {
//			token: personalToken
//		};
var postDataPro_PostVerifyToken=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostVerifyToken', enData, commonData, 0, wd, callback);
}

//15.用户添加资料
//		//所需参数
//		var comData = {
//			gid: '',//群ID
//			stuname:'',//资料名
//			stuimg:'',//资料头像
//			mstype:'',//资料类型，0家长,2老师,3学生
//			job:'',//职位，老师用,其他填0
//			title:'',//职称，老师用,其他填0
//			expsch:'',//教龄，老师用,其他填0
//			sub:'',//科目，老师用,其他填0
//			gutid:''//关联的群账号ID，用户在群里的账号ID,无则为0
//		};
var postDataPro_PostGAddUInf=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostGAddUInf', enData, commonData, 1, wd, callback);
}

//16.通过群ID获取群对象资料
//所需参数
//		var comData = {
//			top: '',//选择条数,-1为全部
//			vvl:'',//群ID,查询的值
//			vvl1:''//类型,0家长,1管理员,2老师,3学生,-1全部
//		};
//返回值model：model_groupStus
var postDataPro_PostGUInf=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostGUInf', enData, commonData, 1, wd, callback);
}

//17.通过审批者ID获取相应的入群邀请或申请
//所需参数
//		var comData = { 
//			vtp: ''//获取项，要获取的项:inv(入群邀请),app(入群申请)
//		};
//返回值model：model_groupRequestUser
var postDataPro_PostGrInv=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostGrInv', enData, commonData, 1, wd, callback);
}

//18.管理员审批用户入群
//所需参数
//		var comData = {
//			gutid: '',//申请记录ID，
//			stat:'',//入群状态，0拒绝,后面的字段填0即可,1通过
//			mstype:'',//审批用户类型，0家长,2老师,3学生
//			lnkinfid:'',//关联资料ID，无资料关联填写0
//			urel:''//与资料关系，与资料关系,一般申请加入家长的时候填写,如爸爸,妈妈,其他类型留空
//		};
var postDataPro_PostJoinDo=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostJoinDo', enData, commonData, 1, wd, callback);
}

//19.用户申请入群
//所需参数
//		var comData = {
//			gid: '',//群ID
//			beinvnick:'',//申请人昵称
//			mstype:'',//申请成为，0家长,2老师,3学生
//			urel:''//备注，与资料关系，与资料关系,一般申请加入家长的时候填写,如爸爸,妈妈,其他类型留空
//		};
var postDataPro_PostJoinGuser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostJoinGuser', enData, commonData, 1, wd, callback);
}

//20.用户审批申请
//所需参数
//		var comData = {
//			gutid: '',//申请ID
//			stat:''//状态,0拒绝,1同意
//		};
var postDataPro_PostInvDo=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostInvDo', enData, commonData, 1, wd, callback);
}

//21.通过用户ID获取用户资料
//所需参数
//		var comData = {
//			vvl:''//用户id
//		};
//返回值model：model_userInfo
var postDataPro_PostUinf=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostUinf', enData, commonData, 1, wd, callback);
}

//22.通过用户资料ID获取用户各项资料
//所需参数
//		var comData = {
//			vvl:''//查询的用户资料ID
//		};
//返回值model：model_userDataInfo
var postDataPro_PostUuinf=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostUuinf', enData, commonData, 1, wd, callback);
}


//23.通过用户资料ID或关联ID更改各类型资料
//所需参数
//		var comData = {
//			vtp:'',//更新资料类型,stu:学生,tec:老师,gen:家长关系
//			stuid:'',//资料ID,更新学生老师必填,关系留0
//			stuname:'',//资料名称
//			stuimg:''//资料头像,学生必填,其他留0
//			job:'',//职位,老师必填,其他留空
//			title:'',//职称,老师必填,其他留空
//			expsch:'',//教龄,老师必填,其他留空
//			sub:'',//科目,老师必填,其他留空
//			ustuid:'',//关联ID,更新与家长关系必填,其他留空
//			urel:''//关系,更新与家长关系必填,其他留空
//		};
var postDataPro_PostReStu=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostReStu', enData, commonData, 1, wd, callback);
}


//24.通过用户表ID获取用户关联的学生
//所需参数
//		var comData = {
//		};
//返回值model：model_userDataInfo
var postDataPro_PostUstu=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostUstu', enData, commonData, 1, wd, callback);
}


//25.用户注销
//所需参数
//		var comData = {
//		};
var postDataPro_PostLoginOut=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINURL + 'PostLoginOut', enData, commonData, 1, wd, callback);
}



//家校圈接口


//1.（点到记事）获取用户未读点到记事条数
//所需参数
//		var comData = {
//			userId: ''//用户ID
//		};
//var postDataPro_getNoReadNotesCntByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/getNoReadNotesCntByUser', enData, commonData, 2, wd, callback);
//}

//2.（点到记事）获取用户未读点到记事列表
//所需参数
//		var comData = {
//			userId: ''//用户ID
//			pageIndex: '',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList,model_userNoteInfo
//var postDataPro_getNoReadNotesByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/getNoReadNotesByUser', enData, commonData, 2, wd, callback);
//}

//3.（点到记事）获取用户针对某学生未读点到记事条数
//所需参数
//		var comData = {
//			userId: '',//用户ID--utid
//			studentId:''//学生ID----stuid
//		};
var postDataPro_getNoReadNotesCntByUserForStudent=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/getNoReadNotesCntByUserForStudent', enData, commonData, 2, wd, callback);
}

//4.（点到记事）获取用户针对某学生的点到记事列表
//所需参数
//		var comData = {
//			userId: '',//用户ID----utid
//			studentId:'',//学生ID----stuid
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList,model_userNoteInfo
var postDataPro_getNotesByUserForStudent=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/getNotesByUserForStudent', enData, commonData, 2, wd, callback);
}

//5.（点到记事）获取某学生点到记事条数
//所需参数
//		var comData = {
//			studentId: ''//学生ID
//		};
//var postDataPro_getNotesCntByStudent=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/getNotesCntByStudent', enData, commonData, 2, wd, callback);
//}

//6.（点到记事）获取某学生点到记事列表
//所需参数
//		var comData = {
//			studentId:'',//学生ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList,model_userNoteInfo
//var postDataPro_getNotesByStudent=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/getNotesByStudent', enData, commonData, 2, wd, callback);
//}

//7.（点到记事）获取某条点到记事信息
//所需参数
//		var comData = {
//			noteId: ''//点到记事ID
//		};
//返回model：model_homeSchoolList,model_userNoteInfo
//var postDataPro_getNoteById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/getNoteById', enData, commonData, 2, wd, callback);
//}

//8.（点到记事）新增某学生点到记事信息
//所需参数
//		var comData = {
//			studentId: '',//用户ID----stuid
//			msgContent: '',//记事内容
//			encType: '',//附件类型,1图片2音视频
//			encAddr: '',//附件地址
//			encImg: '',//附件缩略图地址
//			teacherId: '',//发布教师ID
//			noteType: '',//点到记事类型1点到2记事
//			checkType: ''//点到类型,1 正常2 旷课3 迟到4 早退5 其他
//		};
//返回值：RspData，新增ID，非0为正确
var postDataPro_addNote=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/addNote', enData, commonData, 2, wd, callback);
}

//9.（点到记事）推送给多用户某点到记事
//所需参数
//		var comData = {
//			userIds: '',//用户ID数组，例如：[1,2,3]
//			noteId:''//点到记事ID
//		};
//1为正确
var postDataPro_addNoteForMutiUsers=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/addNoteForMutiUsers', enData, commonData, 2, wd, callback);
}

//10.（点到记事）修改某用户针对某学生所有点到记事阅读状态为已读
//所需参数
//		var comData = {
//			userId: '',//用户ID----utid
//			studentId:''//学生ID----stuid
//		};
//1为正确
var postDataPro_setNoteReadByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/setNoteReadByUser', enData, commonData, 2, wd, callback);
}

//11.（点到记事）屏蔽某学生某点到记事信息
//所需参数
//		var comData = {
//			noteId: ''//点到记事ID
//		};
//1为正确
var postDataPro_setOffNoteById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/setOffNoteById', enData, commonData, 2, wd, callback);
}

//12.（点到记事）删除某点到记事
//所需参数
//		var comData = {
//			noteId: ''//点到记事ID
//		};
//1为正确
var postDataPro_delNoteById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'note/delNoteById', enData, commonData, 2, wd, callback);
}

//13.（班级空间）获取用户未读班级空间条数
//所需参数
//		var comData = {
//			userId: ''//用户ID
//		};
//var postDataPro_getNoReadClassSpacesCntByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/getNoReadClassSpacesCntByUser', enData, commonData, 2, wd, callback);
//}

//14.（班级空间）获取用户未读班级空间列表
//所需参数
//		var comData = {
//			userId: ''//用户ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList，model_userNoteInfo
//var postDataPro_getNoReadClassSpacesByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/getNoReadClassSpacesByUser', enData, commonData, 2, wd, callback);
//}

//15.（班级空间）获取用户未读某班级空间条数
//所需参数
//		var comData = {
//			userId: '',//用户ID----utid
//			classId:''//班级ID----cid
//		};
var postDataPro_getNoReadClassSpacesCntByUserForClass=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/getNoReadClassSpacesCntByUserForClass', enData, commonData, 2, wd, callback);
}

//16.（班级空间）获取用户针对某班级的空间列表
//所需参数
//		var comData = {
//			userId: '',//用户ID----utid
//			classId:'',//班级ID----cid
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList，model_userNoteInfo
var postDataPro_getClassSpacesByUserForClass=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/getClassSpacesByUserForClass', enData, commonData, 2, wd, callback);
}

//17.（班级空间）获取某班级空间条数
//所需参数
//		var comData = {
//			classId: ''//班级ID
//		};
//var postDataPro_getClassSpacesCntByClass=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/getClassSpacesCntByClass', enData, commonData, 2, wd, callback);
//}

//18.（班级空间）获取某班级空间列表
//所需参数
//		var comData = {
//			classId:'',//班级ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList，model_userNoteInfo
//var postDataPro_getClassSpacesByClass=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/getClassSpacesByClass', enData, commonData, 2, wd, callback);
//}

//19.（班级空间）获取某条班级空间信息
//所需参数
//		var comData = {
//			classSpaceId: ''//班级空间ID
//		};
//返回model：model_userNoteInfo
//var postDataPro_getClassSpaceById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/getClassSpaceById', enData, commonData, 2, wd, callback);
//}

//20.（班级空间）新增某班级空间信息
//所需参数
//		var comData = {
//			classId: '',//班级ID
//			msgContent: '',//记事内容
//			encType: '',//附件类型,1图片2音视频
//			encAddr: '',//附件地址
//			encImg: '',//附件缩略图地址
//			teacherId: ''//发布教师ID
//		};
//非0为正确
var postDataPro_addClassSpace=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/addClassSpace', enData, commonData, 2, wd, callback);
}

//21.（班级空间）推送给多用户某班级空间
//所需参数
//		var comData = {
//			userIds: '',//用户ID数组，例如：[1,2,3]
//			classSpaceId:''//班级空间ID
//		};
//1为正确
var postDataPro_addClassSpaceForMutiUsers=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/addClassSpaceForMutiUsers', enData, commonData, 2, wd, callback);
}

//22.（班级空间）修改某用户针对某班级所有空间阅读状态为已读
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			classId:''//班级ID
//		};
//1为正确
var postDataPro_setClassSpaceReadByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/setClassSpaceReadByUser', enData, commonData, 2, wd, callback);
}

//23.（班级空间）屏蔽某班级空间信息
//所需参数
//		var comData = {
//			classSpaceId: ''//班级空间ID
//		};
//1为正确
var postDataPro_setOffClassSpaceById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/setOffClassSpaceById', enData, commonData, 2, wd, callback);
}

//24.（班级空间）删除某班级空间
//所需参数
//		var comData = {
//			classSpaceId: ''//班级空间ID
//		};
//1为正确
var postDataPro_delClassSpaceById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'classSpace/delClassSpaceById', enData, commonData, 2, wd, callback);
}

//25.（用户空间）获取用户未读用户空间条数
//所需参数
//		var comData = {
//			userId: ''//用户ID
//		};
//var postDataPro_getNoReadUserSpacesCntByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getNoReadUserSpacesCntByUser', enData, commonData, 2, wd, callback);
//}

//26.（用户空间）获取用户未读用户空间列表
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList,model_userNoteInfo
//var postDataPro_getNoReadUserSpacesByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getNoReadUserSpacesByUser', enData, commonData, 2, wd, callback);
//}

//27.（用户空间）获取用户未读某用户空间条数
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			publisherId:''//发布用户ID
//		};
//var postDataPro_getNoReadUserSpacesCntByUserForPublisher=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getNoReadUserSpacesCntByUserForPublisher', enData, commonData, 2, wd, callback);
//}

//28.（用户空间）获取用户针对某用户的空间列表
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			publisherId:'',//发布用户ID
//			noteType:'',//信息类型,1云笔记,2个人空间动态
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList,model_userNoteInfo
var postDataPro_getUserSpacesByUserForPublisher=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpacesByUserForPublisher', enData, commonData, 2, wd, callback);
}

//29.（用户空间）获取用户某条用户空间是否点赞
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			publisherId:''//发布用户ID
//		};
//data:非0为已点赞
var postDataPro_getIsLikeUserSpaceByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getIsLikeUserSpaceByUser', enData, commonData, 2, wd, callback);
}

//30.（用户空间）获取用户空间所有评论条数
//所需参数
//		var comData = {
//			userSpaceId: ''//用户空间ID
//		};
//var postDataPro_getUserSpaceCommentsCntById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceCommentsCntById', enData, commonData, 2, wd, callback);
//}

//31.（用户空间）获取用户空间所有评论
//所需参数
//		var comData = {
//			userSpaceId: ''//用户空间ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList,model_userSpaceInfo
//var postDataPro_getUserSpaceCommentsById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceCommentsById', enData, commonData, 2, wd, callback);
//}

//32.（用户空间）获取用户空间所有点赞用户
//所需参数
//		var comData = {
//			userSpaceId: ''//用户空间ID
//		};
//返回值：数组、UserId--用户ID
//var postDataPro_getIsLikeUsersById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getIsLikeUsersById', enData, commonData, 2, wd, callback);
//}

//33.屏蔽（用户空间）获取用户用户空间所有未读评论回复条数
//所需参数
//		var comData = {
//			userId: ''//用户ID
//		};
var postDataPro_getUserSpaceCommentReplysCntByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceCommentReplysCntByUser', enData, commonData, 2, wd, callback);
}

//34.屏蔽（用户空间）获取用户用户空间所有未读评论回复列表
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList，model_userSpaceInfo
var postDataPro_getUserSpaceCommentReplysByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceCommentReplysByUser', enData, commonData, 2, wd, callback);
}

//35.（用户空间）获取某用户空间条数
//所需参数
//		var comData = {
//			userId: ''//用户ID
//		};
//var postDataPro_getUserSpacesCntByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpacesCntByUser', enData, commonData, 2, wd, callback);
//}

//36.（用户空间）获取多用户空间列表
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			publisherIds:''//发布者ID，例如[1,2,3]
//		};
//返回model：model_homeSchoolList，model_userNoteInfo
var postDataPro_getUserSpacesByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpacesByUser', enData, commonData, 2, wd, callback);
}

//37.（用户空间）获取某条用户空间信息
//所需参数
//		var comData = {
//			userSpaceId: ''//用户空间ID
//		};
//返回model：model_homeSchoolList，model_userNoteInfo
//var postDataPro_getUserSpaceByIdr=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceById', enData, commonData, 2, wd, callback);
//}

//38.（用户空间）新增某用户空间信息 （云笔记）
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			msgContent:'',//记事内容
//			encType:'',//附件类型，1图片2音视频
//			encAddr:'',//附件地址
//			encImg:'',//附件缩略图地址
//			encIntro:'',//附件简介
//			noteType:''//信息类型,1云笔记2个人空间
//		};
//非0为正确
var postDataPro_addUserSpace=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/addUserSpace', enData, commonData, 2, wd, callback);
}

//39.（用户空间）推送给多用户某用户空间
//所需参数
//		var comData = {
//			userIds: '',//用户ID数组，例如][1,2,3]
//			userSpaceId:'',//用户空间ID
//		};
//1为正确
var postDataPro_addUserSpaceForMutiUsers=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/addUserSpaceForMutiUsers', enData, commonData, 2, wd, callback);
}

//40.（用户空间）新增某用户某用户空间评论
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			userSpaceId:'',//用户空间ID
//			commentContent:''//评论内容
//		};
//1为正确
var postDataPro_addUserSpaceComment=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/addUserSpaceComment', enData, commonData, 2, wd, callback);
}

//41.（用户空间）新增某用户某用户空间评论回复
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			upperId:'',//上级评论ID
//			replyUserId:'',//回复ID
//			userSpaceId:'',//用户空间ID
//			commentContent:''//回复内容
//		};
//1为正确
var postDataPro_addUserSpaceCommentReply=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/addUserSpaceCommentReply', enData, commonData, 2, wd, callback);
}

//42.（用户空间）修改某用户针对某发布用户的空间阅读状态为已读
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			publisherId:'',//发布用户ID
//		};
//1为正确
var postDataPro_setUserSpaceReadByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/setUserSpaceReadByUser', enData, commonData, 2, wd, callback);
}

//43.（用户空间）修改某用户某用户空间点赞状态为点赞
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			userSpaceId:'',//用户空间ID
//		};
//1为正确
var postDataPro_setUserSpaceLikeByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/setUserSpaceLikeByUser', enData, commonData, 2, wd, callback);
}

//44.（用户空间）修改某用户空间评论回复查看状态
//所需参数
//		var comData = {
//			userSpaceCommentId: ''//用户空间评论ID
//		};
//var postDataPro_setUserSpaceCommentReplyById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/setUserSpaceCommentReplyById', enData, commonData, 2, wd, callback);
//}

//45.（用户空间）屏蔽某用户空间信息
//所需参数
//		var comData = {
//			userSpaceId: ''//用户空间ID
//		};
//1为正确
var postDataPro_setOffUserSpaceById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/setOffUserSpaceById', enData, commonData, 2, wd, callback);
}

//46.（用户空间）删除某用户空间
//所需参数
//		var comData = {
//			userSpaceId: ''//用户空间ID
//		};
//1为正确
var postDataPro_delUserSpaceById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/delUserSpaceById', enData, commonData, 2, wd, callback);
}

//47.（用户空间）删除某条用户空间评论
//所需参数
//		var comData = {
//			userSpaceCommentId: ''//用户空间评论ID
//		};
//1为正确
var postDataPro_delUserSpaceCommentById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/delUserSpaceCommentById', enData, commonData, 2, wd, callback);
}

//48.（用户空间）获取用户空间所有留言条数
//所需参数
//		var comData = {
//			userSpaceId: ''//用户空间ID
//		};
//var postDataPro_getUserSpaceMsgsCntById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceMsgsCntById', enData, commonData, 2, wd, callback);
//}

//49.（用户空间）获取用户空间所有留言
//所需参数
//		var comData = {
//			userSpaceId: '',//用户空间ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList，model_userSpaceInfo
var postDataPro_getUserSpaceMsgsById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceMsgsById', enData, commonData, 2, wd, callback);
}

//50.（用户空间）获取用户用户空间所有未读留言回复条数
//所需参数
//		var comData = {
//			userId: ''//用户ID
//		};
//返回：未读回复条数
//var postDataPro_getUserSpaceMsgReplysCntByUser=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceMsgReplysCntByUser', enData, commonData, 2, wd, callback);
//}

//51.屏蔽（用户空间）获取用户用户空间所有未读留言回复列表
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList，model_userSpaceInfo
var postDataPro_getUserSpaceMsgReplysByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getUserSpaceMsgReplysByUser', enData, commonData, 2, wd, callback);
}

//52.（用户空间）新增某用户某用户空间留言
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			userSpaceId:'',//用户空间ID
//			msgContent:''//留言内容
//		};
//1为正确
var postDataPro_addUserSpaceMsg=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/addUserSpaceMsg', enData, commonData, 2, wd, callback);
}

//53.（用户空间）新增某用户某用户空间留言回复
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			upperId:'',//上级留言ID
//			replyUserId:'',//回复ID
//			userSpaceId:'',//用户空间ID
//			msgContent:''//回复内容
//		};
//1为正确
var postDataPro_addUserSpaceMsgReply=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/addUserSpaceMsgReply', enData, commonData, 2, wd, callback);
}

//54.（用户空间）修改某用户空间留言回复查看状态
//所需参数
//		var comData = {
//			userSpaceMsgId: ''//用户空间留言ID
//		};
//var postDataPro_setUserSpaceMsgReplyById=function(commonData, wd, callback) {
//	//需要加密的数据
//	var enData = {};
//	//发送网络请求，data为网络返回值
//	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/setUserSpaceMsgReplyById', enData, commonData, 2, wd, callback);
//}

//55.（用户空间）删除某条用户空间留言
//所需参数
//		var comData = {
//			userSpaceMsgId: ''//用户空间留言ID
//		};
//1为正确
var postDataPro_delUserSpaceMsgById=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/delUserSpaceMsgById', enData, commonData, 2, wd, callback);
}

//56.（用户空间）获取与我相关
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			pageIndex:'',//当前页数
//			pageSize:''//每页记录数
//		};
//返回model：model_homeSchoolList，model_userSpaceAboutMe
var postDataPro_getAboutMe=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getAboutMe', enData, commonData, 2, wd, callback);
}

//57.（班级空间）获取用户某条班级空间是否点赞
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			classSpaceId:''//班级空间ID
//		};
//返回非0为已点赞
var postDataPro_getIsLikeClassSpaceByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/getIsLikeClassSpaceByUser', enData, commonData, 2, wd, callback);
}

//58.（班级空间）修改某用户某班级空间点赞状态为点赞
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			classSpaceId:''//班级空间ID
//		};
//返回1为正确
var postDataPro_setClassSpaceLikeByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/setClassSpaceLikeByUser', enData, commonData, 2, wd, callback);
}

//59.（用户空间）修改某用户评论、回复、留言状态为已读
//所需参数
//		var comData = {
//			userId: '',//用户ID
//			spaceType:''//信息类型,4评论5评论回复6点赞7留言8留言回复另：打开与我相关时自动调用设为已读。打开本人空间时，请调用4、5、6设为已读，打开本人留言板时，请调用7、8设为已读。
//		};
//返回1为正确
var postDataPro_setCommentMsgReadByUser=function(commonData, wd, callback) {
	//需要加密的数据
	var enData = {};
	//发送网络请求，data为网络返回值
	postDataEncry(storageKeyName.MAINJIAOXIAOURL + 'userSpace/setCommentMsgReadByUser', enData, commonData, 2, wd, callback);
}