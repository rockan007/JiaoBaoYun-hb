//url
//data
//callback,返回方法
//waitingDialog,失败弹出框
function postData(url, data, callback, waitingDialog) {
	mui.ajax(url, {
		data: JSON.stringify(data),
		dataType: 'json',
		type: 'post',
		contentType: "application/json",
		timeout: 30000,
		success: function(data) {
			//			console.log('data.RspCode:' + data.RspCode + 'data.data:' + data.data);
			if(data.RspCode == 6) {
				renewToken();
			} else {
				callback(data);
			}
		},
		error: function(xhr, type, errorThrown) {
			//			waitingDialog.close();
			//			mui.alert("网络连接失败，请重新尝试一下", "错误", "OK", null);
			var data = {
				RspCode: '404',
				RspData: '',
				RspTxt: '网络连接失败，请重新尝试一下'
			}
			console.log('' + url + ':' + type + ',' + JSON.stringify(xhr) + ',' + errorThrown);
			callback(data);
			waitingDialog.close();
		}
	});
}
//url,
//encryData,需要加密的字段
//commonData,不需要加密的对象
//flag,0表示不需要合并共用数据，1为添加uuid、utid、token、appid普通参数，2为uuid、appid、token
//waitingDialog,等待框
//callback,返回值
function postDataEncry(url, encryData, commonData, flag, waitingDialog, callback) {
	//拼接登录需要的签名
	var signTemp = postDataEncry1(encryData, commonData, flag);

	//生成签名，返回值sign则为签名
	signHmacSHA1.sign(signTemp, storageKeyName.SIGNKEY, function(sign) {
		//组装发送握手协议需要的data
		//合并对象
		var tempData = $.extend(encryData, commonData);
		//添加签名
		tempData.sign = sign;
		// 等待的对话框
		var urlArr = url.split('/');
		console.log('postData.tempData:' + urlArr[urlArr.length - 1] + JSON.stringify(tempData));
		//发送协议
		try {
			mui.ajax(url, {
				data: JSON.stringify(tempData),
				dataType: 'json',
				type: 'post',
				contentType: "application/json",
				timeout: 30000,
				//			success: callback,
				success: function(data) {
					//				console.log('data.RspCode:' + data.RspCode + 'data.data:' + data.data);
					if(data.RspCode == 6) {
						renewToken();
					} else {
						//如果是21号协议，21.通过用户ID或ID串获取用户资料，判断返回值中，人员有没有名称，没有的话，主动给添加一个‘新用户’，
						if (urlArr[urlArr.length - 1] == 'PostUinf') {
							//找到当前的数组
							var tempArray = data.RspData;
							for (var item in tempArray) {
								var model = tempArray[item];
								if (model.unick==''||model.unick==undefined) {
									model.unick = '新用户';
								}
							}
						}
						callback(data);
					}
				},
				error: function(xhr, type, errorThrown) {
					var data = {
						RspCode: '404',
						RspData: '',
						RspTxt: '网络连接失败，请重新尝试一下'
					}
					console.log('' + url + ':' + type + ',' + JSON.stringify(xhr) + ',' + errorThrown);
					callback(data);
					waitingDialog.close();
					//mui.toast("网络连接失败，请重新尝试一下");
				}
			});
		} catch(e) {
			plus.nativeUI.closeWaiting();
			alert('### ERROR ### 发送协议 name:' + e.name + " message:" + e.message);
		}
	});
}

//拼接参数
function postDataEncry1(encryData, commonData, flag) {
	//循环
	var tempStr = '';
	for(var tempData in encryData) {
		//对value进行加密
		var encryptStr = RSAEncrypt.enctype(encryData[tempData]);
		//修改值
		encryData[tempData] = encryptStr;
	}
	//判断是否需要添加共用数据
	if(flag == 1) {
		//获取个人信息
		var personalUTID = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).utid;
		var personalToken = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).token;
		var comData = {
			uuid: plus.device.uuid,
			utid: personalUTID,
			token: personalToken,
			appid: plus.runtime.appid
		};
		commonData = $.extend(commonData, comData);
	} else if(flag == 2) {
		//获取个人信息
		var personalToken = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).token;
		var comData = {
			uuid: plus.device.uuid,
			token: personalToken,
			appid: plus.runtime.appid
		};
		commonData = $.extend(commonData, comData);
	} else if(flag == 3) {
		//获取个人信息
		var personalToken = window.myStorage.getItem(window.storageKeyName.PERSONALINFO).token;
		var comData = {
			token: personalToken
		};
		commonData = $.extend(commonData, comData);
	}
	//将对象转为数组
	var arr0 = [];
	for(var item in encryData) {
		arr0.push(item + '=' + encryData[item]);
	};
	var arr1 = [];
	for(var item in commonData) {
		arr1.push(item + '=' + commonData[item]);
	};
	//合并数组
	var signArr = arr0.concat(arr1);
	//拼接登录需要的签名
	var signTemp = signArr.sort().join('&');
	return signTemp;
}

//生成二维码链接
function QRCodeUrl(url, encryData, commonData, flag) {
	//拼接登录需要的签名
	var signTemp = postDataEncry1(encryData, commonData, flag);
	//生成签名，返回值sign则为签名
	signHmacSHA1.sign(signTemp, storageKeyName.SIGNKEY, function(sign) {
		//组装发送握手协议需要的data
		//合并对象
		var tempData = $.extend(encryData, commonData);
		//添加签名
		tempData.sign = sign;
		//将对象转为数组
		var arr0 = [];
		for(var item in tempData) {
			arr0.push(item + '=' + tempData[item]);
		};
		//参数的临时值
		var tempStr = arr0.sort().join('&');
		//拼接url
		var url0 = url + '?' + tempStr;
		console.log('需要申请的url为:' + url0);
		return url0;
	});
}