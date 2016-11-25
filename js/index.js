
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
                oMain.animate({top:0},500,function(){
                    oReturn.css("display","block");
                });
                oInfo.animate({bottom:$(window).outerHeight()},500);
                oMain.height($(window).outerHeight());
            });
            oReturn.click(function(){
                oReturn.hide(400);
                oMain.animate({top:$(window).outerHeight()},500,function(){
                });
                oInfo.animate({bottom:0},500);
            });
        }
    )();
});