const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const pomodoroEl = document.getElementById("pomodoro");
const shortBreakEl = document.getElementById("short-break");
const longBreakEl = document.getElementById("long-break");

let interval
let timeLeft = 1500; //25 minutes (Pomodoro)
let currentMode = "pomodoro";

pomodoroEl.disabled = true;

function updateTimer(){
    //converting to mintues and seconds
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    //formatting
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; 
    // this is done to show 01:00 appearance, if not it would be 1:3 only when 1 minute 3 seconds is left in the timer

    timerEl.innerHTML = formattedTime
}

function startTimer(){
    interval = setInterval(() => {
        timeLeft--; //decrease by 1s
        updateTimer(); // updating timer each second
        if (timeLeft === 0){
            clearInterval(interval); //to make it stop at 00:00
            alert("Time's up!");
            timeLeft = 1500; //to reset it to 25 mins
        }
    }, 1000) // tigger this functino every 1000ms i.e. 1s
    startEl.disabled = true;
    stopEl.disabled = false;
}

function stopTimer(){
    clearInterval(interval);
    stopEl.disabled = true;
    startEl.disabled = false;
}

function resetTimer(){
    clearInterval(interval);

    if (currentMode === "pomodoro") {
        timeLeft = 1500; // 25 minutes for Pomodoro
    } else if (currentMode === "short-break") {
        timeLeft = 300; // 5 minutes for Short Break
    } else if (currentMode === "long-break") {
        timeLeft = 900; // 15 minutes for Long Break
    }

    updateTimer();
    stopEl.disabled = true;
    startEl.disabled = false;
}

function pomodoro(){
    timeLeft = 1500;
    currentMode = "pomodoro";
    updateTimer();
    pomodoroEl.disabled = true;
    shortBreakEl.disabled = false;
    longBreakEl.disabled = false;
}

function shortBreak(){
    timeLeft = 300;
    currentMode = "short-break";
    updateTimer();
    pomodoroEl.disabled = false;
    shortBreakEl.disabled = true;
    longBreakEl.disabled = false;
}

function longBreak(){
    timeLeft = 900;
    currentMode = "long-break";
    updateTimer();
    pomodoroEl.disabled = false;
    shortBreakEl.disabled = false;
    longBreakEl.disabled = true;
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
pomodoroEl.addEventListener("click", pomodoro);
shortBreakEl.addEventListener("click", shortBreak);
longBreakEl.addEventListener("click", longBreak);