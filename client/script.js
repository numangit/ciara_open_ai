import bot from './assets/bot.svg';
import user from './assets/user.svg';

//DOM Elements
const formEl = document.querySelector('form');
const chatContainerEl = document.querySelector('#chat-container');

let loadInterval;

//function to set chat loader (dot animation)
const loader = (element) => {
  element.textContent = '';

  //to render 3 dots one by one
  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === "....") {
      element.textContent = '';
    };

  }, 300);
};

//function show typing animation
const typingText = (element, text) => {
  let i = 0;

  //to show each characters after 20ms
  let interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      1++;
    } else {
      clearInterval(interval);
    };

  }, 20);
};

//function to generate UID
const generateUid = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(36);

  return `id-${timestamp}-${hexadecimalString}`;
};

//function to generate chat strips
const chatStripe = (isAi, message, uniqueId) => {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
           <img src="${isAi ? bot : user}" alt="">
          </div>
        </div>
      </div>
    `
  )
};