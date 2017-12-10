
/**
 * boy walk
 * @param {[type]} container [description]
 */
function BoyWalk(){

	//获取div容器节点
	var $container = $("#content");

	//获取页面可视区域高度、宽度
	var visual_width = $container.width();
	var visual_height = $container.height();


	//调用接口，实现滑动效果
	//$("button").click(function(){
	//	swipe.scrollTo($("#content").width() * 2,5000);
	//});

	//定义函数，用于获取标签元素的高度和top位置
	var getValue = function(classname){
		var $elem = $('' + classname + '');
		return {
			height: $elem.height(),
	   		top: $elem.position().top
		};
	};

	//调用函数，获取中间路的top数据
	var pathY = function(){
		var data = getValue('.a_background_middle');
		return data.top + data.height/2;
	}();

	//获取小男孩的高度
	var $boy = $('#boy');
	var boyheight = $boy.height();

	//修正小男孩的top位置
	$boy.css({
		top: pathY - boyheight + 25
	});

	//触发动画效果
	//$(".button").click(function(){
	//	//增加走路的CSS3关键帧规则
	//	$boy.addClass('slow_Walk');
	//})

	/*
	//实现走路动画效果
	$(".walk_start").click(function(){
		$boy.addClass('slow_Walk');
		$boy.css({
			'left': $("#content").width() + 'px',
			'transition': '10s linear'
		});
	});

	//停止走路动画
	$(".walk_stop").click(function(){
		$boy.css({
			//强制改变left值，此时动画10s还没结束
			'left': $boy.css('left'),
		});
		$boy.addClass('pause_Walk');
	})
	*/

	/*
	//计算移动距离
	function move_Distance(direction,proportion){
		return ( direction == 'x' ? visual_width : visual_height) * proportion;
	}
	*/

	//停止走路动画
	function stop_Walk(){
		$boy.css({
			//强制改变left值，此时动画10s还没结束
			'left': $boy.css('left'),
			'top': $boy.css('top')
		});
		$boy.addClass('pause_Walk');
	}

	//恢复走路动画效果
	function restore_Walk(){
		$boy.removeClass('pause_Walk');
	}

	//实现原地走路动画效果
	function slow_Walk(){
		$boy.addClass('slow_Walk');
	}

	//实现直线走路动画效果
	/*function linear_Walk(options,run_time){
		//声明一个deferred对象
		var dfd = $.Deferred();
		//恢复走路动画效果
		restore_Walk();
		//实现移动效果
		$boy.css({
			'left': distX + 'px',
			'top': distY ? distY : undefined
			'transition': run_time + 'ms linear' 
		});
		//返回deferred对象
		return dfd;
	}*/

	//开始走路
	function start_Walk(run_time,distX,distY){
		var time = time || 3000;
		//1、实现走路动画
		restore_Walk();
		slow_Walk();
		//声明一个deferred对象
		var dfd = $.Deferred();

		//2、加上直线移动效果
		/*$boy.css({
			'left': distX + 'px',
			'top': distY ? distY : undefined,
			'transition': run_time + 'ms linear'	    
		});
		$boy.on("transitioned",dfd.resolve());
		*/
		$boy.transition({
			'left': distX + 'px',
			'top': distY ? distY : undefined
			},run_time,'linear',function(){dfd.resolve();} // 动画完成
        );
		//3、调用直线走路动画效果
		return dfd;
	}

	var instanceX;
	//走进商店
	function walk_to_Shop(){
		restore_Walk();
		var defer = $.Deferred();
		var doorleft = $(".door").offset().left;
		var boyleft = $boy.offset().left;
		instanceX = (doorleft + $(".door").width()/2) - (boyleft + $boy.width()/2);
		//开始走路进商店
		var walk_to_shop_start = function(){
			var dfd = $.Deferred();
			$boy.transition({
				'transform': 'translateX(' + instanceX + 'px) scale(0.3,0.3)',
				'opacity': 0.1
				},2000,'linear',function(){dfd.resolve();}
			);
			return dfd;
		};
		//进商店路程结束
		walk_to_shop_start().done(function(){
			$boy.css({
				'opacity': 0
			});
			defer.resolve();
		});
		return defer;
	}

	//取花
	function take_Flower(){
		var dfd = $.Deferred();
		setTimeout(function(){
			$boy.addClass("walk_with_flower");
			dfd.resolve();
		},1000);
		return dfd;
	}

	//走出商店
	function walk_out_Shop(){
		var defer = $.Deferred();
		//开始走出商店
		var walk_out_shop_start = function(){
			var dfd = $.Deferred();
			$boy.transition({
				'transform': 'translateX(' + instanceX + 'px),scale(1,1)',
				'opacity': 1
				},2000,'linear',function(){dfd.resolve();}
			);
			return dfd;
		};
		//出商店路程结束
		walk_out_shop_start().done(function(){
			defer.resolve();
		});
		return defer;
	}

	return {
		//开始走路
		walkTo: function(run_time,proportionX,proportionY){
			//计算移动距离
			distX = visual_width * proportionX;
			distY = visual_height * proportionY;
			//开始走路
			return start_Walk(run_time,distX,distY);
		},

		//走进商店
		toShop: function(){
			return walk_to_Shop.apply();
		},

		//取花
		takeFlower: function(){
			return take_Flower();
		},

		//走出商店
		outShop: function(){
			return walk_out_Shop.apply();
		},

		//停止走路
		stopWalk: function(){
			stop_Walk();
		},

		//改变颜色
		changeColor: function(color){
			$boy.css('background-color',color);
		},

		//获取小男孩的宽度
		getBoyWidth: function(){
			return $boy.width();
		},

		//获取小男孩的高度
		getBoyHeight: function(){
			return $boy.height();
		},

		//小男孩带花走路动画
		walkWithFlower: function(){
			$boy.addClass("walk_with_flower");
		},

		//还原小男孩初始状态
		resetOriginal: function(){
			this.stopWalk();
			$boy.removeClass("slow_Walk walk_with_flower");
			$boy.addClass("reset_Original");
		},

		//转身动作
		rotate: function(){
			restore_Walk();
			$boy.addClass("boy_rotate");
		}
	}
}