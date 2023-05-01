// make connection

let socket = io.connect("http://localhost:8080");
// Query DOM
let handle = document.querySelector("#handle");
let message = document.querySelector("#message");
let typing = document.querySelector("#typing");
let output = document.querySelector("#output");
let button = document.querySelector("#send");

// emit events
button.addEventListener("click", () => {
  socket.emit("chat", { message: message.value, handle: handle.value });
});

message.addEventListener("focus", () => {
  socket.emit("typing", { handle: handle.value });
});

socket.on("chat", (data) => {
  output.innerHTML += "<p><strong>" + data.handle + ":" + data.message + "</p>";
  typing.innerHTML = "";
});

socket.on("typing", (data) => {
  if (handle.value !== data.handle) {
    typing.innerHTML = "<p>" + data.handle + " is typing... </p>";
  }
});
