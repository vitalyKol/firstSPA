function DragDrop(){
let dragObject = {};
document.onmousedown = function(e) {

	//checks which button was pressed
  if (e.which != 1) { 
    return; 
  }

  let elem = e.target.closest('.js-dragWorker');

  if (!elem) return; 
  dragObject.elem = elem.parentNode;

  // initial coords of object
  dragObject.downX = e.pageX;
  dragObject.downY = e.pageY;
}

document.onmouseup = function(e) {
 
  if (dragObject.avatar) {
    finishDrag(e);
  }

  dragObject = {};
}

document.onmousemove = function(e){
	
	if(!dragObject.elem) return;

	if(!dragObject.avatar){
		let moveX = e.pageX - dragObject.downX;
		let moveY = e.pageY - dragObject.downY;
		if( Math.abs(moveX) < 3 && Math.abs(moveY) < 3) return;
	
		dragObject.avatar = createAvatar(e);
		if(!dragObject.avatar){
			dragObject = {};
			return;
		}

		let coords = getCoords(dragObject.avatar);
		dragObject.shiftX = dragObject.downX - coords.left;
		dragObject.shiftY = dragObject.downY - coords.top;

		startDrag(e);
	}
console.log(1);
	dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
	dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

}

function createAvatar(event){
	console.log(3);
	// запомнить старые свойства, чтобы вернуться к ним при отмене переноса
  let avatar = dragObject.elem;
  let old = {
    parent: avatar.parentNode,
    nextSibling: avatar.nextSibling,
    position: avatar.position || '',
    left: avatar.left || '',
    top: avatar.top || '',
    zIndex: avatar.zIndex || ''
  };

  // function to cancel the transfer
  avatar.rollback = function() {
    old.parent.insertBefore(avatar, old.nextSibling);
    avatar.style.position = old.position;
    avatar.style.left = old.left;
    avatar.style.top = old.top;
    avatar.style.zIndex = old.zIndex;
    console.log(old.parent);
  };

  //function to insert an object into a new position
	avatar.embedElem = function(elem) {
	    old.parent.insertBefore(avatar, elem);
	    avatar.style.position = old.position;
	    avatar.style.zIndex = old.zIndex;
	    console.log(9);
	};
  return avatar;
}

function finishDrag(event) {
  let dropElem = findDroppable(event);

  if (dropElem) {
   dragObject.avatar.embedElem(dropElem);
  } else {
   dragObject.avatar.rollback();
  }
  //dragObject.avatar.rollback();
}

function findDroppable(event) {
  dragObject.avatar.hidden = true;

  // get the most nested item under the mouse cursor
  let elem = document.elementFromPoint(event.clientX, event.clientY);

  dragObject.avatar.hidden = false;

  if (elem == null) {
    return null;
  }

  return elem.closest('li');
}

function startDrag(event){
	console.log(4);
	let avatar = dragObject.avatar;

	document.body.appendChild(avatar);
	avatar.style.zIndex = 9999;
	avatar.style.position = 'absolute';
}

}