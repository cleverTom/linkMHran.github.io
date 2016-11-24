//获取样式属性
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//元素移动
function doMove(obj,attr,dir,target,time,endFn){
    dir=parseInt(getStyle(obj,attr))<target?dir:-dir;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var speed=parseInt(getStyle(obj,attr))+dir;
        if(speed>target&&dir>0||speed<target&&dir<0){
            speed=target;
        }
        obj.style[attr]=speed+"px";
        if(speed==target){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },time);
}
//元素左右上下抖动
function Shake(obj,attr,endFn){
    if(obj.onoff){return;}
    obj.onoff=true;
    var arr=[];
    var num=0;
    var pos=parseInt(getStyle(obj,attr));
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    clearInterval( obj.shake);
    obj.shake=setInterval(function(){
        obj.style[attr]=pos+arr[num]+"px";
        num++;
        if(num==arr.length){
            clearInterval( obj.shake);
            endFn&&endFn();
            obj.onoff=false;
        }
    },50);
}
//透明度改变
function opacity(obj,dir,target,endFn) {
    dir = parseFloat(getStyle(obj, "opacity")) < target ? dir : -dir;
    clearInterval(obj.opac);
    obj.opac = setInterval(function () {
        var speed = parseFloat(getStyle(obj, "opacity")) + dir;
        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
        }
        obj.style.opacity = speed;
        if (speed == target) {
            clearInterval(obj.opac);
            endFn && endFn();
        }
    }, 80);
}
//数组的indexOf方法
function arrIndexOf(arr,find){
    var str="";
    for(var i=0;i<arr.length;i++){
        str=arr[i];
        if(str.indexOf(find)==0){
            return i;//对挨个数据进行判断然后返回值即可；
        }
    }
    return "未找到所寻找的数组数据";
}
