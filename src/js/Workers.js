function Workers(ol, button){
		sectionStaff = ol;
		buttonStaff = button;
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
		console.log(1);
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
}