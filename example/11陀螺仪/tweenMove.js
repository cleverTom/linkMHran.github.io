var Tween = {
	linear: function (t, b, c, d) {
		return c * t / d + b;
	},
	easeIn: function (t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOut: function (t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function (t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function (t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function (t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function (t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function (t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function (t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function (t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d / 2) == 2) {
			return b + c;
		}
		if (!p) {
			p = d * (0.3 * 1.5);
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		}
		else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return - 0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function (t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function (t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function (t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function (t, b, c, d) {
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function (t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function (t, b, c, d) {
		if (t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
};
function css(element, attr, val) {//设置样式函数
	if (attr == "scale" || attr == "scaleX"
		|| attr == "scaleY" || attr == "scaleZ"
		|| attr == "rotate" || attr == "rotateX"
		|| attr == "rotateY" || attr == "rotateZ"
		|| attr == "skewX" || attr == "skewY"
		|| attr == "translateX" || attr == "translateY" || attr == "translateZ") {
		return cssTransform(element, attr, val)//如果是transform走下面
	}
	if (arguments.length == 2) {
		var val = getComputedStyle(element)[attr];
		if (attr == 'opacity') {
			val = Math.round(val * 100);
		}
		return parseFloat(val);
	}
	if (attr == "opacity") {
		element.style.opacity = val / 100;
	} else {
		element.style[attr] = val + "px";
	}
}
/*
    参数： 1：选中元素
          2：属性名
          3：属性值
          如果只有两个值就是获取，三个就是设置，只能获取通过此函数设置的css属性；
*/
function cssTransform(element, attr, val) {//transform设置函数
	if (!element.transform) element.transform = {};//不存在就创建保存属性；

	if (typeof val == "undefined") {
		if (typeof element.transform[attr] == "undefined") {
			switch (attr) //如果没有设置就返回默认值
			{
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ":
					element.transform[attr] = 100;//返回默认值
					break;
				default:
					element.transform[attr] = 0;//如果没设置就返回默认值；
			}
		}
		return element.transform[attr];
	}
	else {
		//要分辨单位
		element.transform[attr] = val;
		/*element.style.transform=
		element.style.WebkitTransform=attr;*/
		var transformVal = '';
		for (var s in element.transform) {
			switch (s) {//判断情况
				case "scale":
				case "scaleX"://样式设置为*100
				case "scaleY":
				case "scaleZ":
				// 获取到对应的值
					transformVal += " " + s + "(" + (element.transform[s] / 100) + ")";
					break;
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					transformVal += " " + s + "(" + element.transform[s] + "deg)";
					break;
				default:
					transformVal += " " + s + "(" + element.transform[s] + "px)";
			}
		}
		//console.log(transformVal)
		element.style.transform =//设置样式覆盖了； 
			element.style.WebkitTransform = transformVal;
	}
}
/*
	init{
          el:element;
          time:1000,
          target:目标点{对象}
          type:"linear"，
          callBack:执行完的回调，
          cassIn：执行过程中回调
        }
*/
function tweenMove(init) {//运动函数
	var t = 0;
	var b = {};
	var c = {};
	var d = init.time / 20;
	for (var s in init.target) {
		b[s] = css(init.el, s);
		c[s] = init.target[s] - b[s];
	}
	clearInterval(init.el.timer);
	init.el.timer = setInterval(
		function () {
			t++;
			if (t > d) {
				clearInterval(init.el.timer);
				init.callBack && init.callBack.call(init.el);
			} else {
				init.callIn && init.callIn.call(init.el);
				for (var s in b) {
					//转换为数字类型
					var val = Number((Tween[init.type](t, b[s], c[s], d)).toFixed(2));
					css(init.el, s, val);
				}
			}
		},
		20
	);
}