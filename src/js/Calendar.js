
class Calendar{
	constructor(placeCalendar, dateInfo, buttonInfo){
		this._placeCalendar = placeCalendar;
		this._dateInfo = dateInfo;
		this._buttonInfo = buttonInfo;
		this._dateObjInfo = {};
		this._buttonInfo.addEventListener('click',this.getInfoDate.bind(this, this._dateInfo));
		this.createMonth(this._placeCalendar);
		this.createYears(this._dateInfo);

		this.listPositions = new CellPositions();
	}

	calendarManager(){
		let elem = event.target.closest('td');
		if(elem.classList.contains('calendar__ceil_gray')){
			return false;
		}
		this.listPositions.showHideList(elem);
	}

	createMonth(placeCalendar, year, month){
		let startDate = new Date();
		year = year || startDate.getFullYear();
		month = month || startDate.getMonth();
		let table = document.createElement('table');
		let date = new Date(year, month);
		let firstDayWeek, lastDayWeek, lastDate, countRow, countDays = 0;
	
		date.setDate(1);
		firstDayWeek = date.getDay();
		if(firstDayWeek == 0) firstDayWeek = 7;
		date.setMonth(date.getMonth()+1);
		date.setDate(0);
		lastDate = date.getDate();
		lastDayWeek = date.getDay();
		countRow = Math.ceil((lastDate + firstDayWeek - 1)/7);
		countDays = 1; 
		date = new Date();

		table.innerHTML = '<tr><th>Понедельник</th><th>Вторник</th><th>Среда</th><th>Четверг</th><th>Пятница</th><th>Суббота</th><th>Воскресение</th></tr>';
		table.setAttribute('id', 'js-calendar__table-month');
		table.addEventListener('click', this.calendarManager.bind(this));

		for(let i = 0; i < countRow; i++){
			let tr = document.createElement('tr');
			
			for(let j = 1; j <= 7; j++){

				let td = document.createElement('td');
				
				if(i == 0 && j < firstDayWeek){
					td.innerHTML = 'x';
					td.classList.add('calendar__ceil_gray');
				} else if(countDays > lastDate){
					td.innerHTML = 'x';
					td.classList.add('calendar__ceil_gray');
				} else{
					if(countDays <= lastDate){
						td.innerHTML = countDays;
						
						countDays++;
						if(j === 1){
							let schedule = document.createElement('img');
							schedule.setAttribute('src','i/calenadr-icon-schedule.png');
							schedule.setAttribute('title','schedule');
							td.appendChild(schedule);
						}else if(j === 2 || j === 5){
							let car = document.createElement('img');
							car.setAttribute('src','i/calenadr-icon-car.png');
							car.setAttribute('title','car');
							td.appendChild(car);
						}
					}
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		placeCalendar.appendChild(table);
	}

	getInfoDate(place){
		event.preventDefault();
		let listMonth = document.getElementById('js-calendar__list-month');
		let listYear = place.getElementsByClassName('js-calendar__years');
		let month, year;

		for (let i = 0; i < listMonth.options.length; i++) {
		  let option = listMonth.options[i];
		  if(option.selected) {
		   month = option.value;
		  }
		}

		for (let i = 0; i < listYear.length; i++) {
		  if(listYear[i].checked) {
		   year = listYear[i].value;
		  }
		}

		let objDateInfo = {
			'year': year,
			'month': month
		};
		let table = document.getElementById('js-calendar__table-month');
		
		table.parentNode.removeChild(table);
		this.createMonth(this._placeCalendar,objDateInfo['year'],objDateInfo['month']);
	}

	createYears(place){
		let listLabel = place.getElementsByClassName('js-calendar__label-year');
		let listInput = place.getElementsByClassName('js-calendar__years');

		let date = new Date();
		let year = date.getFullYear();
		for(let i = 0, j = -1; i < 3; i++, j++){
			listLabel[i].appendChild(document.createTextNode(year+j));
			listInput[i].value = year+j;
		}

		//define the month and highlight it in the list
		let listMonth = document.getElementById('js-calendar__list-month');
		let month = date.getMonth();
		for(let i = 0; i < listMonth.children.length; i++){
			if(listMonth.children[i].value == month){
				listMonth.children[i].selected = true;
			}
		}
	}
}
