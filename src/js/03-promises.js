import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { form, firstDelay, delayStep, amount } = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

console.log(form, firstDelay, delayStep, amount);
console.log(firstDelay.value);

form.addEventListener('submit', event => {
  event.preventDefault();

  let firstDelayValue = firstDelay.value;
  const delayStepValue = delayStep.value;

  for (let index = 1; index <= amount.value; index++) {
    createPromise(index, firstDelayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}`);
      });

    firstDelayValue += delayStepValue;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}
