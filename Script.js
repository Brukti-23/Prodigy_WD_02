let startStopButton = document.getElementById('startStop');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let display = document.getElementById('display');
let laps = document.getElementById('laps');

let interval;
let timerRunning = false;
let startTime = 0;
let elapsedTime = 0;

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
    if (!timerRunning) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        startStopButton.textContent = 'Stop';
        timerRunning = true;
    } else {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        timerRunning = false;
    }
}

function reset() {
    clearInterval(interval);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    timerRunning = false;
    laps.innerHTML = '';
}

function addLap() {
    let lapTime = formatTime(elapsedTime);
    let li = document.createElement('li');
    li.textContent = lapTime;
    laps.appendChild(li);
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', addLap);
