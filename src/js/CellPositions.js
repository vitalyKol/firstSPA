class CellPositions{
	constructor(){
		this.car = document.createElement('img');
		this.car.setAttribute('src','i/calenadr-icon-car.png');
		this.car.setAttribute('title','car');

		this.schedule = document.createElement('img');
		this.schedule.setAttribute('src','i/calenadr-icon-schedule.png');
		this.schedule.setAttribute('title','schedule');

		this.div = document.createElement('div');
		this.div.classList.add('section_calendar__schedule-list');

		this.div.appendChild(this.car);
		this.div.appendChild(this.schedule);
		let br = document.createElement('br');
		this.div.appendChild(br);

		for(let i = 1; i < 9; i++){

			let digit = document.createElement('span');
			let str = ''+i;
			digit.innerHTML = str;
			digit.classList.add('schedule-list__digit');
			digit.setAttribute('title', str);
			this.div.appendChild(digit);
		}

		this.div.addEventListener('click', this.controlClick.bind(this));
		this.div.classList.add('displayHide');
		document.body.appendChild(this.div);

	}

	controlClick(){
		let elem = event.target;
		let parent = this.elem;
		if(elem.tagName == 'DIV') return false;

		let attrTitle = elem.getAttribute('title');
		let flagExist = false;
		for(let i = 0; i < parent.children.length; i++){
			if(parent.children[i].getAttribute('title') == attrTitle){
				parent.removeChild(parent.children[i]);
				flagExist = true;
			}
		}

		if(!flagExist){
			let clone = elem.cloneNode(true);
			if(attrTitle == 'schedule'){
				clone.style.top = 2 + 'vw';
			}
			if(clone.classList.contains('schedule-list__digit')){
				if(Number(attrTitle)>4){
					clone.style.top = 1.2 * attrTitle - 6 + 'vw';
				}else{
					clone.style.top = 1.2 * attrTitle - 1.2 + 'vw';
					clone.style.right = 1.3 + 'vw';	
				}
			}
			parent.appendChild(clone);
		}

		console.log(attrTitle);
		console.log(parent);
	}

	showHideList(elem){
		this.elem = elem;
		let cover = document.createElement('div');
		cover.style.cssText = 'position: absolute;\
								z-index: 9000;\
								background-color: rgba(12, 146, 145, 0.3);\
								width: 100%;\
								height: 100%;\
								top:0;\
								left:0;';
		document.body.appendChild(cover);
		cover.style.top = document.documentElement.scrollTop + 'px';
		document.body.style.overflow = 'hidden';


		let coordsButton = getCoords(elem);
		console.log(coordsButton.top);
		console.log(elem.offsetHeight);
		console.log(event.clientY);
		this.div.style.top = coordsButton.top - elem.offsetHeight - document.documentElement.scrollTop - 25 + 'px';
		this.div.style.left = coordsButton.left + 'px';

		this.div.classList.remove('displayHide');

		console.log('H: ' + document.documentElement.scrollTop );
		
		cover.addEventListener('click', ()=>{
			this.div.classList.add('displayHide');
			document.body.removeChild(cover);
			document.body.style.overflow = '';
		});

	}


}