/* Solution taken from http://davidwalsh.name/css-animation-callback */
function whichTransitionEvent(element){
  var t;
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  }

  for(t in transitions){
    if(element.style[t] !== undefined ){
      return transitions[t];
    }
  }
}
