let dragManager = new function(){

	let dragZone, avatar, dropTarget;
	let downX, downY;

	let self = this;

	function onMouseDown(e){
		// if not left button of mouse
		if(e.which != 1) return false;

		dragZone = findDragZone(e);
		if(!dragZone) return;

		//memorize coords
		downX = e.pageX;
		downY = e.pageY;

		return false;
	}

	function onMouseMove(e){
		if(!dragZone) return;

		if(!avatar){
			if(Math.abs(e.pageX - downX) < 3 && Math.abs(e.pageY - downY) < 3){
				return;
			}

			avatar = dragZone.onDragStart(downX, downY, e);

			if(!avatar){
				clearUp();
				return;
			}
		}

		avatar.onDragMove(e);
		dropTarget = findDropTarget(e);

		dropTarget && dropTarget.onDragMove(avatar, e);

		return false; 
	}

	function onMouseUp(e){
		if(e.which != 1) return false;

		if(avatar){
			if(dropTarget){
				dropTarget.onDragEnd(avatar, e);
			}else{
				avatar.onDragCancel();
			}
		}

		clearUp();
	}

	function clearUp(){
		dragZone = avatar = dropTarget = null;
	}

	function findDragZone(event){
		let elem = event.target;

		while(elem != document && !elem.dragZone){
			elem = elem.parentNode;
		}

		return elem.dragZone;
	}

	function findDropTarget(event){
		let elem = avatar.getTargetElem();

		while(elem != document && !elem.dropTarget){
			elem = elem.parentNode;
		}

		if(!elem.dropTarget) return null;

		return elem.dropTarget;
	}

	document.ondragstart = function(){return false;};

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
	document.addEventListener('mousedown', onMouseDown);
}