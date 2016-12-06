/**
 * @author an
 */

var events = (function($, mod) {
	/**
	 * 绑定监听
	 * @param {Object} id 绑定dom的Id
	 * @param {Object} event 绑定的监听事件
	 */
	mod.addTap = function(id, event) {
			var item = document.getElementById(id);
			item.addEventListener('tap', event);
		}
		/**
		 * 加载跳转界面监听的公用方法 
		 * @param {Object} item 加载监听的控件
		 * @param {Object} targetHTML 目标Url
		 */
	mod.jumpPage = function(item, targetHTML) {
			item.addEventListener('tap', function() {
				mod.openNewWindow(targetHTML);
			})
		}
		/**
		 * 打开新界面
		 * @param {Object} targetHTML 目标界面
		 */
	mod.openNewWindow = function(targetHTML) {
			$.openWindow({
				url: targetHTML,
				id: targetHTML,
				show: {
					anishow: 'slide-in-right'
				},
				waiting: {
					title: '正在加载...'
				},
				styles: {
					top: localStorage.getItem('$Statusbar'),
				}
			})
		}
		/**
		 * 打开新页面时，同时传值
		 * 扩展参数仅在打开新窗口时有效，若目标窗口为预加载页面，
		 * 则通过mui.openWindow方法打开时传递的extras参数无效。
		 * @param {Object} targetHTML 新页面路径
		 * @param {Object} passData 获取要传的值
		 */
	mod.openNewWindowWithData = function(targetHTML, passData) {
		$.openWindow({
			url: targetHTML,
			id: targetHTML,
			extras: {
				data: passData
			},
			show: {
				anishow: 'slide-in-right'
			},
			waiting: {
				title: '正在加载...'
			},
			styles: {
				top: localStorage.getItem('$Statusbar')
			}
		});
	};
	/**
	 * 加载子页面
	 * @param {Object} subPage 子页面路径
	 * @param {Object} datas 向子页面加载的数据，可选参数
	 */
	mod.initSubPage = function(subPage, datas) {
		if(!datas) {
			datas = null;
		}
		$.init({
			gestureConfig: {
				doubletap: true //启用双击监听
			},
			subpages: [{
				url: subPage,
				id: subPage,
				styles: {
					top: '45px',
					bottom: localStorage.getItem('$Statusbar'),
				},
				extras: {
					data: datas
				}
			}]
		});

		var contentWebview = null;
		document.querySelector('header').addEventListener('doubletap', function() {
			if(contentWebview == null) {
				contentWebview = plus.webview.currentWebview().children()[0];
			}
			contentWebview.evalJS("$('#refreshContainer').pullRefresh().scrollTo(0,0,100)");
		});
	}

	/**
	 * 
	 * @param {Object} id 刷新的list控件id
	 * @param {Object} fresh 下拉刷新加载数据的方法
	 * @param {Object} addMore 上拉刷新加载数据的方法
	 * @param {Object} curPageCount 当前页码
	 * @param {Object} totalPageCount 总页码
	 */
	mod.initRefresh = function(id, fresh, addMore) {

			$.init({
				pullRefresh: {
					container: '#refreshContainer',
					down: {
						callback: pulldownRefresh
					},
					up: {
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
			});
			/**
			 * 下拉刷新具体业务实现
			 */
			function pulldownRefresh() {
				setTimeout(function() {
					$('#refreshContainer').pullRefresh().refresh(true);
					var item = document.getElementById(id)
						//清除所有数据
					while(item.firstChild != null) {
						item.removeChild(item.firstChild)
					}
					//加载新控件
					fresh();
					$('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
				}, 150);
			}
			var count = 0;
			/**
			 * 上拉加载具体业务实现
			 */
			function pullupRefresh() {
				setTimeout(function() {
					//					console.log('当前页面：'+curPageCount+';总页码：'+totalPageCount)

					//					if(curPageCount<totalPageCount){
					//						curPageCount++;
					//						var item = document.getElementById(id)
					//						var cells = document.body.querySelectorAll('.mui-table-view-cell');
					//						//加载更多数据
					addMore();
					//					}

				}, 1500);
			}
		}
		/**
		 * 预加载单个页面 在mui.plusReady里调用
		 * @param {Object} tarPage 页面路径
		 * @param {Object} interval 延迟加载时间间隔 单位毫秒 ，不输入默认为0
		 */
	mod.preload = function(tarPage, interval) {
			if(!interval) {
				interval = 0;
			}
			if(!plus.webview.getWebviewById(tarPage)) {
				//初始化预加载详情页面
				setTimeout(function() {
					$.preload({
						url: tarPage,
						id: tarPage, //默认使用当前页面的url作为id
						styles: { //窗口参数
							top: localStorage.getItem('$Statusbar')
						},
						show: {
							anishow: 'slide-in-right'
						},
						waiting: {
							title: '正在加载...'
						}
					})
				}, interval)
			}

		}
		/**
		 * 加载不需要传值的预加载页面
		 * @param {Object} tarpge
		 */
	mod.showPreloadPage = function(tarPage) {
			var targetPage = null;
			//获得目标页面
			if(!targetPage) {
				targetPage = plus.webview.getWebviewById(tarPage);

			}
			targetPage.show();
		}
		/**
		 * 如果目标页面未加载,需要先预加载页面
		 * 传递数值到指定页面并打开页面
		 * @param {Object} tarpage 目标页面Id
		 * @param {Object} listener 监听事件
		 * @param {Object} getDatas 获取数据的方法  return somthing
		 */
	mod.fireToPage = function(tarPage, listener, getDatas) {
			//			console.log('tarPage:' + tarPage);
			var targetPage = null;
			//获得目标页面
			if(!targetPage) {
				targetPage = plus.webview.getWebviewById(tarPage);
				console.log(typeof(targetPage))
			}
			//触发目标页面的listener事件
			$.fire(targetPage, listener, {
				data: getDatas()
			});
			console.log('要传的值是：' + JSON.stringify(getDatas()))
			targetPage.show()
		}
		/**
		 * 如果目标页面未加载,需要先预加载页面
		 * 传递数值到指定页面并打开页面
		 * @param {Object} tarpage 目标页面Id
		 * @param {Object} listener 监听事件
		 * @param {Object} datas 要传递的数据
		 */
	mod.fireToPageWithData = function(tarPage, listener, datas) {
			console.log('tarPage:' + tarPage);
			var targetPage = null;
			//获得目标页面
			if(!targetPage) {
				targetPage = plus.webview.getWebviewById(tarPage);
				//				console.log(typeof(targetPage));
			}
			//触发目标页面的listener事件
			$.fire(targetPage, listener, {
				data: datas
			});
			targetPage.show()
		}
		/**
		 * 事件传递 不传数据 常用于 父子页面间
		 * @param {Object} tarPage 目标页面
		 * @param {Object} listener 事件
		 */
	mod.fireToPageNone = function(tarPage, listener) {
			console.log('tarPage:' + tarPage);
			var targetPage = null;
			//获得目标页面
			if(!targetPage) {
				targetPage = plus.webview.getWebviewById(tarPage);
			}
			if(targetPage) {
				//触发目标页面的listener事件
				$.fire(targetPage, listener);
			} else {
				console.log('目标页面不存在'+tarPage);
			}

		}
		/**
		 * 清空子元素
		 * @param {Object} item 需清空子元素的控件
		 */
	mod.clearChild = function(item) {
			while(item.firstElementChild) {
				item.removeChild(item.firstElementChild);
			}
		}
		/**
		 * listView加载数据
		 * @param {Object} listContainer
		 * @param {Object} data
		 * @param {Object} createInner
		 */
	mod.createListView = function(listContainer, data, createInner) {
		var list = document.getElementById(listContainer);
		data.forEach(function(cell, i, data) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = createInner(cell);
			list.appendChild(li);
		})

	}
	return mod;

})(mui, events || {});