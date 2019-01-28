class Workers{
	constructor(ol,button){
		this.sectionStaff = ol;
		this.buttonStaff = button;
		this.sectionStaff.addEventListener('click', this.workerControl.bind(this));
		this.buttonStaff.addEventListener('click', this.addWorker.bind(this));
		
		//work with localStorage JSON
		this.readStorage(); 
	}

	workerControl(event){
		let elem = event.target;
		let self = this;
		if(elem.closest('.staff__button_edit')){
			this.editWorker(elem, self);//bind(this);
		}else if(elem.closest('.staff__button_delete')){
			this.deleteWorker(elem);//.bind(this);
		}
	}

	addWorker(){
		let li = document.createElement('li');
		let span = document.createElement('span');
		let butEdit = document.createElement('button');
		let butDelete = document.createElement('button');

		span.textContent = 'New worker';
		span.classList.add('js-dragWorker');
		butEdit.classList.add('staff__button');
		butEdit.classList.add('staff__button_edit');
		butDelete.classList.add('staff__button');
		butDelete.classList.add('staff__button_delete');
		butEdit.textContent = 'Edit';
		butDelete.textContent = 'Del';

		li.appendChild(span);
		let butPositions = new Positions(li);
		li.appendChild(butEdit);
		li.appendChild(butDelete);
		
		//work with localStorage JSON
		this.idWorkers++;
		li.dataset.idKey = this.idWorkers;
		
		sectionStaff.appendChild(li);

		this.workersObj[this.idWorkers] = li.outerHTML;
		let json = JSON.stringify(this.workersObj);
		localStorage.setItem('workersObj', json);
		localStorage.setItem('idWorkers', this.idWorkers);


	}

	editWorker(elem, self){
		let li = elem.parentNode;
		let input = document.createElement('input');
		let butSave = document.createElement('button');
		let butCancel = document.createElement('button');
		let textSpan = li.firstElementChild.textContent;

		//check for custom text
		input.setAttribute('type', 'text');
		if(textSpan != '' && textSpan != 'New worker'){
			input.value = textSpan;
		}
		//if press Enter then to save
		input.addEventListener('keydown', function(event){
			if(event.keyCode == 13){
				self.editWorkerSave();
			}
		})
		//if press Esc then to cancel
		input.addEventListener('keydown', function(event){
			if(event.keyCode == 27){
				self.editWorkerCancel();
			}
		})

		butSave.addEventListener('click', this.editWorkerSave.bind(this));
		butCancel.addEventListener('click', this.editWorkerCancel.bind(this));

		butSave.textContent = 'Save';
		butCancel.textContent = 'Cancel';

		//check for the existence of an open edit field
		let anotherli = document.querySelector('.js-staff__li_edit');
		if(anotherli != null){
			editWorkerCancel();
		}

		li.classList.add('js-staff__li_edit');
		for(let i = 0; i < li.children.length; i++){
			li.children[i].style.display = 'none';
		}
		li.appendChild(input);
		li.appendChild(butSave);
		li.appendChild(butCancel);

		input.focus();
	}

	editWorkerSave(){
		let li = document.querySelector('.js-staff__li_edit');
		let input = li.querySelector('input');
		let span = li.firstElementChild;
		
		span.textContent = input.value;

		this.editWorkerCancel();
	}

	editWorkerCancel(){
		let li = document.querySelector('.js-staff__li_edit');
		let arrChild = li.children;

		console.log(arrChild);
		for(let i = 0; i < arrChild.length-3; i++){
			arrChild[i].removeAttribute('style');
		}
		let lengthArr = arrChild.length-3;
		for(let i = arrChild.length-1; i >= lengthArr; i--){
			arrChild[i].parentNode.removeChild(arrChild[i]);
		}

		li.classList.remove('js-staff__li_edit');

		//work with localStorage JSON
		let idKey = li.dataset.idKey;
		this.workersObj[idKey] = li.outerHTML;
		var json = JSON.stringify(this.workersObj);
		localStorage.setItem('workersObj', json);
	}

	deleteWorker(elem){
		let result = confirm('Удалить ' + elem.parentNode.firstElementChild.innerHTML + '?');
		if(result) {
			elem.parentNode.parentNode.removeChild(elem.parentNode);

			//work with localStorage JSON
			let idKey = elem.parentNode.dataset.idKey;
			var json = localStorage.getItem('workersObj');
			this.workersObj = JSON.parse(json);
			delete this.workersObj[idKey];
			json = JSON.stringify(this.workersObj);
			localStorage.setItem('workersObj', json);
		}
	}

	readStorage(){
		let jsonStr = localStorage.getItem('workersObj');
		if(jsonStr) this.workersObj = JSON.parse(jsonStr);
		else this.workersObj = {};
		this.idWorkers = localStorage.getItem('idWorkers');

		if(this.idWorkers == undefined || this.idWorkers == null){ 
			this.idWorkers = 0;
			localStorage.setItem('idWorkers', 0);
		}
		var strObj = '';
		for(let key in this.workersObj){
			strObj += this.workersObj[key];
		}
		this.sectionStaff.innerHTML = strObj;
	}
}