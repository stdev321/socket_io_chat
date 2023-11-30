const { io } = require("socket.io-client");

const socket = io("https://30eb-122-160-98-118.ngrok-free.app");

// server-side
socket.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

// client-side
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.emit("addUser", { user: "vikash-jha", socketId: socket.id });

  socket.emit("sendMessage", {
    senderSocketId: socket.id,
    text: "incoming please be aware",
    user: "vikash-jha",
  });

  // setInterval(function(){

  //   for(i=0;i<5;i++){
  //     socket.emit("sendMessage",{ senderSocketId: socket.id, text: 'random message: '+Math.random(), user: 'vikash-jha' })

  //   }

  // },500)
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

 

socket.on("connectedClientsCount", (count) => {
  console.log(`Total clients connected: ${count}`);
  // Update your UI or perform any other actions with the total count

  socket.emit("getLatestData");
});

socket.on("connectedClientsDetails", (data) => {
  console.log(data);
  // Update your UI or perform any other actions with the total count
});

// Event: 'reconnect' - Triggered when a reconnection is successful
socket.on("reconnect", (attemptNumber) => {
  console.log(`Reconnected to the server (attempt ${attemptNumber})`);
});

// Event: 'reconnect_attempt' - Triggered before a reconnection attempt is made
socket.on("reconnect_attempt", (attemptNumber) => {
  console.log(`Attempting to reconnect (attempt ${attemptNumber})`);
});

// Event: 'disconnect' - Triggered when the client disconnects from the server
socket.on("disconnect", (reason) => {
  console.log(`Disconnected from the server: ${reason}`);
});

// Event: 'reconnect_failed' - Triggered when all reconnection attempts have failed
socket.on("reconnect_failed", () => {
  console.log("Reconnection attempts failed. Please check the server.");
});

// Event: 'error' - Triggered when an error occurs
socket.on("error", (error) => {
  console.error("Socket.IO error:", error.message);
  // Handle the error as needed
});

// Event: 'connectedClientsCount' - Handle the total number of connected clients
socket.on("connectedClientsCount", (count) => {
  console.log(`Total clients connected: ${count}`);
});

// Event: 'connectedClientsDetails' - Handle the details of connected clients
socket.on("connectedClientsDetails", (data) => {
  console.log(data);
});
