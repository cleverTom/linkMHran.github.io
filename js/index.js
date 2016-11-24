
$(function(){
    /*主体功能实现*/
    (function(){
            var oBgImg=$("#bgImg");
            var oInfo=$(".info");
            var oReturn=$("#btn1");
            var oBtn=oBgImg.find("a");
            var oMain=$("#main");
            $(window).resize(function(){
                oBgImg.css("height",$(window).outerHeight());
            });
            oBgImg.css("height",$(window).outerHeight());
            oBtn.click(function(){
                /*var oHeight=oBgImg.outerHeight();
                $(window).scrollTop(oHeight);*/
                oMain.animate({top:0},500,function(){
                    oInfo.hide();
                    oReturn.css("display","block");
                });
                oMain.height($(window).outerHeight());
            });
            oReturn.click(function(){
                oReturn.css("display","none");
                oMain.animate({top:$(window).outerHeight()},500,function(){
                    oInfo.show();
                });
            });
        }
    )();
});