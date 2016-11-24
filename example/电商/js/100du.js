/**
 * Created by lenovo on 2016/10/8.
 */
$(function(){
    //搜索切换
    (function(){
        var aLi=$("#menu").find("li");
        var oText=$(".form").find(".text1");
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        //初始化
        var iNow=0;
        oText.val(arrText[iNow]);
        aLi.each(function(index){
            $(this).click(function(){
                aLi.attr("class","gradient");
                $(this).prop("class","active");
                iNow=index;
                oText.val(arrText[iNow]);
            });
        });
        oText.focus(function(){
            if($(this).val()==arrText[iNow]){
                $(this).val("");
            }
        }).blur(function(){
            if($(this).val()==""){
                $(this).val(arrText[iNow]);
            }
        });
    })();
    //update文字滚动
    (function(){
        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
        ];
        var oUl=$(".update ul");
        var oUpBtn=$("#updateUpBtn");
        var oDownBtn=$("#updateDownBtn");
        var iNow=0;
        var timer=null;
//                console.log(iHeight);
        var str="";
        for(var i=0;i<arrData.length;i++){
            str+='<li><a href="'+arrData[i]
                    .url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span>写了一篇新文章：'+arrData[i].title+'…</a></li>';
        }
//                console.log(str);
        oUl.html(str);
        var iHeight=oUl.find("li").height();
        oUpBtn.click(function(){
            doMove(-1);
        });
        oDownBtn.click(function(){
            doMove(1);
        });
        $(".update").hover(function(){
            clearTimeout(timer);
        },autoPlay);
        function autoPlay(){
            timer=setTimeout(function(){
                doMove(-1);
                timer=setTimeout(arguments.callee,2500);
            },2500);
        }
        autoPlay();
        function doMove(num){
            iNow+=num;
            if(Math.abs(iNow)>arrData.length-1){
                iNow=0;
            }
            if(iNow>0){
                iNow=-(arrData.length-1);
            }
            oUl.stop().animate({"top":iHeight*iNow},2200,"elasticOut");
        }
    })();
    //options选项卡切换
    (function(){
        fnTab($(".tabNav1"),$(".tabCon1"),"click");
        fnTab($(".tabNav2"),$(".tabCon2"),"click");
        fnTab($(".fnNav1"),$(".fnCon1"),"mouseover");
        fnTab($(".fnNav2"),$(".fnCon2"),"mouseover");
        function fnTab(oNav,aCon,events){
            var aElm=oNav.children();
            aCon.hide().eq(0).show();
            aElm.each(function(index){
                $(this)[events](function(){
                    aElm.find("a").attr("class","triangle-down-gray")
                        .end().removeClass("active").addClass("gradient");
                    $(this).find("a").attr("class","triangle-down-red")
                        .end().removeClass("gradient").addClass("active");
                    aCon.hide().eq(index).show();
                });
            });
        }
    })();
    //soso
    (function(){
        var oText=$("#text2");
        var value=oText.val();
        oText.focus(function(){
            if($(this).val()==value){
                $(this).val("");
            }
        }).blur(function(){
            if($(this).val()==""){
                $(this).val(value);
            }
        });
    })();
    //焦点图
    (function(){
        var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
        var oDiv=$("#fade");
        var aUlLi=oDiv.find("ul li");
        var aOlLi=oDiv.find("ol li");
        var oP=oDiv.find("p");
        var iNow=0;
        var timer=null;
        aOlLi.click(function(){
            iNow=$(this).index();
            fnFade();
        });
        oDiv.hover(function(){clearTimeout(timer)},autoPlay);
        function autoPlay(){
            timer=setTimeout(function(){
                iNow++;
                iNow%=arr.length;
                fnFade();
                timer=setTimeout(arguments.callee,2000);
            },2000);
        }
        autoPlay();
        fnFade();
        function fnFade(){
            aUlLi.each(function(index){
                if(index!==iNow){
                    aUlLi.eq(index).fadeOut().css("z-index",1);
                    aOlLi.eq(index).removeClass("active");
                }else{
                    aUlLi.eq(index).fadeIn().css("z-index",2);
                    aOlLi.eq(index).addClass("active");
                }
            });
            oP.text(arr[iNow]);
        }
    })();
    //日历提示
    (function(){
        var aSpan=$(".calender h3 span");
        var aImg=$(".calender ol img");
        var oPrompt=$("#todayInfo");
        var oImg=oPrompt.find("img");
        var oP=oPrompt.find("p");
        aImg.hover(
            function(){
                var iTop=$(this).parent().position().top-30;
                var iLeft=$(this).parent().position().left+55;
                oPrompt.show().css({"left":iLeft,"top":iTop});
                oP.text($(this).attr("info"));
                oImg.prop("src",$(this).attr("src"));
                var oStrong=oPrompt.find("strong");
                var index=$(this).parent().index()%aSpan.length;
                oStrong.text( aSpan.eq(index).text());
            },
            function(){
                oPrompt.hide();
            }
        );
    })();
    //bbs高亮
    (function(){
        $(".bbs ol").find("li").mouseover(function(){
            $(".bbs ol").find("li").removeClass().eq($(this).index()).addClass("active");
        });
    })();
    //红人烧客移入
    (function(){
        var arr = [
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];
        var aLi=$("#hotArea ul").find("li");
        aLi.not(":first").mouseover(function(){
            aLi.find("p").remove();
            $(this).append("<p>"+arr[$(this).index()-1]+"</p>")
                .find("p").css({"width":$(this).width()-12,"height":$(this).height()-12});
        });
    })();
    //阻止图片的拖拽事件
    $(document).mousedown(function(){return false});
});