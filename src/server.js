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

// This wil be displayed in the terminal
wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    socket.send("Hello");
    socket.on("message", (message) => {
        console.log(message.toString('utf-8'));
    });
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
});

server.listen(3000, handleListen);

// server can handle ws, https by implementing WebSockets
// Reasons to be needed http server: 
// want views, static files, home, redirection`

// socket is a connection between me and browser