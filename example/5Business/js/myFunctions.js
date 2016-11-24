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
function arrIndexOf(arr,value){
    var str="";
    for(var i=0;i<arr.length;i++){
        str=arr[i];
        if(str.indexOf(value)==0){
            return i;//对挨个数据进行判断然后返回值即可；
        }
    }
    return -1;
}
//获取元素的绝对位置
function getPos(obj){
    var pos= {"left":0,"top":0};
    while (obj){
        pos.left+=obj.offsetLeft;
        pos.top+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return pos;
}
//对className进行多个选择；
function  getElementsByClassName(obj,tagName,className){
    var arrClassName = className.split(",");
    var arr = [];
    var allElems = obj.getElementsByTagName(tagName);
    for(var i=0;i<arrClassName.length;i++){
        for(var j=0;j<allElems.length;j++){
            var aClassName=allElems[j].className.split(" ");
            for(var k=0;k<aClassName.length;k++){
                if(aClassName[k]==arrClassName[i]){
                    arr.push(allElems[j]);
                    break;
                }
            }
        }
    }
    return arr;
}
//insertAfter
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    var theLast=parent.lastElementChild||parent.lastChild;
    if(theLast==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextElementSibling||targetElement.nextSibling);
    }
}
//addClass
function addClass(obj,className){
    if(obj.className==""){
        obj.className=className;
    }else{
        var arrClassName=obj.className.split(" ");
        var _index=arrIndexOf(arrClassName,className);
        if(_index==-1){
            obj.className+= " "+ className;//如果没找到就添加class找到了 就什么都不做
        }
    }
}
//removeClass
function removeClass(obj,className){
    if(obj.className!=""){
        var arrClassName=obj.className.split(" ");
        var _index=arrIndexOf(arrClassName,className);
        if(_index!=1){
            arrClassName.splice(_index,1);
            obj.className=arrClassName.join(" ");
        }
    }
    //如果没有class就什么都不做！！有就处理；
}
//获取checked选中状态的函数
function getChecked(form, name){
    var arr = [];
    for(var i=0; i<form[name].length; i++){
        if(form[name][i].checked){
            arr.push(form[name][i].value);
        }
    }
    if(form[name][0].type == 'radio'){
        return arr[0];
    }
    if(form[name][0].type == 'checkbox'){
        return arr;
    }
}
//绑定函数兼容
function bind(obj,evname,fn){
    if(obj.addEventListener){
        obj.addEventListener(evname,fn);
    }else{
        obj.attachEvent("on"+evname,function(){fn.call(obj);});
    }
}
//键盘移动无延迟函数：
function fnMoveNoout(obj){
    function fnMove(obj,dir){
        if(dir=="left"){
            clearInterval(obj.timer1);
            obj.timer1 =setInterval(function(){
                obj.style.left=obj.offsetLeft-1+"px";
            },0);
        }
        else if( dir=="top"){
            clearInterval(obj.timer2);
            obj.timer2 =setInterval(function(){
                obj.style.top=obj.offsetTop-1+"px";
            },0);
        }else if(dir=="right"){
            clearInterval(obj.timer3);
            obj.timer3 =setInterval(function(){
                obj.style.left=obj.offsetLeft+1+"px";
            },0);
        }else if(dir=="bottom"){
            clearInterval(obj.timer4);
            obj.timer4 =setInterval(function(){
                obj.style.top=obj.offsetTop+1+"px";
            },0);
        }
    }
    document.onkeydown=function(ev){
        var ev=ev||event;
        switch (ev.keyCode){
            case 37:fnMove(obj,"left");break;
            case 38:fnMove(obj,"top");break;
            case 39:fnMove(obj,"right");break;
            case 40:fnMove(obj,"bottom");break;
        }
    };
    document.onkeyup=function(ev){
        var ev=ev||event;
        switch (ev.keyCode){
            case 37:clearInterval(obj.timer1);break;
            case 38:clearInterval(obj.timer2);break;
            case 39:clearInterval(obj.timer3);break;
            case 40:clearInterval(obj.timer4);break;
        }
    };
}
//cookie
function getCookie(key){
    var arr1=document.cookie.split("; ");
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}
function setCookie(key,value,t){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+t);
    document.cookie=key+"="+value+";expires="+oDate.toDateString();
}
function removeCookie(key){
    setCookie(key,"",-1);
}
