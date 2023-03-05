import bot from './assets/bot.svg';
import user from './assets/user.svg';

//DOM Elements
const form = document.querySelector('form');
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

  }, 300)
};

//function show typing animation
const typingText = (element, text) => {
  let i = 0;

  //to show each characters after 20ms
  let interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
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

//function to generate bot chat strips
const chatStripe = (isAi, message, uniqueId) => {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
           <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}">
          </div>
          <div class="message" id=${uniqueId}>${message}</div>
        </div>
      </div>
    `
  )
};

//function to handler submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);//try e.target.name.value

  //generate user chat stripe
  chatContainerEl.innerHTML += chatStripe(false, data.get('prompt'))

  form.reset();

  //generate bot chat stripe
  const uniqueId = generateUid();
  chatContainerEl.innerHTML += chatStripe(true, '', uniqueId);

  //to show the new message by user
  chatContainerEl.scrollTop = chatContainerEl.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim()

    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()

    messageDiv.innerHTML = "Something went wrong"
    alert(err)
  }
};

//event listener for handle submit
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  };
});