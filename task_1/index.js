/**
 * 359999 - максимальное кол-во секунд
 *
 */
const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  max_hours = hour * 100;
let interval;

const formatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2
})

const formatTime = (time) => {
  return formatter.format(Math.floor(time))
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    clearInterval(interval);
    let endDate = new Date().setTime(new Date().getTime() + seconds * 1000);

    interval = setInterval(() => {
      const duration = endDate - new Date().getTime() + second;

      if (duration >= max_hours) {
        timerEl.innerHTML = "Время не должно превышать 99 часов 59 минут 59 секунд";
        clearInterval(interval);
        return;
      }

      if (duration < 0) {
        clearInterval(interval);
        return;
      }
      const hh = formatTime((duration % (max_hours)) / (hour)),
        mm = formatTime((duration % (hour)) / (minute)),
        ss = formatTime((duration % (minute)) / second);

      timerEl.innerHTML = hh + ':' + mm + ":" + ss;
    }, 0)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (event) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
