jQuery.noConflict();//改变jQuery变量$为jQuery
/*------------------右键菜单-------------------------------------------*/
var customNav = "";
jQuery(function(){
    var rightNav = "",cL = "",cQ = "",cH = "";
    if(customNav!=""){
        if(customNav.customLink){
            jQuery.each(customNav.customLink,function(i,item){
                cL += "<li><a href='"+item[0]+"'>"+item[1]+"</a></li>"
            });
        }
        if(customNav.qrCode){
            cQ += "<li class='qrBtn'><a>"+customNav.qrCode[1]+"</a></li>";
            cQ += "<li class='qrBox'><img src='"+customNav.qrCode[0]+"' alt='二维码'/></li>";
        }
        if(customNav.customLink && customNav.qrCode){
            cL += "<hr>";
        }
        if(customNav.customLink || customNav.qrCode){
            cH += "<hr>"
        }
    }
    rightNav += "<ul class='ccRightNav'>";
    rightNav += "<li><a onclick='history.back();'>返回(B)<small>Alt+向左箭头</small></a></li><li><a onclick='history.go(1)'>前进(F)<small>Alt+向右箭头</small></a></li><li><a href='#' onclick='window.location.reload()'>重新加载(R)<small>Ctrl+R</small></a></li>";//上方三个默认按键，可删除
    rightNav += cH;//添加下划线
    rightNav += cL;//自定义菜单，可以多加
    rightNav += cQ;//自定义二维码
    rightNav += "</ul>";
    jQuery("body").append(rightNav);//把生成好的右键菜单添加到Body底部
    var rightNavC = jQuery('.ccRightNav');
    /*------------------右键菜单样式-------------------------------------------*/
    rightNavC.css({
        "width":"280px",
        "background":"#fff",
        "position":"fixed",
        "border":"1px solid #bababa",
        "padding":"5px 0 0 0",
        "margin":"0",
        "z-index":"1001",
        "font-weight":"normal",
        "display":"none"
    });
    jQuery(".ccRightNav li").css({
        "height":"23px",
        "line-height":"23px",
        "font-size":"0.8em",
        "list-style":"none",
        "padding":"0",
        "margin":"0 0 4px 0",
        "text-decoration":"none"
    }).mouseover(function(){
        jQuery(this).css("background","#4281f4").find("a,small").css("color","#fff");
    }).mouseleave(function(){
        jQuery(this).css("background","none").find("a").css("color","#111").find("small").css("color","#a6a6a6");
    });
    jQuery(".ccRightNav li a").css({
        "display":"block",
        "padding":"0 25px",
        "margin":"0",
        "color":"#111",
        "text-decoration":"none",
        "font-size":"0.75em",
        "cursor":"pointer",
        "transition":"all 0s"
    });
    jQuery(".ccRightNav li a small").css({
        "color":"#a6a6a6",
        "font-size":"1em",
        "float":"right",
        "line-height":"23px",
        "font-weight":"300",
        "transition":"all 0s"
    });
    jQuery(".ccRightNav hr").css({
        "border":"none",
        "border-bottom":"1px solid #e9e9e9",
        "background":"none",
        "margin":"3px 0 5px 0"
    });
    jQuery(".ccRightNav li.qrBox").css({
        "width":rightNavC.height()-20+"px",
        "height":rightNavC.height()-20+"px",
        "max-width":"300px",
        "max-height":"300px",
        "position":"absolute",
        "bottom":"-5px",
        "border":"1px solid #bababa",
        "overflow":"hidden",
        "display":"none"
    });
    jQuery(".ccRightNav li.qrBox img").css({
        "width":"100%",
        "height":"100%"
    });
    jQuery(".ccRightNav li.qrBtn").mouseover(function(){
        jQuery(".ccRightNav li.qrBox").fadeIn(1);
    }).mouseleave(function(){
        jQuery(".ccRightNav li.qrBox").fadeOut(1);
    });
    /*------------------右键事件-------------------------------------------*/
    jQuery(document).bind("contextmenu",function(e){
        var pointX = (e.pageX)-(jQuery(window).scrollLeft()),pointY = (e.pageY)-(jQuery(window).scrollTop());
        rightNavC.css("display","block");
        /*------------------菜单和二维码定位-------------------------------------------*/
        if(pointX+600>=jQuery(window).width()){
            jQuery(".ccRightNav").css({
                "right":jQuery(window).width()-pointX+"px",
                "left":"auto"
            });
            jQuery(".ccRightNav li.qrBox").css({
                "right":"278px",
                "left":"auto"
            })
        }else{
            jQuery(".ccRightNav").css({
                "left":pointX+"px",
                "right":"auto"
            });
            jQuery(".ccRightNav li.qrBox").css({
                "left":"278px",
                "right":"auto"
            })
        }
        if(jQuery(window).height()-pointY<=rightNavC.height()){
            jQuery(".ccRightNav").css({
                "bottom":jQuery(window).height()-pointY+"px",
                "top":"auto"
            });
        }else{
            jQuery(".ccRightNav").css({
                "top":pointY+"px",
                "bottom":"auto"
            });
        }
        return false;
    }).click(function(){
        rightNavC.css("display","none");
    });
});
