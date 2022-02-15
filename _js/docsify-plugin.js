// 声明 docsify 插件
var myDocsifyPlugin = function(hook, vm) {
	// 钩子函数：解析之前执行
	hook.beforeEach(function(content) {
		//
	});

	// 钩子函数：每次路由切换时，解析内容之后执行
	hook.afterEach(function(html) {
		//
	});

	// 每钩子函数：次路由切换时数据全部加载完成后调用，没有参数。
	hook.doneEach(function() {
		// 功能3，给代码盒子，添加行数样式
		$('pre code').each(function(){
			var lines = $(this).text().split('\n').length;
			var $numbering = $('<ul/>').addClass('code-line-box');
			$(this)
				.addClass('has-numbering')
				.parent()
				.append($numbering);
			for(i=1;i<=lines;i++){
				$numbering.append($('<li/>').text(i));
			}
		});
	});

	hook.ready(function() {
		//
	});

}