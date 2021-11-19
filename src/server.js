import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://locahost:3000`);
// app.listen(3000, handleListen);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    // make chat room
    socket.join(roomName);
    // execute function showRoom
    done();
    // send a message to one room
    socket.to(roomName).emit("Welcome");
  });
  // send a message when someone is leaving
  socket.on("disconnecting", () => {
    socket.rooms.forEach(room => socket.to(room).emit("Bye"));
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
  // this will be executed on the front-end side
    done();
  });
});

// disconnect: firing when the connection is completely lost (room info is empty)
// disconnecting: browser is closed but the server is still connecting. (room info is valid)

httpServer.listen(3000, handleListen);

{
  type: "message";
  payload: "Hello";
}

{
  type: "nickname";
  payload: "Kate Park";
}

// The JSON.stringify() method converts a JavaScript object or value to a JSON string
// => Convert object to string

// The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
// => Convert string to JS object

