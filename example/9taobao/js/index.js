/**
 * Created by lenovo on 2016/12/4.
 */
    /*禁止页面默认拖动*/

window.onload=function()
{
    /*页面导航条模块*/
    (function(doc){
        mobileSlide("slide","main",false);
    })(document);

    /*轮播图模块*/
    (function(doc){
       swipe("tab","tabLine",true,false);
    })(document);

    /*新闻头条模块*/
    (function(doc){
        var arrNews=[
            "屏占比99%的手机真的来了!正面无死角美呆",
            " 这台车的出现,足以看出三菱要改朝换代了",
            "那个被大猩猩解救的男孩,如今长成了这幅模样",
            "袁腾飞在线问题解答,和粉丝聊天",
            "1212来了,骚年,玩陨石吗?",
            "时尚冬装,你的衣柜缺少一件长度毛领大衣",
            "国企改革顶层设计方案已获国务院通过",
            "李彦宏：特殊时期的百度会深刻反省",
            "男子骗500女网友开房，他为何总能得手",
            "记住一个秘诀就长寿 红枣6种吃法最滋补",
            "优劣悬殊：抗美援朝敌我装备差距有多大",
            "李银河：官员通奸与任职资格的三种关系"
        ];
        var headline=doc.querySelector("#headline");
        var oP=headline.querySelector(".news");
        var oAd=oP.querySelectorAll("a");
        var iNow1=-2;
        var iNow2=-1;
        var len=arrNews.length;
        function news()
        {
            iNow1+=2;
            iNow2+=2;
            oAd[0].innerHTML=arrNews[iNow1%len];
            if(iNow2==1)//初次调用不延迟
            {
                oAd[1].innerHTML=arrNews[iNow2%len];
            }
            setTimeout(function(){
                oAd[1].innerHTML=arrNews[iNow2%len];
            },2500);
        }
        news();
        setInterval(function(){
            news();
        },5000);
    })(document);

    /*倒计时模块*/
    (function(){
        function countdown(parent,hour,min,sec,fn)
        {
            var oParent=document.getElementById(parent);
            var timer=null;
            var aSpan=oParent.querySelectorAll("span");
            var iHour=aSpan[0];
            var iMin=aSpan[1];
            var iSec=aSpan[2];
            time();
            function count()
            {
                sec--;
                if(sec==-1)
                {
                    min--;
                    if(min!=-1)
                    {
                        sec=59;
                    }
                    else if(min==-1)
                    {
                        if(hour==0)
                        {
                            clearInterval(timer);
                            fn&&fn();
                            return;
                        }
                        else
                        {
                            hour--;
                            min=59;
                            sec=59;
                        }
                    }

                }
                time();
            }
            timer=setInterval(count,1000);
            function toZero(num)
            {
                if(num<=9)
                {
                    return "0"+num;
                }
                else
                {
                    return ""+num;
                }
            }
            function time()
            {
                iHour.innerHTML=toZero(hour);
                iMin.innerHTML=toZero(min);
                iSec.innerHTML=toZero(sec);
            }
        }
        var hours=Math.floor(Math.random()*24);
        var mins=Math.floor(Math.random()*60);
        var secs=Math.floor(Math.random()*60);
        countdown("countdown",hours,mins,secs);
    })(document);
};