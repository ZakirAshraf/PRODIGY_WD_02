let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;
let timer;

function startStop() {
    if (isRunning) {
        // Pause the stopwatch
        isRunning = false;
        document.getElementById("startStop").textContent = "Start";
        clearInterval(timer);
    } else {
        // Start or resume the stopwatch
        isRunning = true;
        document.getElementById("startStop").textContent = "Pause";
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 100);
    }
}

function reset() {
    // Reset the stopwatch
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    clearInterval(timer);
    elapsedTime = 0;
    lapCounter = 1;

    // Update display to show "00:00:00"
    document.getElementById("display").textContent = "00:00:00";

    // Clear the laps
    document.getElementById("laps").innerHTML = "";
}


function recordLap() {
    // Record lap time
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${formattedLapTime}`;
        document.getElementById("laps").appendChild(lapItem);
        lapCounter++;
    }
}

function updateDisplay() {
    // Update the stopwatch display
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(milliseconds) {
    // Format time in HH:MM:SS
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = padTime(hours % 60);
    const formattedMinutes = padTime(minutes % 60);
    const formattedSeconds = padTime(seconds % 60);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function padTime(value) {
    // Pad single-digit numbers with a leading zero
    return value < 10 ? `0${value}` : value;
}
