class Workers{
	constructor(ol,button){
		this.sectionStaff = ol;
		this.buttonStaff = button;
		this.sectionStaff.addEventListener('click', this.workerControl.bind(this));
		this.buttonStaff.addEventListener('click', this.addWorker.bind(this));
		
		//work with localStorage JSON
		this.readStorage(); 

	}
 	
	workerControl(event){ //tracks all clicks
		let elem = event.target;
		let self = this;
		if(elem.closest('.staff__button_edit')){
			this.editWorker(elem, self);//bind(this);
		}else if(elem.closest('.staff__button_delete')){
			this.deleteWorker(elem);//.bind(this);
		}else if(elem.closest('.staff__button_plus')){
			this.showHideList(elem);
		}else if(elem.closest('.list-positions')){
			let li = elem.closest('li');
			let but = li.getElementsByClassName('staff__button_plus')[0];
			this.addPositions(li,but);
		}
	}

	addWorker(){ //add new worker(element li in ol)
		let countWorker = localStorage.getItem('countWorkers');
		if(countWorker === null) countWorker = 0;
		if(countWorker >= 8) return false;

		let li = document.createElement('li');
		let span = document.createElement('span');
		let butEdit = document.createElement('button');
		let butDelete = document.createElement('button');
		let buttonPlus = document.createElement('button');
		
		span.textContent = 'Новый сотрудник';
		span.classList.add('js-dragWorker');
		span.classList.add('list-workers__worker');
		buttonPlus.classList.add('staff__button');
		buttonPlus.classList.add('staff__button_plus');
		butEdit.classList.add('staff__button');
		butEdit.classList.add('staff__button_edit');
		butDelete.classList.add('staff__button');
		butDelete.classList.add('staff__button_delete');

		li.appendChild(span);
		li.appendChild(buttonPlus);
		li.appendChild(butEdit);
		li.appendChild(butDelete);

		
		//work with localStorage JSON
		countWorker++;
		localStorage.setItem('countWorkers', countWorker);

		this.idWorkers++;
		li.dataset.idKey = this.idWorkers;
		
		sectionStaff.appendChild(li);
		
		this.workersObj[this.idWorkers] = li.outerHTML;
		let json = JSON.stringify(this.workersObj);
		localStorage.setItem('workersObj', json);
		localStorage.setItem('idWorkers', this.idWorkers);

// console.log('Add')
// json = localStorage.getItem('workersObj');
// this.workersObj = JSON.parse(json);
// console.log(this.workersObj);	
	}

