let express = require("express");
let socket = require("socket.io");

const app = express();

let server = app.listen(8080, () => {
  console.log("listening to requests on prt 8080");
});

// static files

app.use(express.static("public"));

// socket setup

let io = socket(server);

io.on("connection", (socket) => {
  console.log("connection established!");

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
    console.log(data);
  });

  socket.on("typing", (data) => {
    io.sockets.emit("typing", data);
    console.log(data);
  });
});
