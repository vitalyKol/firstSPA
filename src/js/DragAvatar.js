function DragAvatar(dragZone, dragElem){
	this._dragZone = dragZone;
	this._dragZoneElem = dragElem;
	this._dragElem = dragElem;
}

DragAvatar.prototype.initFromEvent = function(downX, downY, event){
	if (event.target.tagName != 'SPAN') return false;

	this._dragZoneElem = event.target;
	let elem = this._elem = this._dragZoneElem.cloneNode(true);
	elem.className = 'avatar';

	let coords = getCoords(this._dragZoneElem);
	this._shiftX = downX - coords.left;
	this._shiftY = downY - coords.top;

	document.body.appendChild(elem);
	elem.style.zIndex = 9999;
	elem.style.position = 'absolute';

	return true;
};

DragAvatar.prototype.getDragInfo = function(event){
	return {
		elem:this._elem,
		dragZoneElem: this._dragZoneElem,
		dragZone: this._dragZone
	};
};

DragAvatar.prototype.getTargetElem = function(){
	return this._currentTargetElem;
};

DragAvatar.prototype.onDragMove = function(event){
	this._elem.style.left = event.pageX - this._shiftX + 'px';
	this._elem.style.top = event.pageY - this._shiftY + 'px';

	this._currentTargetElem = getElementUnderClientXY(this._elem, event.clientX, event.clientY);
};

DragAvatar.prototype._destroy = function() {
  this._elem.parentNode.removeChild(this._elem);
};

DragAvatar.prototype.onDragCancel = function(){
	this._destroy();
};

DragAvatar.prototype.onDraEnd = function(){
	this._destroy();
};	


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

  return {
    top: Math.round(top),
    left: Math.round(left)
  };
}

