import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/themes/dark.css";


const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.disablet = true;
let enteredDate = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure("Please choose a date in the future");
            btnStart.disablet = true;
            enteredDate = new Date();
        } else {
            btnStart.disablet = false;
            enteredDate = selectedDates[0];
        }
    },
};

flatpickr(input, options);

function convertMs(ms) {
// Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

// Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
// Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
// Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
// Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

btnStart.addEventListener('click', () => {
    let timerId = setInterval(() => {

        const currentTime = Date.now();
        let countdown = enteredDate - currentTime;
        btnStart.disablet = true;

        if (countdown >= 0) {
            const componentsTimer = convertMs(countdown);
            days.textContent = componentsTimer.days;
            hours.textContent = componentsTimer.hours;
            minutes.textContent = componentsTimer.minutes;
            seconds.textContent = componentsTimer.seconds;
        } else {
            clearInterval(timerId);
        }
    }, 1000);
});
