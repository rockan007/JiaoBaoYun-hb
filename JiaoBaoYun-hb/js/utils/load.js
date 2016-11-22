/**
 * 上传、下载组件
 */
var load=(function(mod){
	/**
	 * 上传文件
	 * @param {Object} url 上传接口
	 * @param {Object} paths 需上传文件的路径
	 */
	mod.createUpload=function(url,paths,savePath,getToken){
		//等待框
		var wt=plus.nativeUI.showWaiting();
		//创建上传方法
		var task=plus.uploader.createUpload(url,
			{method:"POST",
			blocksize: 409600,  
			priority: 100},
			function(t,status){
				//关闭对话框
				wt.close();
				console.log('当前状态：'+status);
				//上传完成
				//上传成功
				if(status==200){
					console.log("Upload success"+t.responseText);
				//上传失败
				}else{
					mui.toast('上传失败,请重新上传');
				}
			});
			
			task.addData('token',getToken)
		//加载所有文件
		paths.forEach(function(path,i){
			task.addData('key',path);
			task.addFile(path,{key:'path'});
			console.log(path);
		})
		task.setRequestHeader('token',getToken);
		task.addEventListener( "statechanged", onStateChanged, false );
		//开始上传
		task.start();
		console.log('start')
	}
	// 监听上传任务状态
	function onStateChanged( upload, status ) {
		console.log('mui上传状态：'+upload.state)
		if ( upload.state == 4 && status == 200 ) {
			// 上传完成
			console.log( "Upload success: " + upload.getFileName() );
		}
	}
	return mod
})(load||{})