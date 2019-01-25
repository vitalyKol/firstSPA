
function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docElem = document.documentElement;

  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

  var clientTop = docElem.clientTop || body.clientTop || 0;
  var clientLeft = docElem.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  var right = box.right + scrollLeft - clientLeft;
  var bottom = box.bottom + scrollTop - clientTop;

  return {
    top: Math.round(top),
    left: Math.round(left),
    right: Math.round(right),
    bottom: Math.round(bottom)
  };
}

function getElementUnderClientXY(elem, clientX, clientY) {
  var display = elem.style.display || '';
  elem.style.display = 'none';

  var target = document.elementFromPoint(clientX, clientY);

  elem.style.display = display;

  if (!target || target == document) { 
    target = document.body;
  }

  return target;
}
