function Decorations(){
	var decorations = {};

	/*开关灯动作*/
	var $lamp_bright = $(".b_background_top");
	decorations.lamp_Bright = function (){
		$lamp_bright.addClass("lamp_bright");
	};
	decorations.lamp_Dark = function (){
		$lamp_bright.removeClass("lamp_bright");
	};



	/*飞鸟动画*/
	var $bird = $(".bird");
	decorations.bird_Fly = function (){
		$bird.addClass("bird_fly");
		$bird.transition({
			'right': $container.width()
		},10000,'linear');
	};



	/*开关门动作*/
	//获取左右门元素节点
	var $door_left = $(".door_left");
	var $door_right = $(".door_right");
	decorations.door_Action = function (left,right,time){
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
		};

		//左门开关动作
		$door_left.transition({
			"left": left
		},time,complete);

		//右门开关动作
		$door_right.transition({
			"left": right
		},time,complete);

		return defer;
	};


	/*飘花动作*/
	var $float_flower = $(".float_flower"),
		//飘花图片地址
		flower_url = [
			'images/snowflake/snowflake1.png',
			'images/snowflake/snowflake2.png',
			'images/snowflake/snowflake3.png',
			'images/snowflake/snowflake4.png',
			'images/snowflake/snowflake5.png',
			'images/snowflake/snowflake6.png'
		],
		visual_width = $("#content").width(),
		visual_height = $("#content").height();
	decorations.float_Flower = function(){
		//随机选图
		function get_Image(){
			return flower_url[Math.floor(Math.random() * 6)];
		}
		//创建飘花元素
		function create_Flower(){
			return $("<div class='flower'></div>").css({
				'position': 'absolute',
				'top': '-41px',
				'width': '41px',
				'height': '41px',
				'backgroundSize': 'cover',
				'zIndex': 100,
				'backgroundImage': 'url(' + get_Image() + ')'
			}).addClass('flower_roll');
		}

		//每隔200ms开始飘花
		setInterval(function(){
			//定义飘花始末位置
			var start_left = Math.random() * visual_width -100,
				end_left = start_left - 100 + Math.random() * 500,
				end_top =  visual_height - 41,
				//动画随机时长
				duration = visual_height * 10 + Math.random() * 500,
				//动画随机透明度,不小于0.5
				random_opacity = Math.random(),
				start_opacity = random_opacity > 0.5 ? random_opacity : 1;

			//创建飘花
			var $flower = create_Flower();
			//设置飘花起点样式
			$flower.css({
				'left': start_left,
				'opacity': start_opacity
			});
			//添加飘花节点
			$float_flower.append($flower);

			//开始动画,动画结束后删除此飘花节点
			$flower.transition({
				'top': end_top,
				'left': end_left,
				'opacity': 0.7
			},duration,'ease-out',function(){
				$(this).remove();
			});

		},200);
	}
	
	

	/*音乐*/
	var audio_config = {
		open: true,
		play_url: 'music/happy.wav',
		circle_url: 'music/circulation.wav'
	}
	function html5Audio(url,isloop){
		var audio = new Audio(url);
		audio.loop = isloop || false;
		audio.play();
		return {
			end: function(callback){
				audio.addEventListener('ended',function(){
					callback();
				},false);
			}
		};
	}
	decorations.music = function(){
		var audio1 = html5Audio(audio_config.play_url);
		audio1.end(function(){
			html5Audio(audio_config.circle_url,true);
		});
	}

	return decorations;

}