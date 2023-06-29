// Alarm Variables

const alarmTimes = [];

// Alarm Function

setInterval(() => {
    const date = new Date(), hours = date.getHours(), minutes = date.getMinutes();
    let hoursString = (hours < 10) ? "0" + hours : hours, minutesString = (minutes < 10) ? "0" + minutes : minutes;
    let currTime = `${hoursString}:${minutesString}`;
    let time = alarmTimes.find((timeObject) => {return timeObject.time === currTime});
    if(time && !(time.hasrung)) {
        alert("Alarm is ringing");
        time.hasrung = true;
    }
}, 1000);

// Getting the Alarm Time

const alarmTime = document.getElementById("time");
const setAlarm = document.getElementById("set-alarm");

// Adding the alarm time

setAlarm.addEventListener('click', function(event) {
    event.preventDefault();
    alarmTimes.push({
        time: alarmTime.value,
        hasrung: false
    });
    alert("alarm is set");
});