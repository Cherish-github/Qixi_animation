
//页面滑动效果实现

/**
 * Swipe description
 * @param {[type]} container [页面容器节点]
 * @param {[type]} options [参数]
 */

function Swipe(container){
	//获取第一个子节点
	var element = container.find(":first");

	//滑动对象
	var swipe = {};

	//获取ul节点的所有li子元素，不包括后辈中有li的元素
	var slides = element.find(">");

	//获取div容器尺寸
	var width = container.width();
	var height = container.height();

	//设置所有li页面总宽度
	element.css({
		width: (slides.length * width) + 'px',
		height: height + 'px'
	});

	//设置每个li页面宽度
	$.each(slides,function(index){
		var slide = slides.eq(index);
		slide.css({
			width: width + 'px',
			height: height + 'px'
		});
	});

	//监控完成与移动
	swipe.scrollTo = function(x,speed){
		//执行动画移动
		element.css({
			'transition-duration' : speed + 'ms',
			'transition-timing-function' : 'linear',
			'transform' : 'translate3d(-' + x + 'px,0px,0px)'
		});
		return this;
	};

	return swipe;
}
