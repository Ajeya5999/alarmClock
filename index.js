// Alarm Variables

const alarmTimes = [];

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
    alert("alarm is set");
});