import { Notify } from 'notiflix/build/notiflix-notify-aio';


const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnSubmit = document.querySelector('button[type="submit"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } 
        reject({ position, delay });
    }, delay);
  });
}


btnSubmit.addEventListener('click', e => {
  e.preventDefault();
  
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let enteredAmount = Number(amount.value);

  for (let i = 0; i < enteredAmount; i++) {
    createPromise(i + 1, firstDelay + delayStep * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
