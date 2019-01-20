function DropTarget(elem){
	elem.dropTarget = this;
	this._elem = elem;

	this._targetElem = null;
}

DropTarget.prototype._getTargetElem = function(avatar, event){
	let target = avatar.getTargetElem();
	let li = target.closest('li');

	if (li.tagName != 'LI') {
	return;
	}

	return li;
}

DropTarget.prototype._hideHoverIndication = function(avatar) {
 this._targetElem && this._targetElem.classList.remove('hover');
};


DropTarget.prototype._showHoverIndication = function(avatar) {
 this._targetElem && this._targetElem.classList.add('hover');
};


DropTarget.prototype.onDragMove = function(avatar, event) {

  var newTargetElem = this._getTargetElem(avatar, event);

  if (this._targetElem != newTargetElem) {

    this._hideHoverIndication(avatar);
    this._targetElem = newTargetElem;
    this._showHoverIndication(avatar);
  }
};


DropTarget.prototype.onDragEnd = function(avatar, event) {
  this._hideHoverIndication(avatar);
  avatar.onDraEnd();
  let info = avatar.getDragInfo();
  this._targetElem.parentNode.insertBefore(info.dragZoneElem.parentNode, this._targetElem);

};

