
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);//直接绑定attach会有指向问题;
        });
    }
}
function toArray(obj){
    var arr=[];
    for(var i=0;i<obj.length;i++){
        arr.push(obj[i]);
    }
    return arr;
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function fnLoad(){
    var iTime=Date.now();
	var oW=id("welcome");
    var bTime=false;
    var bImgLoad=false;
    var flag=0;
    var timer=null;
    var arr=[
        "./img/1.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/4.jpg",
        "./img/5.jpg"
    ];
    bind(oW,"transitionend",end);
    //bind(oW,"webkitTransitionEnd",end);
    timer=setInterval(function(){
        if(Date.now()-iTime>=3000){
            bTime=true;
        }
        if(bImgLoad && bTime){
            clearInterval(timer);
            oW.style.opacity=0;
        }
    },1000);
    function end(){
        removeClass(oW,"pageShow");
        fnTab();
    }
    for(var i=0;i<arr.length;i++){
        var oImage=new Image();
        oImage.src=arr[i];
        oImage.onload=function(){
          flag++;
            if(flag==arr.length){
                bImgLoad=true;
            }
        };
    }

}
function fnInfo(oInfo,sInfo){
    oInfo.innerHTML=sInfo;
    oInfo.style.transform="scale(1)";
    oInfo.style.opacity=1;
    oInfo.style.opacity=1;
    setTimeout(function(){
        oInfo.style.transform="scale(0)";
        oInfo.style.opacity=0;
    },1000);
}
function fnTab(){
    var oTab=id("tabPic");
    var oList=id("picList");
    var aNav=oTab.querySelectorAll("nav a");
    var iNow= 0,iX= 0,iW=view().w;
    var timer=null;
    var iStartTouchX=0;
    var iStartX=0;
    var oP=oTab.querySelector("p");
    var arrP=["成都九寨沟景区","北京三里屯景区","湖南张家界景区","山东泰山景区","安西铁观音景区"];
    function autoPlay(){
        timer=setTimeout(function timeOut(){
            iNow++;
            iNow%=aNav.length;
            tab();
            setTimeout(timeOut,3000);
        },3000);
    }
    autoPlay();
    if(!window.fnScore){
        fnScore();
        window.fnScore=true;
    }
    //防止函数重复调用;
    if(!window.fnNewsJump){
        fnNewsJump();
        window.fnNewsJump=true;
    }
    bind(oTab,"touchstart",fnStart);
    bind(oTab,"touchmove",fnMove);
    bind(oTab,"touchend",fnEnd);
    function fnStart(e){
        var touches= e.changedTouches[0];
        iStartTouchX=touches.pageX;
        iStartX=iX;
        clearInterval(timer);
    }
    function fnMove(e){
        var touches= e.changedTouches[0];
        var iDis=touches.pageX-iStartTouchX;
        iX=iStartX+iDis;
        oList.style.transition="none";//去掉拖拽时候的延迟这个属性;
        oList.style.transform="translateX("+iX+"px)";
    }
    function fnEnd(){
        iNow=iX/iW;
        iNow=-Math.round(iNow);
        (iNow<0) && (iNow=0);//运用短路算法;
        (iNow>aNav.length-1) && (iNow=aNav.length-1);
        tab();
        autoPlay();
    }
    function tab(){
        iX=-iNow*iW;
        oList.style.transition="1s";
        oList.style.transform="translateX("+iX+"px)";
        oP.innerHTML=arrP[iNow];
        for(var i=0;i<aNav.length;i++){
            removeClass(aNav[i],"active");
        }
        addClass(aNav[iNow],"active");

    }
    function fnScore(){
        var oScore=id("score");
        var aLi=toArray(oScore.querySelectorAll("li"));
        var arrData=["很差","没有想象中差","一般","良好","棒极了"];
        aLi.forEach(function(oLi,index){
            fnClick(oLi);
        });
        function fnClick(oLi){
            var aNav=toArray(oLi.querySelectorAll("a"));
            var oInput=oLi.querySelector("input");
            aNav.forEach(function(oNav,index){
                bind(oNav,"touchstart",function(){
                    for(var i=0;i<aNav.length;i++){
                        if(i<=index){
                            addClass(aNav[i],"active");
                        }else{
                            removeClass(aNav[i],"active");
                        }
                    }
                    oInput.value=arrData[index];
                });
            });
        }
    }
    if(!window.fnIndex){
        fnIndex();
        window.fnIndex=true;
    }

    function fnIndex(){//对标签是否能够提交进行判断;
        var oIndex=id("index");
        var oBtn=oIndex.querySelector(".btn");
        var oInfo=oIndex.querySelector(".info");
        var bScore=false;
        bind(oBtn,"touchend",fnEnd);
        function fnEnd(){
            bScore=fnChecked();
            if(bScore){
                if(bTag()){
                    fnIndexOut();
                }
                else
                {
                    fnInfo(oInfo,"请给景区添加标签");
                }
            }else{
                fnInfo(oInfo,"请给景区评分");
            }
        }
        function fnChecked(){
            var oScore=id("score");
            var aInput=toArray(oScore.querySelectorAll("input"));
            var returnValue=aInput.every(function(oInput,index){
                var value=oInput.value;
                return value != 0;
            });

            return returnValue;
        }
        function bTag(){
            var oIndex=id("index");
            var oTags=oIndex.querySelector(".tags");
            var aInput=toArray(oTags.querySelectorAll("input"));
            var value1=aInput.some(function(value,index){
                //有一项为真就为真;
                return value.checked == true;
            });
            return value1;
        }

    }
    function fnNewsJump(){//实行a标签的跳转到新闻页;
        var oIndex=id("index");
        var oNews=id("news");
        var aBtn=oIndex.querySelector(".newsBtn");
        bind(aBtn,"touchend",function(){
            addClass(oNews,"pageShow");
            oNews.style.opacity=1;
        });
    }

}
function fnIndexOut(){
    var oMask=id("mask");
    var oIndex=id("index");
    var oNews=id("news");
    addClass(oMask,"pageShow");
    addClass(oNews,"pageShow");//提前加上防止一会渲染 transition不起作用;

       if(!window.bFnnew){
           fnNews();
           window.bFnnew=true;
       }

    setTimeout(function(){
        oMask.style.opacity=1;
        oIndex.style.filter="blur(10px)";
        oIndex.style.WebkitFilter="blur(10px)";
    },14);
    setTimeout(function(){//transitionend事件触发就会结束了 不能停留一会;
        oNews.style.transition="0.5s";
        oMask.style.opacity=0;
        oIndex.style.filter="blur(0px)";
        oIndex.style.WebkitFilter="blur(0px)";
        oNews.style.opacity=1;
        removeClass(oMask,"pageShow");//第二次点击还可以点击;
    },1500);
}
/*news模块*/
function fnNews(){
    var oNews=id("news");
    var aInput=oNews.querySelectorAll("input");
    var oInfo=oNews.querySelector(".info");
    aInput[0].onchange=function(){
        console.log(this.files[0].type.split("/")[0]);
        if(this.files[0].type.split("/")[0]=="video"){
            fnNewsOut();
            this.value="";
        }
        else{
            fnInfo(oInfo,"请上传视频");
        }
    };
    aInput[1].onchange=function(){
        console.log(this.files[0].type.split("/")[0]);
        if(this.files[0].type.split("/")[0]=="image"){
            fnNewsOut();
            this.value="";
        }
        else{
            fnInfo(oInfo,"请上传照片");
        }
    };
}
function fnNewsOut(){
    var oNews=id("news");
    var oForm=id("form");
    addClass(oForm,"pageShow");
    oNews.cssText="";
    removeClass(oNews,"pageShow");
    if(!window.bformIn) {
       formIn();
        window.bformIn=true;
    }


}
function formIn(){
    var oForm=id("form");
    var aFormTag=toArray(id("formTags").querySelectorAll("label"));
    var oBtn=oForm.querySelector(".btn");
    var bBtn=false;
    var oOver=id("over");
    aFormTag.forEach(function(oForm,index){
        bind(oForm,"touchend",function(){
            bBtn=true;
            addClass(oBtn,"submit");
        });
    });
    bind(oBtn,"touchend",function(){
        bBtn && fnJump();
        function fnJump(){
            for(var i=0;i<aFormTag.length;i++){
                aFormTag[i].querySelector("input").checked=false;
            }//图片有缓存问题
            bBtn=false;
            addClass(oOver,"pageShow");
            removeClass(oForm,"pageShow");
            removeClass(oBtn,"submit");
            if(!window.bOver){
                over();
                window.bOver=true;
            }

        }
    });

}

function over(){
    var oOver=id("over");
    var oBtn=oOver.querySelector(".btn");
    bind(oBtn,"touchend",function(){
        removeClass(oOver,"pageShow");

    });
}