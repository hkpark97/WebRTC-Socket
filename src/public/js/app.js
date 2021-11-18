const socket = new WebSocket(`ws://${window.location.host}`);

// This will only be executed when the socket open the connection
// This will be displayed in console on web
socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
}); 

socket.addEventListener("message", (message) => {
    console.log("New Message: ", message.data);
});

// Server connection lost
socket.addEventListener("close", () => {
    console.log("Disconnected from the Server ❌");
});

// Send message to the Back-End
// To prevent send a message immediately / wait for 10 sec
setTimeout(() => {
    socket.send("Hello from the Browser");
}, 10000);