$(function(){
    let flipClass = "animated zoomOut";
    let tadaClass = 'animated pulse';
    let endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    $('.btn-sm').on({
        'click': ()=>{
            $('.btn-sm').addClass(flipClass).one(endClass, function(){
                $(this).removeClass(flipClass);
            })
        },

        'mouseover': ()=>{
            $('.btn-sm').addClass(tadaClass).one(endClass, function(){
                $(this).removeClass(tadaClass);
            })
        }
    });
});