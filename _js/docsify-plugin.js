var myDocsifyPlugin = function(hook, vm) {

	hook.beforeEach(function(content) {
		//
	});

	// 每次路由切换时，解析内容之后执行
	hook.afterEach(function(html) {
		//
	});

	// 次路由切换时数据全部加载完成后调用，没有参数。
	hook.doneEach(function() {
		// 功能3，给code，添加行數樣式
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

    $('p img').each(function() {
			var str = $(this).attr('alt');
			$(this).after(`<center><i>${str}</i></center>`);
		});
	});

	hook.ready(function() {
		//
	});

}