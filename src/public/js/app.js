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
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNickNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm  = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  // send function to the back-end
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNickNameSubmit);
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
socket.on("Welcome", (user) => {
  addMessage(`${user} just joined!`);
});

socket.on("Bye", (left) => {
  addMessage(`${left} left`);
});

// receiving message
socket.on("new_message", addMessage);

// notify everyone in the room
socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  // if there's a empty room clear the status
  roomList.innerHTML = ""; 
  if(rooms.length === 0 ) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.appendChild(li);
  })
});


// The appendChild() method of the Node interface adds a node to the end of 
// the list of children of a specified parent node. 
// If the given child is a reference to an existing node in the document, 
// appendChild() moves it from its current position to the new position 
// (there is no requirement to remove the node from its parent node 
// before appending it to some other node).