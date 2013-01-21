function $(selector, el) {
  if (!el){ el = document; }
  return el.querySelector(selector);
}
// adds a class to an element.
// doesn't do hard searching to make sure it doesn't exist
// TODO:
// don't match substrings of similar names
// ability to add multiple classes at once
function addClass(el, value) {
  var curClass = el.className,
      newClass;
  if ( curClass.indexOf( value ) < 0) {
    newClass = curClass + " " + value;
    el.className = newClass.trim();
  }
}
// removes a class
// simple search
// TODO:
// don't remove substrings of existing classes
// remove multiple classnames properly
function removeClass(el, value) {
  var curClass  = el.className,
      newClass;
  if (curClass !== undefined) {
    newClass = curClass.replace(value, "");
    el.className = newClass.trim();
  }
  //if ( curClass.indexOf( value ) >= 0 ) {
  //}
}
function createEl(args){return document.createElement(args);}
function createText(args){return document.createTextNode(args);}
