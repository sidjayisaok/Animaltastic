//variables used
var flipClass = "animated zoomOut";
var tadaClass = 'animated rubberBand';
var findGiphy = '#findGiphy';
var clearGiphy = '#clearGiphy';

  //DRY version to control image animation
function logicAnim(param, classA, classB){

    var endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

     $(param).on({
        'click': function(){
            $(param).addClass(classA).one(endClass, function(){
                $(this).removeClass(classA);
            })
        },

        'mouseover': function(){
            $(param).addClass(classB).one(endClass, function(){
                $(this).removeClass(classB);
            })
        }
    });
}

//call function
logicAnim(findGiphy, flipClass, tadaClass);
logicAnim(clearGiphy, flipClass, tadaClass); 


