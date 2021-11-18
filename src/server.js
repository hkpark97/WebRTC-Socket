import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://locahost:3000`);
// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// dummy DB
const sockets = [];

// This wil be displayed in the terminal
wss.on("connection", (socket) => {
  // put dummy DB into socket
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);

    // instead of using if else condition, can use switch
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));

      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});

server.listen(3000, handleListen);

// server can handle ws, https by implementing WebSockets
// Reasons to be needed http server:
// want views, static files, home, redirection`

// socket is a connection between me and browser

// Send JSON
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
