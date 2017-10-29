//variables used
const flipClass = "animated zoomOut";
const tadaClass = 'animated rubberBand';
const findGiphy = '#findGiphy';
const clearGiphy = '#clearGiphy';

  //DRY version to control button animation
const logicAnim = (param, classA, classB)=> {
     document.querySelector(param).addEventListener('click', addRemoveClass(param, classA));

     document.querySelector(param).addEventListener('hover', addRemoveClass(param, classB));
}


const addRemoveClass = (param, myClass)=> {

    const endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    $(param).addClass(myClass).one(endClass, function(){
        $(this).removeClass(myClass);
    });
}

//call function
logicAnim(findGiphy, flipClass, tadaClass);
logicAnim(clearGiphy, flipClass, tadaClass);
