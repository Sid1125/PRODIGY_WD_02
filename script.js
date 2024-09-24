const darkModeSwitch = document.getElementById('dark-mode-switch');

// Toggle dark mode based on checkbox status
darkModeSwitch.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Stopwatch Variables
let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false, lapCounter = 0;

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

// Function to start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 10); // Update the time every 10 milliseconds
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
}

// Function to pause the stopwatch
function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        lapButton.disabled = true;
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    lapCounter = 0;
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    minutesElement.innerText = "00";
    secondsElement.innerText = "00";
    millisecondsElement.innerText = "00";
    lapsList.innerHTML = ""; // Clear lap times
}

// Function to update the time display
function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    
    const minutes = Math.floor(updatedTime / (60 * 1000));
    const seconds = Math.floor((updatedTime % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);

    minutesElement.innerText = pad(minutes);
    secondsElement.innerText = pad(seconds);
    millisecondsElement.innerText = pad(milliseconds);
}

// Helper function to add leading zeros to numbers
function pad(number) {
    return number < 10 ? "0" + number : number;
}

// Function to record a lap
function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = `${pad(minutesElement.innerText)}:${pad(secondsElement.innerText)}:${pad(millisecondsElement.innerText)}`;
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

// Event listeners for button functionality
startButton.addEventListener("click", startStopwatch);
pauseButton.addEventListener("click", pauseStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
