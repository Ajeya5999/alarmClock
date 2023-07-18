// 24 hours to 12 hours

function time24to12two(hours, minutes, seconds) {
    let meridian = (hours < 12) ? "am ": "pm";
    hours = (hours > 12) ? hours - 12 : hours;
    let hoursString = (hours < 10) ? "0" + hours : hours, minutesString = (minutes < 10) ? "0" + minutes : minutes, secondsString = (seconds < 10) ? "0" + seconds : seconds;
    return `${hoursString}:${minutesString}:${secondsString} ${meridian}`;
}

// IIFE 

((() => {
    const date = new Date(), hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
    const hoursString = (hours < 10) ? "0" + hours : hours, minutesString = (minutes < 10) ? "0" + minutes : minutes, secondsString = (seconds < 10) ? "0" + seconds : seconds;
    const alarmTimeDiv = document.getElementById('alarm-time');
    alarmTimeDiv.innerText = time24to12two(hours, minutes, seconds);
}))();

// Alarm Variables

const alarmTimes = [];
const alarmsContainer = document.getElementById('alarms-container');
let alarmId = 0;

// Alarm Function

    // Alarm Ring Checker

function ringChecker(currTime, date) {
    let time = alarmTimes.find((timeObject) => timeObject.time === currTime);
    let day = (time != undefined) ? time.days.find((currDay) => date.getDay() == currDay) : false; 
    if(time && !(time.hasrung) && day) {
        let sound = new Audio(`./assets/sounds/${time.sound}`);
        sound.loop = true;
        sound.play();
        alert("Alarm is ringing");
        sound.pause();
        time.hasrung = true;
    }
}

function updateTimer() {
    const date = new Date(), hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
    let hoursString = (hours < 10) ? "0" + hours : hours, minutesString = (minutes < 10) ? "0" + minutes : minutes, secondsString = (seconds < 10) ? "0" + seconds : seconds;
    const alarmTimeDiv = document.getElementById('alarm-time');
    alarmTimeDiv.innerText = time24to12two(hours, minutes, seconds);
    if(seconds === 0) ringChecker(`${hoursString}:${minutesString}`, date);
}

setInterval(updateTimer, 1000);

// Getting the Alarm Time

const alarmTime = document.getElementById("time");
const days = document.getElementsByClassName("day");
const alarmSound = document.getElementById('alarm-sounds');
const setAlarm = document.getElementById("set-alarm");

// Adding the alarm time

    //Converting 24 hour time to 12 hour time

function time24to12one (timeString24) {
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

function addToAlarmList(alarmTime, selectedDays, alarmSoundName) {

    //Alarm Container Div

    let alarmContainer = document.createElement("div");
    alarmContainer.setAttribute('class', 'alarm-container');
    alarmContainer.setAttribute('id', alarmId);

    //Converting Data to meaningful units

    let time = time24to12one(alarmTime.value);
    let days = dayNumberToName(selectedDays);

    //Alarm time container

    let alarmContainerTime = document.createElement("span");
    alarmContainerTime.setAttribute('class', 'alarm-container-time');

    //Alarm days container

    let alarmContainerDays = document.createElement("div");
    alarmContainerDays.setAttribute('class', 'alarm-container-days');

    //Alarm Sound Name

    let alarmSoundNameContainer = document.createElement("div");
    alarmSoundNameContainer.setAttribute('class', 'alarm-sound-name');

    //Alarm Delete button

    let alarmContainerButton = document.createElement("button");
    alarmContainerButton.setAttribute('class', 'alarm-container-button');
    alarmContainerButton.addEventListener('click', deleteAlarm);

    //Adding all the elements to the main "Alarm-Container"

    alarmContainerTime.innerText = time;
    alarmContainerDays.innerText = days;
    alarmSoundNameContainer.innerText = `Alarm Sound:- ${alarmSoundName}`;
    alarmContainerButton.innerText = "Delete";
    alarmContainer.append(alarmContainerTime, alarmContainerDays, alarmSoundNameContainer, alarmContainerButton);
    alarmsContainer.append(alarmContainer);
}

    //Event listener to add alarm

setAlarm.addEventListener('click', function(event) {
    event.preventDefault();
    let selectedDays = [];
    for(let iterator = 0; iterator < days.length; iterator++) {
        if(days[iterator].checked) selectedDays.push(days[iterator].value);
    }
    if(alarmTime.value === "") {
        alert("Please enter a proper time");
    }
    else if(selectedDays.length === 0) {
        alert("Please select atleast one day to set the alarm");
    }
    else {
        alarmTimes.push({
            time: alarmTime.value,
            hasrung: false,
            days: selectedDays,
            sound: alarmSound.value,
            alarmId: alarmId
        });
        addToAlarmList(alarmTime, selectedDays, alarmSound.options[alarmSound.selectedIndex].text);
    }
});

// Alarm Deletion Function

function deleteAlarm() {
    let index = alarmTimes.findIndex(timeObject => timeObject.alarmId == this.parentNode.id);
    alarmTimes.splice(index, 1);
    let alarmDiv = document.getElementById(this.parentNode.id);
    alarmDiv.remove();
}