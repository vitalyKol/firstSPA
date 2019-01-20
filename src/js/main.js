//= DragAvatar.js
//= DragZone.js
//= DropTarget.js
//= DragManager.js
//= DragDrop.js

let sectionStaff = document.getElementById('js-staff-ol');
let buttonStaff = document.getElementById('js-staff-but');
buttonStaff.addEventListener('click', addWorker);

function addWorker(){
	let li = document.createElement('li');
	let span = document.createElement('span');
	let butEdit = document.createElement('button');
	let butDelete = document.createElement('button');

	span.textContent = 'New worker';
	span.classList.add('js-dragWorker');
	butEdit.classList.add('staff__button');
	butEdit.classList.add('staff__button_edit');
	butEdit.addEventListener('click', editWorker);
	butDelete.classList.add('staff__button');
	butDelete.classList.add('staff__button_delete');
	butDelete.addEventListener('click', deleteWorker);
	
	butEdit.textContent = 'Edit';
	butDelete.textContent = 'Del';

	li.appendChild(span);
	li.appendChild(butEdit);
	li.appendChild(butDelete);

	sectionStaff.appendChild(li);
}

function editWorker(){
	let li = this.parentNode;
	let input = document.createElement('input');
	let butSave = document.createElement('button');
	let butCancel = document.createElement('button');
	let textSpan = li.firstElementChild.textContent;

	//check for custom text
	input.setAttribute('type', 'text');
	if(textSpan != '' && textSpan != 'New worker'){
		input.value = textSpan;
	}

	butSave.addEventListener('click', editWorkerSave);
	butCancel.addEventListener('click', editWorkerCancel);

	butSave.textContent = 'Save';
	butCancel.textContent = 'Cancel';

	//check for the existence of an open edit field
	let anotherli = document.querySelector('.js-staff__li_edit');
	if(anotherli != null){
		editWorkerCancel();
	}

	li.classList.add('js-staff__li_edit');
	li.firstElementChild.style.display = 'none';
	li.children[1].style.display = 'none';
	li.lastElementChild.style.display = 'none';
	li.appendChild(input);
	li.appendChild(butSave);
	li.appendChild(butCancel);

	input.focus();
}

function editWorkerSave(){
	let li = this.parentNode;
	let input = li.querySelector('input');
	let span = li.firstElementChild;
	
	span.textContent = input.value;
	editWorkerCancel();
}

function editWorkerCancel(){
	let li = document.querySelector('.js-staff__li_edit');
	let arrChild = li.children;

	for(let i = arrChild.length-1; i >= 0; i--){
		if(i < 3){
			arrChild[i].removeAttribute('style');
		}else{
			arrChild[i].parentNode.removeChild(arrChild[i]);
		}
	}

	li.classList.remove('js-staff__li_edit');
}

function deleteWorker(){
	this.parentNode.parentNode.removeChild(this.parentNode);
}


let list = document.getElementsByClassName('js-drag-list')[0];
 new DragZone(list);
 new DropTarget(list);
//DragDrop();

function getCoords(elem) { 
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
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
