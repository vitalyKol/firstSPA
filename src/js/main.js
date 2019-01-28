//= libs.js
//= DragAvatar.js
//= DragZone.js
//= DropTarget.js
//= DragManager.js
//= Workers.js

//= Calendar.js
//= Positions.js

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


//localStorage.clear();
