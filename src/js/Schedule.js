let infoObjWorkers = {};
let infoObjMonth = {};

function getInfoWorkers(){ //gets a list of employees and their positions
	let listWorkers = document.getElementById('js-staff-ol');
    let elems = listWorkers.children;
	for(let i = 0; i < elems.length; i++){
		infoObjWorkers[''+(i+1)] = {
			'id': elems[i].dataset.idKey,
			'name': elems[i].firstElementChild.textContent
		}
		let j = 1;
		//the collection of all items in the tag span
		while(elems[i].children[j].tagName == 'SPAN'){
			infoObjWorkers[''+(i+1)][elems[i].children[j].textContent] = elems[i].children[j].textContent;
			j++; 
		}
 	}
 	console.log(infoObjWorkers);
}

function getInfoMonth(){ //get a list of all dates and events in the month
	let listMonth = document.getElementById('js-calendar__table-month');
	let trs = listMonth.children;
	for(let i = 1; i < trs.length; i++){
		let tds = trs[i].children;
		for(let j = 0; j < tds.length; j++){
			infoObjMonth[''+i+j] = {
				'date' : tds[j].firstChild.textContent
			}
			//the collection of all events via the title attribute
			let elems = tds[j].children;
			if(elems !== undefined){
				for(let k = 0; k < elems.length; k++){
					infoObjMonth[''+i+j][elems[k].getAttribute('title')] = elems[k].getAttribute('title');
				}
			}
		}
 	}
 	console.log(infoObjMonth);
}

function createScheduleObj(){
	//create an object with work days
	//clear global objects
	infoObjWorkers = {};
    infoObjMonth = {};
	getInfoWorkers();
    getInfoMonth();
	let arrWorker = [];//array of workers
	let arrWorkerOff = [];//spare array for comparison
	let scheduleObj = {};

	//add workers to arrays
	for(let worker in infoObjWorkers){
		arrWorker.push([worker, infoObjWorkers[worker]['name']]);
		arrWorkerOff.push([worker, infoObjWorkers[worker]['name']]);
	}

	//assign working days
	for(let day in infoObjMonth){
		let offWorkers = [];//output array
		let middleWorkers = [];//array average working days
		if(infoObjMonth[day]['date'] == 'x'){//days not in month
			scheduleObj[day] = ('x');				
		}
		if(infoObjMonth[day]['date'] != 'x'){
			//adding medium shifts to the machine
			if('car' in infoObjMonth[day]){
				for(let worker in infoObjWorkers){
					if('Мшн.' in infoObjWorkers[worker]){
						middleWorkers.push([worker, infoObjWorkers[worker]['name']]);
					}
				}
			}
			//adding average shifts to the schedule
			if('schedule' in infoObjMonth[day]){
				for(let worker in infoObjWorkers){
					if('Рсп.' in infoObjWorkers[worker]){
						middleWorkers.push([worker, infoObjWorkers[worker]['name']]);
					}
				}
			}
			//the addition of output
			for(let i = 1; i < 9; i++){
				if((i+'') in infoObjMonth[day]){
					offWorkers.push(arrWorkerOff[i-1]);
				}
			}

			//appointment of morning and evening shift
			let i = 0;
			let workDay = [];
			let sum = 0;
			while(sum < 2){
                let flag = true;
                //skip the average weekend
                offWorkers.forEach((e)=>{
                	if(e[0] === arrWorker[i][0]) flag = false;
                });
                //skip the average
                middleWorkers.forEach((e)=>{
                	if(e[0] === arrWorker[i][0]) flag = false;
                });
                //skip already added
                workDay.forEach((e)=>{
                	if(e === arrWorker[i][1]) flag = false;
                });
                if(flag){
                	workDay.push(arrWorker[i][1]);
					let worker = arrWorker.splice(i,1);
					arrWorker.push(worker[0]);
					sum++;
                }else{
                	if(i>8){ //allow adding people with average shifts
                		if(middleWorkers.length){
	                		let worker = middleWorkers.pop();
	                		workDay.unshifht(worker[i][1]);
	                		sum++;
                		}else{
                			workDay.push('Пусто');
                			sum++;
                		}
                	}else{
                		i++;
                	}
                }
				
			}
			//add middle shifts as additional
			if(middleWorkers.length){
				middleWorkers.forEach((e)=>{
					workDay.push(e[1]);
				});
			}
			//record working day
			scheduleObj[day] = workDay;
		}
	}
	return scheduleObj;
}

function createTables(){
	//delete table if exists
	let elem = document.getElementById('js-table-result');
	if(elem){
		elem.parentNode.removeChild(elem);
	}

	
	//create table
	let scheduleObj = createScheduleObj();
	let table = document.createElement('table');
	table.setAttribute('id','js-table-result');
	table.classList.add('table-result');
	let maxWeek = Math.floor(Object.keys(scheduleObj).length/7);
	let maxWorkers = Math.floor(Object.keys(infoObjWorkers).length);
	console.log(maxWeek);
	for(let i = 1; i <= maxWeek; i++){
		let trHead = document.createElement('tr');
		trHead.innerHTML = '<th colspan="8">Неделя: '+i+'</th>';
		trHead.classList.add('table-result__trHead');
		//adds dates
		let trTitle = document.createElement('tr');
		trTitle.innerHTML = '<th>ФИО</th><th>Понедельник: '+ infoObjMonth[''+i+0]['date'] 
								  +'</th><th>Вторник: '+ infoObjMonth[''+i+1]['date'] 
								  +'</th><th>Среда: '+ infoObjMonth[''+i+2]['date'] 
								  +'</th><th>Четверг: '+ infoObjMonth[''+i+3]['date'] 
								  +'</th><th>Пятница: '+ infoObjMonth[''+i+4]['date'] 
								  +'</th><th>Суббота: '+ infoObjMonth[''+i+5]['date'] 
								  +'</th><th>Воскресение: '+ infoObjMonth[''+i+6]['date'] +'</th>';
		
		table.appendChild(trHead);
		table.appendChild(trTitle);

		for(let j = 1; j <= maxWorkers; j++){
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.textContent = infoObjWorkers[j]['name'];
			tr.appendChild(td);
			for(let k = 0; k < 7; k++){
				let td = document.createElement('td');
				
				//determines which shift or gives the output
				if(scheduleObj[''+i+k] == 'x') td.textContent = scheduleObj[''+i+k];
				else if(Array.isArray(scheduleObj[''+i+k])){
					let flag = true;
					for(let g = 0; g < scheduleObj[''+i+k].length; g++){
						if(scheduleObj[''+i+k][g] == infoObjWorkers[j]['name']){
							if(g == 0) td.textContent = 'Утро';
							else if(g == 1) td.textContent = 'Вечер';
							else if(g >= 2) td.textContent = 'Средняя';
							flag = false;
						}
					}
					if(flag) td.textContent = 'Выходной';

				}

				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}
	console.log(scheduleObj);
	document.body.appendChild(table);
}
