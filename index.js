// Alarm Variables

const alarmTimes = [];
const alarmsContainer = document.getElementById('alarms-container');

// Alarm Function

function ringChecker() {
    const date = new Date(), hours = date.getHours(), minutes = date.getMinutes();
    let hoursString = (hours < 10) ? "0" + hours : hours, minutesString = (minutes < 10) ? "0" + minutes : minutes;
    let currTime = `${hoursString}:${minutesString}`;
    let time = alarmTimes.find((timeObject) => timeObject.time === currTime);
    let day = (time != undefined) ? time.days.find((currDay) => date.getDay() == currDay) : false; 
    if(time && !(time.hasrung) && day) {
        alert("Alarm is ringing");
        time.hasrung = true;
    }
}

setInterval(ringChecker, 1000);

// Getting the Alarm Time

const alarmTime = document.getElementById("time");
const days = document.getElementsByClassName("day");
const setAlarm = document.getElementById("set-alarm");

// Adding the alarm time

function time24to12 (timeString24) {
    let hours = timeString24.substring(0, timeString24.indexOf(":"));
    let meridian = (hours >= 12) ? "pm" : "am" ;
    if(hours > 12) hours -= 12;
    return `${hours}:${timeString24.substring(timeString24.indexOf(":") + 1, timeString24.length)} ${meridian}`;
}

function dayNumberToName (selectedDays) {
    let dayTable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let days = [];
    for(let iterator = 0; iterator < selectedDays.length; iterator++) days.push(dayTable[selectedDays[iterator]]);
    return days;
}

function addToAlarmList(alarmTime, selectedDays) {
    let alarmContainer = document.createElement("div");
    alarmContainer.setAttribute('class', 'alarm-container');
    let time = time24to12(alarmTime.value);
    let days = dayNumberToName(selectedDays);
    let alarmContainerTime = document.createElement("span");
    alarmContainerTime.setAttribute('class', 'alarm-container-time');
    let alarmContainerDays = document.createElement("div");
    alarmContainerDays.setAttribute('class', 'alarm-container-days');
    alarmContainerTime.innerText = time;
    alarmContainerDays.innerText = days;
    alarmContainer.append(alarmContainerTime, alarmContainerDays);
    alarmsContainer.append(alarmContainer);
}

setAlarm.addEventListener('click', function(event) {
    event.preventDefault();
    let selectedDays = [];
    for(let iterator = 0; iterator < days.length; iterator++) {
        if(days[iterator].checked) selectedDays.push(days[iterator].value);
    }
    alarmTimes.push({
        time: alarmTime.value,
        hasrung: false,
        days: selectedDays
    });
    addToAlarmList(alarmTime, selectedDays);
});