function GirlWalk(){
	var Girl = {};

	//获取桥的Y轴坐标
	var $container = $("#content");
	var visual_width = $container.width();
	var $bridge = $(".c_background_middle");
	var bridgeY = $bridge.position().top;

	var $girl = $(".girl");

	//获取小女孩高度
	Girl.getHeight = function(){
		return $girl.height();
	};
	//获取小女孩宽度
	Girl.getWidth = function(){
		return $girl.width();
	}

	//修正小女孩位置
	Girl.setOffset = function(){
		return $girl.css({
			'left': visual_width / 2,
			'top': bridgeY - this.getHeight()
		});
	};

	//小女孩的位置
	Girl.getTop = function(){
		return $girl.position().top;
	};
	Girl.getLeft = function(){
		return $girl.position().left;
	};

	//转身动作
	Girl.rotate = function(){
		$girl.addClass("girl_rotate");
	}
	
	return Girl;
}

