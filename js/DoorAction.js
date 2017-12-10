
function DoorAction(left,right,time){
	//获取左右门元素节点
	var $door_left = $(".door_left");
	var $door_right = $(".door_right");
	//定义deferred对象
	var defer = $.Deferred();
	//开关门动作计数
	var count = 2;

	//等待开关门动作完成
	var complete = function(){
		if (count == 1) {
			defer.resolve();
			return;
		}
		count--;
	}

	//左门开关动作
	$door_left.transition({
		"left": left
	},time,complete);

	//右门开关动作
	$door_right.transition({
		"left": right
	},time,complete);

	return defer;
}

