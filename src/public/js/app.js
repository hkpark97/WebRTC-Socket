// io function will automatically search the server that running socket.io
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message; 
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  // send function to the back-end
  form.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = ""; 
} 

form.addEventListener("submit", handleRoomSubmit);

// execute socket.to function
socket.on("Welcome", () => {
  addMessage("Someone just joined!");
});

socket.on("Bye", () => {
  addMessage("Someone left");
});

// receiving message
socket.on("new_message", addMessage);

// The appendChild() method of the Node interface adds a node to the end of 
// the list of children of a specified parent node. 
// If the given child is a reference to an existing node in the document, 
// appendChild() moves it from its current position to the new position 
// (there is no requirement to remove the node from its parent node 
// before appending it to some other node).