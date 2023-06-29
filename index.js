// Getting the Alarm Time

const alarmTime = document.getElementById("time");
const setAlarm = document.getElementById("set-alarm");
let date = new Date();
let hasrung = false;

// Storage to set alarm times

const alarmTimes = [];

// Adding the alarm time

setAlarm.addEventListener('click', function(event) {
    event.preventDefault();
    alarmTimes.push({
        time: alarmTime.value
    });
    alert("alarm is set");
});

//Ringing the Alarm 

setInterval(function() {
    date = new Date();
    let hours = date.getHours(), minutes = date.getMinutes();
    if(hours < 10) hours = "0" + hours;
    if(minutes < 10) minutes = "0" + minutes;
    if(date.getSeconds === 0) hasrung = false;
    let currTime = `${hours}:${minutes}`;
    let time = alarmTimes.find(function(timeObj) {
        return timeObj.time === currTime;
    })
    if(time && !(hasrung)) {
        alert("Alarm is ringing");
        hasrung = true;
    }
}, 1000);