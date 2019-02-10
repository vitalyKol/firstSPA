//= libs.js
//= DragAvatar.js
//= DragZone.js
//= DropTarget.js
//= DragManager.js
//= Workers.js
//= CellPositions.js
//= Calendar.js
//= Schedule.js

document.onselectstart = function(){return false;};

let sectionStaff = document.getElementById('js-staff-ol');
let buttonStaff = document.getElementById('js-staff-but');
new Workers(sectionStaff,buttonStaff);

let list = document.getElementsByClassName('js-drag-list')[0];
 new DragZone(list);
 new DropTarget(list);

let placeCalendar = document.getElementById('js-calendar__calendar-table');
let monthTitle = document.getElementById('js-calendar__month-title');
let buttonMonthTitle = document.getElementById('js-calendar__submit-title');
let calendar = new Calendar(placeCalendar, monthTitle, buttonMonthTitle);


let buttonSchedule = document.getElementById('js-calendar__create_schedule');
buttonSchedule.addEventListener('click', createTables);


function resizeLeftSection(){
	let sectionStaff = document.getElementById('js-staff');
	sectionStaff.style.height = 41 + 'vw';
}
resizeLeftSection();
document.body.onresize = resizeLeftSection;

//localStorage.clear();
