
$(function(){
    /*主体功能实现*/
    (function(){
            var oBgImg=$("#bgImg");
            var oInfo=$(".info");
            $(window).resize(function(){
                oBgImg.css("height",$(window).outerHeight());
            });
            oBgImg.css("height",$(window).outerHeight());
            var oBtn=oBgImg.find("a");
            var oMain=$("#main");
            oBtn.click(function(){
                /*var oHeight=oBgImg.outerHeight();
                $(window).scrollTop(oHeight);*/
                oMain.animate({top:0},500,function(){
                    oInfo.hide();
                });
                oMain.height($(window).outerHeight());
            });
        }
    )();
});