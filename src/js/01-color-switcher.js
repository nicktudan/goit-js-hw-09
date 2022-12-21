const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = 0;
const INTERVAL_DELAY = 1000;
btnStart.disabled = false;
btnStop.disabled = true;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function updateBgColor() {
    body.style.backgroundColor = getRandomHexColor();
}

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
    timerId = setInterval(updateBgColor, INTERVAL_DELAY);
    btnStart.disabled = true;
    btnStop.disabled = false;
}

btnStop.addEventListener('click', onBtnStopClick);

function onBtnStopClick() {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}