function $(selector, el) {
  if (!el){ el = document; }
  return el.querySelector(selector);
}
function addClass(el, value) {
  var curClass = el.className;
  if ( curClass.indexOf( " " + value + " ") < 0) {
    el.className += ' ' + value;
  }
}
function removeClass(el, value) {
  var curClass  = el.className;
  if ( curClass.indexOf( " " + value + " ") >= 0 ) {
    el.className.replace( " " + value + " ", " ");
  }
}
function createEl(args){return document.createElement(args);}
function createText(args){return document.createTextNode(args);}
