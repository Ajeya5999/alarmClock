// Alarm Variables

const alarmTimes = [];
const alarmsContainer = document.getElementById('alarms-container');
let alarmId = 0;

// Alarm Function

function ringChecker() {
    const date = new Date(), hours = date.getHours(), minutes = date.getMinutes();
    let hoursString = (hours < 10) ? "0" + hours : hours, minutesString = (minutes < 10) ? "0" + minutes : minutes;
    let currTime = `${hoursString}:${minutesString}`;
    let time = alarmTimes.find((timeObject) => timeObject.time === currTime);
    let day = (time != undefined) ? time.days.find((currDay) => date.getDay() == currDay) : false; 
    if(time && !(time.hasrung) && day) {
        let sound = new Audio(`./assets/sounds/${time.sound}?raw=true`);
        sound.loop = true;
        sound.play();
        alert("Alarm is ringing");
        sound.pause();
        time.hasrung = true;
    }
}

setInterval(ringChecker, 1000);

// Getting the Alarm Time

const alarmTime = document.getElementById("time");
const days = document.getElementsByClassName("day");
const alarmSound = document.getElementById('alarm-sounds');
const setAlarm = document.getElementById("set-alarm");

// Adding the alarm time

    //Converting 24 hour time to 12 hour time

function time24to12 (timeString24) {
    let hours = timeString24.substring(0, timeString24.indexOf(":"));
    let meridian = (hours >= 12) ? "pm" : "am" ;
    if(hours > 12) hours -= 12;
    return `${hours}:${timeString24.substring(timeString24.indexOf(":") + 1, timeString24.length)} ${meridian}`;
}

    //Converting Day Number to Day Name

function dayNumberToName (selectedDays) {
    let dayTable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let days = [];
    for(let iterator = 0; iterator < selectedDays.length; iterator++) days.push(dayTable[selectedDays[iterator]]);
    return days;
}

    //Alarm addition function

function addToAlarmList(alarmTime, selectedDays) {

    //Alarm Container Div

    let alarmContainer = document.createElement("div");
    alarmContainer.setAttribute('class', 'alarm-container');
    alarmContainer.setAttribute('id', alarmId);

    //Converting Data to meaningful units

    let time = time24to12(alarmTime.value);
    let days = dayNumberToName(selectedDays);

    //Alarm time container

    let alarmContainerTime = document.createElement("span");
    alarmContainerTime.setAttribute('class', 'alarm-container-time');

    //Alarm days container

    let alarmContainerDays = document.createElement("div");
    alarmContainerDays.setAttribute('class', 'alarm-container-days');

    //Alarm Delete button

    let alarmContainerButton = document.createElement("button");
    alarmContainerButton.setAttribute('class', 'alarm-container-button');
    alarmContainerButton.addEventListener('click', deleteAlarm);

    //Adding all the elements to the main "Alarm-Container"

    alarmContainerTime.innerText = time;
    alarmContainerDays.innerText = days;
    alarmContainerButton.innerText = "Delete";
    alarmContainer.append(alarmContainerTime, alarmContainerDays, alarmContainerButton);
    alarmsContainer.append(alarmContainer);
}

    //Event listener to add alarm

setAlarm.addEventListener('click', function(event) {
    event.preventDefault();
    let selectedDays = [];
    for(let iterator = 0; iterator < days.length; iterator++) {
        if(days[iterator].checked) selectedDays.push(days[iterator].value);
    }
    alarmTimes.push({
        time: alarmTime.value,
        hasrung: false,
        days: selectedDays,
        sound: alarmSound.value,
        alarmId: alarmId
    });
    addToAlarmList(alarmTime, selectedDays);
});

// Alarm Deletion Function

function deleteAlarm() {
    let index = alarmTimes.findIndex(timeObject => timeObject.alarmId == this.parentNode.id);
    alarmTimes.splice(index, 1);
    let alarmDiv = document.getElementById(this.parentNode.id);
    alarmDiv.remove();
}