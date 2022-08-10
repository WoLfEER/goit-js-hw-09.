import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { form, firstDelay, delayStep, amount } = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

form.addEventListener('submit', event => {
  event.preventDefault();

  // const for get value

  let getDelayValue = Number(firstDelay.value);
  const getStepValue = Number(delayStep.value);
  console.log(getStepValue);
  console.log(getDelayValue);

  for (let index = 1; index <= amount.value; index++) {
    console.log(index);
    createPromise(index, getDelayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    getDelayValue += getStepValue;
  }
  form.reset();
});

// functions //
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