	editWorker(elem, self){//edit title(span) in worker(li)
		let li = elem.parentNode;
		let input = document.createElement('input');
		let butSave = document.createElement('button');
		let butCancel = document.createElement('button');
		let textSpan = li.firstElementChild.textContent;

		//check for custom text
		input.setAttribute('type', 'text');
		input.classList.add('staff__input_edit');
		if(textSpan != '' && textSpan != 'Новый сотрудник'){
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

		butSave.classList.add('staff__button');
		butSave.classList.add('staff__button_save');
		butCancel.classList.add('staff__button');
		butCancel.classList.add('staff__button_cancel');
		// butSave.textContent = 'Save';
		// butCancel.textContent = 'Cancel';

		//check for the existence of an open edit field
		let anotherli = document.querySelector('.js-staff__li_edit');
		if(anotherli != null){
			this.editWorkerCancel();
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

	editWorkerSave(){//saves the new name of the worker
		let li = document.querySelector('.js-staff__li_edit');
		let input = li.querySelector('input');
		let span = li.firstElementChild;
		
		span.textContent = input.value;

		this.editWorkerCancel();
	}

	editWorkerCancel(){//removes the edit mode and restores the normal
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
		let ol = li.parentNode;
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

		// let idKey = li.dataset.idKey;
		// this.workersObj[idKey] = li.outerHTML;
		// var json = JSON.stringify(this.workersObj);
		// localStorage.setItem('workersObj', json);

// console.log('EDIT')
// json = localStorage.getItem('workersObj');
// this.workersObj = JSON.parse(json);
// console.log(this.workersObj);		
	}

	deleteWorker(elem){ //removes the li element and the worker from the localStorage
		let result = confirm('Удалить ' + elem.parentNode.firstElementChild.innerHTML + '?');
		if(result) {
			elem.parentNode.parentNode.removeChild(elem.parentNode);

			//work with localStorage JSON
			let countWorker = localStorage.getItem('countWorkers');
			countWorker--;
			localStorage.setItem('countWorkers', countWorker);

			let idKey = elem.parentNode.dataset.idKey;
			var json = localStorage.getItem('workersObj');
			this.workersObj = JSON.parse(json);

			console.log(delete this.workersObj[idKey]);
			json = JSON.stringify(this.workersObj);
			localStorage.setItem('workersObj', json);

// console.log('DEL')
// json = localStorage.getItem('workersObj');
// this.workersObj = JSON.parse(json);
// console.log(this.workersObj);
		}
	}

	readStorage(){ //at the start adds all employees from the database
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

// console.log('START')
// console.log(this.workersObj);	
	}

	addPositions(place, beforeElem){ //add 'Упр.' 'Мнж.' 'Стж.' 'Мшн.' 'Рсп.' 
		if (event.target.tagName != 'SPAN') return false;
		let position = event.target.dataset.position;
		if( event.target.classList.contains('locked') ) return false;
		
		if( event.target.classList.contains('selected') ){
			
			//check for mutually exclusive items
			if(position == 'js-position_dir'){
				let manager = event.target.parentNode.getElementsByClassName('js-position_manager')[0];
				let junior = event.target.parentNode.getElementsByClassName('js-position_junior')[0];

				manager.classList.remove('locked');
				junior.classList.remove('locked');
			}else if(position == 'js-position_manager'){
				let dir = event.target.parentNode.getElementsByClassName('js-position_dir')[0];
				let junior = event.target.parentNode.getElementsByClassName('js-position_junior')[0];

				dir.classList.remove('locked');
				junior.classList.remove('locked');
			}else if(position == 'js-position_junior'){
				let dir = event.target.parentNode.getElementsByClassName('js-position_dir')[0];
				let manager = event.target.parentNode.getElementsByClassName('js-position_manager')[0];

				dir.classList.remove('locked');
				manager.classList.remove('locked');
			}

			let elem = place.getElementsByClassName('.' + event.target.dataset.position)[0];

			elem.parentNode.removeChild(elem);
			event.target.classList.remove('selected');
		}else{
			event.target.classList.add('selected');
			
			let elem = event.target.cloneNode(true);
			
			//check for mutually exclusive items
			if(position == 'js-position_dir'){
				let manager = event.target.parentNode.getElementsByClassName('js-position_manager')[0];
				let junior = event.target.parentNode.getElementsByClassName('js-position_junior')[0];

				manager.classList.add('locked');
				junior.classList.add('locked');
			}else if(position == 'js-position_manager'){
				let dir = event.target.parentNode.getElementsByClassName('js-position_dir')[0];
				let junior = event.target.parentNode.getElementsByClassName('js-position_junior')[0];

				dir.classList.add('locked');
				junior.classList.add('locked');
			}else if(position == 'js-position_junior'){
				let dir = event.target.parentNode.getElementsByClassName('js-position_dir')[0];
				let manager = event.target.parentNode.getElementsByClassName('js-position_manager')[0];

				dir.classList.add('locked');
				manager.classList.add('locked');
			}

			elem.classList.add('.' + position);

			place.insertBefore(elem,beforeElem);
		}
		//work with localStorage JSON
		let listPositions = place.querySelector('.list-positions');
		listPositions.classList.add('displayHide'); //hide list
		let idKey = place.dataset.idKey;
		this.workersObj[idKey] = place.outerHTML;
		var json = JSON.stringify(this.workersObj);
		localStorage.setItem('workersObj', json);
	    listPositions.classList.remove('displayHide');////show list

// console.log('EDIT');
// json = localStorage.getItem('workersObj');
// this.workersObj = JSON.parse(json);
// console.log(this.workersObj);	
	}

	showHideList(elem){ //shows or hides the list of positions
		let cover = document.createElement('div');
		cover.style.cssText = 'position: absolute;\
								z-index: 9000;\
								background-color: rgba(12, 146, 145, 0.3);\
								width: 100%;\
								height: 100%;\
								top:0;\
								left:0;';
		document.body.appendChild(cover);
		document.body.style.overflow = 'hidden';
		cover.style.top = document.documentElement.scrollTop + 'px';

		let li = elem.closest('li');
		let listPositions = li.querySelector('.list-positions');
		console.log(listPositions);
		if(listPositions === null){
			let li = elem.closest('li');
			listPositions = this.createList(elem);
		 	
		 	li.appendChild(listPositions);
		}
		cover.addEventListener('click', function(){
			listPositions.classList.add('displayHide');
			document.body.removeChild(cover);
			document.body.style.overflow = '';
		});

		//setting new coordinates over an element li
		let coordsButton = getCoords(li);
		listPositions.style.top = coordsButton.top - elem.offsetHeight - document.documentElement.scrollTop - 10 + 'px';
		listPositions.style.left = coordsButton.left + 'px';
		listPositions.style.position = 'fixed';
		listPositions.style.zIndex = 9999;

		listPositions.classList.remove('displayHide');
		
	}

	createList(elem){//creates and returns a list of positions
		let div = document.createElement('div');
		let arrPositions = ['<span data-position="js-position_dir" class="js-position_dir">Упр.</span>', 
							'<span data-position="js-position_manager" class="js-position_manager">Мнд.</span>', 
							'<span data-position="js-position_car" class="js-position_car">Мшн.</span>', 
							'<span data-position="js-position_junior" class="js-position_junior">Стж.</span>', 
							'<span data-position="js-position_schedule" class="js-position_schedule">Рсп.</span>'];

		let strDiv = '';
		arrPositions.forEach((e)=>{
			strDiv += e;
			
		});
		div.innerHTML += strDiv;
		div.classList.add('displayHide');
		div.classList.add('list-positions');
		return div;
	}
}