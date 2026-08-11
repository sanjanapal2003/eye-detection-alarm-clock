import { startAI } from "./ai.js";

//console.log("JS Connected");
document.addEventListener("DOMContentLoaded", function () {
let alarms = [];

 let currentAlarm = null;
let alarmSound = document.getElementById("alarmSound");

window.stopAlarm = async function () {

    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmSound.loop = false;

    stopBtn.style.display = "none";

    alarmplayed = false;

    if (currentAlarm) {

        await fetch("/api/alarm/" + currentAlarm._id, {
            method: "PUT"
        });

       
const index = alarms.indexOf(currentAlarm);
if (index !== -1) {
    alarms.splice(index, 1);
}

        await loadAlarms();

    }

    document.getElementById("cameraContainer").style.display = "none";

    console.log("Alarm Stopped by AI");

};

async function loadAlarms() {

    const response = await fetch("/api/alarm");
    const data = await response.json();

    alarms = data;
}
loadAlarms()

document.getElementById("addAlarmBtn").addEventListener("click", function () {

    let container = document.getElementById("alarmList");

    let input = document.createElement("input");
    input.type = "time";

    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";

    saveBtn.onclick =async function () {
        const response=await fetch("/api/alarm",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({time:input.value})
        })
    
    const data=await response.json();
    await loadAlarms();
    console.log(data);
    alert("alarm saved");
    };
    container.appendChild(input);
    container.appendChild(saveBtn);
    container.appendChild(document.createElement("br"));
});

let alarmplayed=false
setInterval(function () {

    let now = new Date();
    let currentTime =
        now.getHours().toString().padStart(2, '0') +
        ":" +
        now.getMinutes().toString().padStart(2, '0');
       

    alarms.forEach(function (alarm) {
        if (alarm.time === currentTime && !alarmplayed) {
            //document.getElementById("alarmSound").play();
             alarmSound.currentTime=0;  // reset sound
             alarmSound.loop=true  
             alarmSound.play(); //play sound
             //document.getElementById("stopAlarm").style.display = "block";
          

             stopBtn.style.display = "block";
             currentAlarm = alarm;
             alarmplayed=true
        }


    });

}, 1000);

const stopBtn = document.getElementById("stopAlarm");

stopBtn.addEventListener("click", async function () {

    document.getElementById("cameraContainer").style.display = "block";
     await startAI();
});

});
