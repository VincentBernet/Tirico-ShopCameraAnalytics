function addDays(date, days) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}

function set_BoxDateBefore(A_yyyy, A_mm, A_dd) {
    var dateControl = document.getElementById('start');
    dateControl.value = A_yyyy + '-' + A_mm + '-' + A_dd;
}

function set_BoxDateNow(yyyy, mm, dd) {
    var dateControl = document.getElementById('end');
    dateControl.value = yyyy + '-' + mm + '-' + dd;
}



var Now;            // La date d'aujourd'hui
var DateBefore;     // La date jusqu'a ce que l'on veut
var Req_Now;        // String de la date now
var Req_Before;     // String de la date d'avant

function SetNow() {
    Now = new Date(2020,10,15);
    var dd = String(Now.getDate()).padStart(2, '0');
    var mm = String (Now.getMonth() + 1).padStart(2, '0');
    var yyyy = String (Now.getFullYear());

    Req_Now = yyyy + '-' + mm + '-' + dd + ' ' + Now.getHours() + ':' + Now.getMinutes() + ':' + Now.getSeconds();
    set_BoxDateNow(yyyy, mm, dd);
}

function SetBefore(value) {
    DateBefore = Now;
    DateBefore = addDays(DateBefore, value);
    
    var A_dd = String(DateBefore.getDate()).padStart(2, '0');
    var A_mm = String(DateBefore.getMonth() + 1).padStart(2, '0');
    var A_yyyy = String(DateBefore.getFullYear());

    Req_Before = A_yyyy + '-' + A_mm + '-' + A_dd + ' ' + DateBefore.getHours() + ':' + DateBefore.getMinutes() + ':' + DateBefore.getSeconds();
    set_BoxDateBefore(A_yyyy, A_mm, A_dd);
}