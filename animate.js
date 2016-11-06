$(function(){
    let flipClass = "animated zoomOut";
    let tadaClass = 'animated pulse';
    let bounceInClass ='animated bounceIn';
    let rubberClass = 'animated rubberBand';
    let endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    $('img').on({
        'click': ()=>{
            $('img').addClass(flipClass).one(endClass, function(){
                $(this).removeClass(flipClass);
            })
        },

        'mouseover': ()=>{
            $('img').addClass(tadaClass).one(endClass, function(){
                $(this).removeClass(tadaClass);
            })
        }
    });
});