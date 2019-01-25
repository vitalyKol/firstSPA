class Positions{
	constructor(place){
		this._place = place;
		this._buttonPlus = document.createElement('button');
		this._buttonPlus.innerHTML = '+';
		this._buttonPlus.addEventListener('click', this.showHideList.bind(this));
		this._place.appendChild(this._buttonPlus);
		this._createFlag = false;
		
	}

	addPositions(place, beforeElem){
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
	}

	showHideList(){
		if(!this._createFlag) this._list = this.createList();

		this._list.addEventListener('click', this.addPositions.bind(null,this._place,this._buttonPlus));

		this._list.classList.toggle('displayHide');
		if(!this._list.classList.contains('displayHide')){
			this._buttonPlus.innerHTML = '-';
		}else{
			this._buttonPlus.innerHTML = '+';
		}
	}

	createList(){
		let div = document.createElement('div');
		let arrPositions = ['<span data-position="js-position_dir" class="js-position_dir">Упр</span>', 
							'<span data-position="js-position_manager" class="js-position_manager">Мендж</span>', 
							'<span data-position="js-position_car" class="js-position_car">Машина</span>', 
							'<span data-position="js-position_junior" class="js-position_junior">Стажр</span>', 
							'<span data-position="js-position_schedule" class="js-position_schedule">Расп</span>'];

		let strDiv = '';
		arrPositions.forEach((e)=>{
			strDiv += e;
			
		});
		div.innerHTML += strDiv;
		let coordsButton = getCoords(this._buttonPlus);
		
		div.style.position = 'absolute';
		div.style.zIndex = 9999;
		div.style.top = coordsButton.top - this._buttonPlus.offsetHeight + 'px';
		div.style.left = coordsButton.left + 'px';
		div.classList.toggle('displayHide');
		
		this._createFlag = true;
		this._place.appendChild(div);

		return div;
	}
}