import bot from './assets/bot.svg';
import user from './assets/user.svg';

//DOM Elements
const formEl = document.querySelector('form');
const chatContainerEl = document.querySelector('#chat-container');

let loadInterval;

//function to set chat loader (dot animation)
const loader = (element) => {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === "....") {
      element.textContent = '';
    };

  }, 300);
};