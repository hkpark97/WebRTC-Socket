const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

// This will only be executed when the socket open the connection
// This will be displayed in console on web
socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

// Server connection lost
socket.addEventListener("close", () => {
  console.log("Disconnected from the Server ❌");
});

// Send message to the Back-End
// To prevent send a message immediately / wait for 10 sec
// setTimeout(() => {
//     socket.send("Hello from the Browser");
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // send something to the back-end
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
};

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value)); 
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
