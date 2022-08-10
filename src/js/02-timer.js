// imports //
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const

const {
  daysRef,
  hoursRef,
  minutesRef,
  secondsRef,
  startBtn,
  formInput,
  fieldsRef,
} = {
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  formInput: document.querySelector('#datetime-picker'),
  fieldsRef: document.querySelectorAll('.field'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - options.defaultDate.getTime() < 0) {
      Notify.failure('В прошлое нельзя!');
      disabledBtn(true);
    } else {
      disabledBtn(false);
    }
  },
};

const fp = flatpickr(formInput, options);

//   listener //

startBtn.addEventListener('click', onBtnStartClick);

// STYLIZE //

fieldsRef[0].parentElement.style.display = 'flex';
fieldsRef.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.marginRight = '30px';
  field.firstElementChild.style.textAlign = 'center';
  field.firstElementChild.style.fontSize = '36px';
});
startBtn.style.backgroundColor = 'fffbbb';
startBtn.style.borderRadius = '20px';
// functions//

function onBtnStartClick() {
  let deltaTime = fp.selectedDates[0].getTime() - Date.now();
  if (deltaTime > 0) {
    // timerId must to be global
    const timerId = setInterval(() => {
      deltaTime = fp.selectedDates[0].getTime() - Date.now();
      const convertTime = convertMs(deltaTime);
      updateTime(convertTime);
      disabledBtn(true);
      dіsableInput(true);
    }, 1000);
    setTimeout(() => {
      clearInterval(timerId);
      disabledBtn(false);
      dіsableInput(false);
    }, deltaTime);
  }
  return;
}

function updateTime({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
}

function disabledBtn(value) {
  startBtn.disabled = !startBtn.disabled;
}

function dіsableInput(value) {
  formInput.disabled = !startBtn.disabled;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function disabledBtn(value) {
  startBtn.disabled = value;
}

function dіsableInput(value) {
  formInput.disabled = value;
}
