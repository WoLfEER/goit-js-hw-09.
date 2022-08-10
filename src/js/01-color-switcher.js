const { stopBtn, startBtn } = {
  stopBtn: document.querySelector('[data-stop]'),
  startBtn: document.querySelector('[data-start]'),
};

let timeoutId = 0;

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');

  timeoutId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timeoutId);
  startBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
