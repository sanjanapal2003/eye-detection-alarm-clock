document.addEventListener("DOMContentLoaded", function(){

const startScreen = document.getElementById("startScreen");
const intro = document.getElementById("intro");
const text = document.getElementById("introText");
const app = document.getElementById("app");



document.addEventListener("click", function (e) {

    if (e.target.id === "alarmBtn") {
        document.getElementById("alarmSection").style.display = "block";
        document.getElementById("timerSection").style.display = "none";
    }

    if (e.target.id === "timerBtn") {
        document.getElementById("timerSection").style.display = "block";
        document.getElementById("alarmSection").style.display = "none";
    }

});



startScreen.addEventListener("click", async () => {
    
     // hide start screen
    startScreen.style.display = "none";
    //show intro section
    intro.style.display = "flex";



    await speakAndShow("Hi, Good Morning");
    await speakAndShow("I am MindBell");
    await speakAndShow("I keep you productive");
    await speakAndShow("harrrrrrrrrruuuuuuuuuuu")
    
    
    // hide intro
    intro.style.display = "none";
     // show main app
    
    app.style.display = "flex";
   
    const topMenu = document.getElementById("topMenu");
    topMenu.style.display = "flex";

});


function speakAndShow(message){
    return new Promise((resolve) => {

        text.innerText = message;

        const speech = new SpeechSynthesisUtterance(message);

        speech.rate = 1;     // speed
        speech.pitch = 1;    // voice tone
        speech.volume = 1;

        speech.onend = function(){
            resolve();
        }; 

        window.speechSynthesis.speak(speech);
    });
}
});

function setAlarm() {
    const alarmTime = document.getElementById("alarmTime").value;

    if (!alarmTime) {
        alert("Please select time");
        return;
    }

    alert("Alarm set for " + alarmTime);
}

function startTimer() {
    const minutes = document.getElementById("timerMinutes").value;

    if (!minutes) {
        alert("Enter minutes");
        return;
    }

    alert("Timer started for " + minutes + " minutes");
}
