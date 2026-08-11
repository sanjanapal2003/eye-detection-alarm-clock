

document.getElementById("startTimer").addEventListener("click", function () {

    let minutes = document.getElementById("minutes").value;

    if (!minutes) {
        alert("Enter minutes");
        return;
    }

    let totalSeconds = minutes * 60;

    // 🔹 Show first value immediately
    updateDisplay(totalSeconds);

    let interval = setInterval(function () {

        totalSeconds--;

        updateDisplay(totalSeconds);

        if (totalSeconds <= 0) {
            clearInterval(interval);
            alarmSound.currentTime=0; 
            alarmSound.loop=true 
            alarmSound.play(); 
            //document.getElementById("alarmSound").play();
            alert("Time's up!");
        }

    }, 1000);

});


function updateDisplay(totalSeconds) {

    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;

    document.getElementById("display").innerText =
        mins.toString().padStart(2, '0') + ":" +
        secs.toString().padStart(2, '0');
}