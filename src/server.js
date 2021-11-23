import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => console.log(`Listening on http://locahost:3000`);
httpServer.listen(3000, handleListen);

// app.listen(3000, handleListen);

// const httpServer = http.createServer(app);

// // Socket admin panel
// const wsServer = new Server(httpServer, {
//   cors: {
//     origin: ["https://admin.socket.io"],
//     credentials: true,
//   },
// });

// instrument(wsServer, {
//   auth: false,
// });

// // getting sids and rooms inside of wsServer
// function publicRooms() {
//   const {
//     sockets: {
//       adapter: { sids, rooms },
//     },
//   } = wsServer;
//   // finding public rooms
//   const publicRooms = [];
//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });
//   return publicRooms;
// }

// function countRoom(roomName) {
//   // if precondition is true return .size else return undefined
//   return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

// wsServer.on("connection", (socket) => {
//   socket["nickname"] = "Anon";
//   socket.onAny((event) => {
//     console.log(`Socket Event: ${event}`);
//   });
//   socket.on("enter_room", (roomName, done) => {
//     // make chat room
//     socket.join(roomName);
//     // execute function showRoom
//     done();
//     // send a message to one room
//     socket.to(roomName).emit("Welcome", socket.nickname, countRoom(roomName));
//     // notify everyone in the room
//     wsServer.sockets.emit("room_change", publicRooms());
//   });
//   // send a message when someone is leaving
//   socket.on("disconnecting", () => {
//     // countRoom(room) -1 => we haven't left the room so they will count include you, so we instead do -1
//     socket.rooms.forEach((room) =>
//       socket.to(room).emit("Bye", socket.nickname, countRoom(room) - 1)
//     );
//   });
//   socket.on("disconnect", () => {
//     wsServer.sockets.emit("room_change", publicRooms());
//   });
//   socket.on("new_message", (msg, room, done) => {
//     socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//     // this will be executed on the front-end side
//     done();
//   });
//   // getting nick name
//   socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
// });

// // disconnect: firing when the connection is completely lost (room info is empty)
// // disconnecting: browser is closed but the server is still connecting. (room info is valid)

// httpServer.listen(3000, handleListen);

// {
//   type: "message";
//   payload: "Hello";
// }

// {
//   type: "nickname";
//   payload: "Kate Park";
// }

// // The JSON.stringify() method converts a JavaScript object or value to a JSON string
// // => Convert object to string

// // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
// // => Convert string to JS object
