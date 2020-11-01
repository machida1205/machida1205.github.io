var body = document.getElementById('body');


window.onload = function() {
  var current = new Date();
  var year = current.getFullYear();
  var month = current.getMonth() + 1; //getMonthで取得した値は0から始まる

  var wrapper = document.getElementById('calendar');
  add_calendar(wrapper, year, month);
  body.className = 'month-' + month;
}

function add_calendar(wrapper, year, month) {
  wrapper.textContent = null;

  var headData = generate_calendar_header(wrapper, year, month);
  var bodyData = generate_month_calendar(year, month);

  wrapper.appendChild(headData);
  wrapper.appendChild(bodyData);
}


function generate_calendar_header(wrapper, year, month) {
  var nextMonth = new Date(year, (month - 1));
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  var prevMonth = new Date(year, (month - 1));
  prevMonth.setMonth(prevMonth.getMonth() - 1);

  var cHeader = document.createElement('div');
  cHeader.className = 'calendar-header js-fadein';

  var cPrev = document.createElement('a');
  cPrev.className = 'calendar-header__prev';
  var cPrevText = document.createTextNode('prev');
  cPrev.appendChild(cPrevText);
  cPrev.addEventListener('click', function() {
    add_calendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
    body.className = '';
    body.className = 'month-' + (prevMonth.getMonth() + 1);
  }, false);
  cHeader.appendChild(cPrev);

  var cTitle = document.createElement('div');
  cTitle.className = 'calendar-header__title';
  var cTitleText = document.createTextNode(year + '年' + month + '月');
  cTitle.appendChild(cTitleText);
  cHeader.appendChild(cTitle);

  var cNext = document.createElement('a');
  cNext.className = 'calendar-header__next';
  var cNextText = document.createTextNode('next');
  cNext.appendChild(cNextText);
  cNext.addEventListener('click', function() {
    add_calendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
    body.className = '';
    body.className = 'month-' + (nextMonth.getMonth() + 1);
  }, false);
  cHeader.appendChild(cNext);

  return cHeader;
}


function generate_month_calendar(year, month) {
  var weekdayData = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'];
  var calendarData = get_month_calendar(year, month);

  var i = calendarData[0]['weekday'];
  while (i > 0) {
    i--;
    calendarData.unshift({
      day: '',
      weekday: i
    });
  }

  var i = calendarData[calendarData.length - 1]['weekday'];
  while (i < 6) {
    i++;
    calendarData.push({
      day: '',
      weekday: i
    });
  }

  var cTable = document.createElement('table');
  cTable.className = 'calendar-table js-fadein';

  var insertData = '';
  insertData += '<thead>';
  insertData += '<tr>';
  for (var i = 0; i < weekdayData.length; i++) {
    insertData += '<th>';
    insertData += weekdayData[i];
    insertData += '</th>';
  }
  insertData += '</tr>';
  insertData += '</thead>';

  insertData += '<tbody>';
  for (var i = 0; i < calendarData.length; i++) {
    if (calendarData[i]['weekday'] <= 0) {
      insertData += '<tr>';
    }
    insertData += '<td>';
    insertData += calendarData[i]['day'];
    insertData += '</td>';
    if (calendarData[i]['weekday'] >= 6) {
      insertData += '</tr>';
    }
  }
  insertData += '</tbody>';

  cTable.innerHTML = insertData; //element.innerHTMLで、element内のHTMLを書き換え
  return cTable;
}

/*
* 指定した年月のカレンダー情報を返す
* @param {number} year - 年の指定
* @param {number} month - 月の指定
*/

function get_month_calendar(year, month) {
  var firstDate = new Date(year, (month - 1), 1); //月の初日を取得。月は0～11で指定する
  var lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate(); //月の最終日は「翌月の0日目」で取得できる
  var weekday = firstDate.getDay(); //.getDayで曜日を取得

  var calendarData = []; //配列リテラルで空の変数を先に作成しておく
  var weekdayCount = weekday;
  for (var i = 0; i < lastDay; i++) { //月の最終日まで繰り返したら終了する
    calendarData[i] = { //連想配列を生成
      day: i + 1, //月の初日。0から始まるのでプラス1する
      weekday: weekdayCount //月の初日の曜日
    }
    if (weekdayCount >= 6) { //0=日曜日で、12345...と続いて6が土曜日になる。土曜になったら日曜日（=0）に戻す
      weekdayCount = 0;
    } else {
      weekdayCount++; //初日の曜日を起点にして1ずつ増えていく
    }
  };
  return calendarData; //関数get_month_calendarの処理結果を返す
}
