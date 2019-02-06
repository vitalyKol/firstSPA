function DropTarget(elem){
	elem.dropTarget = this;
	this._elem = elem;

	this._targetElem = null;
}

DropTarget.prototype._getTargetElem = function(avatar, event){

	let target = avatar.getTargetElem();
	let li = target.closest('li');

	if(li){
		if (li.tagName != 'LI') {
			return;
		}
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
    
    if(this._targetElem == null)return false;
	
	let ol = this._targetElem.parentNode;
	ol.insertBefore(info.dragZoneElem.parentNode, this._targetElem);
	//this._targetElem = null;

	//work with localStorage JSON
	let workersObj = {};
	let strObj = '';
	let count = 0;
	for(let i = 0; i < ol.children.length; i++){
		ol.children[i].dataset.idKey = i+1;
		workersObj[i+1] = ol.children[i].outerHTML;
		count = i+1;
	}

	let json = JSON.stringify(workersObj);
	localStorage.setItem('workersObj', json);
	localStorage.setItem('idWorkers', count);

console.log('MOVE')
json = localStorage.getItem('workersObj');
workersObj = JSON.parse(json);
console.log(workersObj);	
};

