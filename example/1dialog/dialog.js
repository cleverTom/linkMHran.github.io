/*
 Options:{
 autoOpen(是否自动弹出)
 width:宽度
 height:高度
 left:位置
 top:位置
 title:标题内容
 mark(true):遮罩层
 show:动画;必须在open模式下开启;
 hide:隐藏;必须在open模式下开启;
 }
 Methods:open(开启才能实现动画效果) waitClose(几秒后自动关闭); crashOpen();
 Events:beforeClose(点击关闭在消失前触发) afterClose(点击关闭在关闭后触发)
 */
window.onload=function(){
    var d2=new Dialog();
    d2.init("#dialog",{autoOpen:false,title:"第一个标题",show:1000,hide:300,mark:true});
    var oBtn=document.querySelector("#btn1");
    oBtn.onclick=function(){
        d2.open();
        d2.crashOpen();
        d2.waitClose(5);
    };

    bindEvent(d2,"beforeClose",function(){console.log(1)});
    bindEvent(d2,"afterClose",function(){console.log(2)});
};
function Dialog(){
    this.oDiv=null;
    this.mark=null;
    this.oH4=null;
    this.dragthis=null;
    this.oTime=null;
    this.timer=null;
    this.crash=false;
    this.settings={
        autoOpen:true,
        top:100,
        left:300,
        width:300,
        height:250,
        title:"标题",
        mark:false,
        show:-1,
        hide:-1,
        open1:false
    };
}
Dialog.prototype.init=function(id,opt){
    this.oDiv=document.querySelector(id);
    extend(this.settings,opt);
    this.setStyle();
    this.setTitle();
    this.fnClose();
    this.drag(id);
    if(this.settings.show==-1){if(this.settings.mark){this.markOpen();}}
    if(this.settings.autoOpen){this.autoOpen();}
};
Dialog.prototype.open=function(){
    this.oDiv.style.display="block";
    this.oDiv.style.height=0;
    this.settings.open1=true;
    if(this.settings.mark){this.markOpen();}
    timeMove(this.oDiv,{height:this.settings.height},this.settings.show,"linear");
};
Dialog.prototype.setTitle=function(){
    this.oH4=document.createElement("h4");
    this.oH4.innerHTML=this.settings.title+'<input class="dialogClose" type="button" value="&times;">';
    this.oDiv.insertBefore(this.oH4,this.oDiv.children[0]);
};
Dialog.prototype.drag=function(id){
    var This=this;
    This.dragthis=new Drag();
    this.oH4.onmousedown=function(){
        This.dragthis.init({id:id,isDrag:true});
    };
    this.oH4.onmouseup=function(){
        This.dragthis.init({id:id,isDrag:false});
    };
};
Dialog.prototype.markOpen=function(){
    this.mark=document.createElement("div");
    this.mark.id="mark";
    this.mark.style.height=document.documentElement.clientHeight+"px";
    document.body.appendChild(this.mark);
    var This=this;
    window.onscroll=function(){
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        This.mark.style.height=document.documentElement.clientHeight+scrollTop+"px";
    };
};
Dialog.prototype.crashOpen=function(){
    var This=this;
    this.oH4.onmousedown=function(){
        This.dragthis.init({id:"#"+This.oDiv.id,isDrag:true,crash:true});
    };
    this.oH4.onmouseup=function(){
        This.dragthis.init({id:"#"+This.oDiv.id,isDrag:false});
    };
};
Dialog.prototype.setStyle=function(){
    this.oDiv.style.width=this.settings.width+"px";
    if(!this.settings.open1){ this.oDiv.style.height=this.settings.height+"px";}
    this.oDiv.style.left=this.settings.left+"px";
    this.oDiv.style.top=this.settings.top+"px";
};
Dialog.prototype.waitClose=function(times){
    this.oTime=times;
    var This=this;
    var oSpan=document.createElement("span");
    oSpan.id="waitClose";
    oSpan.innerHTML="等待"+this.oTime+"s后关闭";//默认参数
    this.oDiv.appendChild(oSpan);
    this.timer=setInterval(function(){
        This.oTime--;
        oSpan.innerHTML="等待"+This.oTime+"s后关闭";
        if(This.oTime==0){
            This.dragthis.clear();
            clearInterval(This.timer);
            if(!This.settings.open1){
                document.body.removeChild(This.oDiv);
            }else{
                timeMove(This.oDiv,{height:0},This.settings.hide,"linear",function(){
                    This.oDiv.style.display="none";
                });
            }
            if(This.settings.mark){
                document.body.removeChild(This.mark);
            }
        }
    },1000);
};
Dialog.prototype.fnClose=function(){
    var oClose=this.oDiv.querySelector(".dialogClose");
    var This=this;
    oClose.onclick=function(){
        clearInterval(This.timer);
        fireEvent(This,"beforeClose");
        if(!This.settings.open1){
            document.body.removeChild(This.oDiv);
        }else{
            timeMove(This.oDiv,{height:0},This.settings.hide,"linear",function(){
                This.oDiv.style.display="none";
            });
        }
        if(This.settings.mark){
            document.body.removeChild(This.mark);
        }
        fireEvent(This,"afterClose");
    };
};
Dialog.prototype.autoOpen=function(){
    this.oDiv.style.display="block";
};
function Drag(){
    this.obj=null;
    this.disX=0;
    this.disY=0;
    this.prevX=0;
    this.prevY=0;
    this.iSpeedX=0;
    this.iSpeedY=0;
    this.timer1=null;

    this.settings={
        isDrag:true,
        crash:false,
        toDown:function(){},
        toUp:function (){}
    };
}
Drag.prototype.init=function(opt){
    var This=this;
    this.obj=document.querySelector(opt.id);
    extend(this.settings,opt);
    this.obj.onmousedown=function(ev){
        var ev=ev||window.event;
        if(This.settings.isDrag){ This.fnDown(ev,This.settings.toUp);}
        This.settings.toDown();
    };
};
Drag.prototype.fnDown=function(ev,toUp){
    this.disX=ev.clientX-this.obj.offsetLeft;
    this.disY=ev.clientY-this.obj.offsetTop;
    this.prevX=ev.clientX;
    this.prevY=ev.clientY;
    var This=this;
    document.onmousemove=function(ev){
        var ev=ev||window.event;
        if(This.settings.crash){This.startMove(This);}
        This.fnMove(ev);
    };
    document.onmouseup=function(){
        document.onmousemove=document.onmouseup=null;

        toUp();
    };
    return false;
};
Drag.prototype.fnMove=function(ev){
    this.obj.style.left=ev.clientX-this.disX+"px";
    this.obj.style.top=ev.clientY-this.disY+"px";
    this.iSpeedX=ev.clientX-this.prevX;
    this.iSpeedY=ev.clientY-this.prevY;
    this.prevX=ev.clientX;
    this.prevY=ev.clientY;
};
Drag.prototype.startMove=function(This){
    clearInterval(This.timer1);
    var iHeight=document.documentElement.clientHeight-This.obj.offsetHeight;
    this.timer1=setInterval(function(){
        This.iSpeedY+=3;
        var iTop=This.obj.offsetTop+This.iSpeedY;
        var iLeft=This.obj.offsetLeft+This.iSpeedX;
        if(iTop>=document.documentElement.clientHeight-This.obj.offsetHeight){
            iTop=document.documentElement.clientHeight-This.obj.offsetHeight;
            This.iSpeedY*=-0.75;
            This.iSpeedX*=0.75;
        }else if(iTop<=0){
            iTop=0;
            This.iSpeedY*=-0.75;
        }
        if(iLeft>=document.documentElement.clientWidth-This.obj.offsetWidth){
            iLeft=document.documentElement.clientWidth-This.obj.offsetWidth;
            This.iSpeedX*=-0.75;
        }else if(iLeft<=0){
            iLeft=0;
            This.iSpeedX*=-0.75;
        }//x轴停止不下来
        This.obj.style.left=iLeft+"px";
        This.obj.style.top=iTop+"px";
        if(Math.abs(This.iSpeedY)<=1 && This.obj.offsetTop>=iHeight){
            clearInterval(This.timer1);
        }
    },30);

};
Drag.prototype.clear=function(){
    clearInterval(this.timer1);
};
function timeMove(obj,json,times,fx,fn){
    var iCur={};
    for(var attr in json){
        iCur[attr]=0;
        if(attr=="opacity"){
            iCur[attr]=Math.round(getStyle(obj,attr)*100);
        }else{
            iCur[attr]=parseInt(getStyle(obj,attr));
        }
    }
    var startTime=now();
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        for(var attr in json){
            var changeTime=now();
            var t=times-Math.max(0,startTime-changeTime+times);
            var value=Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
            if(attr=="opacity"){
                obj.style.opacity=value/100;
                obj.style.filter="alpha(opacity="+value+")";
            }else{
                obj.style[attr]=value+"px";
            }
            if(t==times){
                clearInterval(obj.timer);
                fn && fn.call(obj);
            }
        }
    },13);

    function now(){
        return new Date().getTime();
    }
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};
function extend(obj1,obj2){
    if(typeof obj2!="object"){
        return obj2;
    }
    for(var attr in obj2){
        obj1[attr]=extend(obj1[attr],obj2[attr]);
    }
}
function bindEvent(obj,events,fn){
    obj.listener=obj.listener||{};
    obj.listener[events]=obj.listener[events]||[];
    obj.listener[events].push(fn);
    if(typeof obj!="object"){
        if(obj.addEventListener){
            obj.addEventListener(events,fn,false);
        }else{
            obj.attachEvent("on"+events,fn);
        }
    }
}
function fireEvent(obj,events){
    if( obj.listener &&  obj.listener[events]){
        for(var i=0;i< obj.listener[events].length;i++){
            obj.listener[events][i]();
        }
    }
}
