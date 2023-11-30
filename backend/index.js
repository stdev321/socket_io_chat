const { createServer } = require("http");
const { Server } = require("socket.io");
var validator = require("validator");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Number of reconnection attempts
  reconnectionDelay: 1000, // Delay between reconnection attempts (in milliseconds)
  reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
});

const connectedClients = [];
let connectedClientDetails = [];

// Function to send the total number of connected clients to all clients
function sendConnectedClientsCount() {
  io.emit("connectedClientsCount", connectedClients.length);
  io.emit("connectedClientDetails", connectedClientDetails);
}

io.on("connection", (socket) => {
  console.log("New connection received:", socket.id);

  // Store the connected client in the array
  connectedClients.push(socket.id);

  // Emit updated count and details to all clients
  sendConnectedClientsCount();

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Remove the disconnected client from the array
    const index = connectedClients.indexOf(socket.id);
    if (index !== -1) {
      connectedClients.splice(index, 1);
      sendConnectedClientsCount();
    }

    // Remove the disconnected client from connectedClientDetails
    connectedClientDetails = connectedClientDetails.filter(
      (user) => socket.id !== user.socketId
    );

    console.log("After client disconnects:");
    console.log(connectedClientDetails);

    // Broadcast updated count and details to all clients
    io.emit("connectedClientsDetails", connectedClientDetails);
  });

  socket.on("addUser", (data) => {
    connectedClientDetails.push(data);

    console.log("After adding user:");
    console.log(connectedClientDetails);

    // Broadcast updated count and details to all clients
    sendConnectedClientsCount();
    // Broadcast updated count and details to all clients
    io.emit("connectedClientsDetails", connectedClientDetails);
  });

  socket.on("sendMessage", (data) => {
    console.log(data.text);

    let santizedText = validator.escape(data.text);
    let finalData = { ...data, text: santizedText };
    console.log("filtered Text: ", santizedText);

    io.emit("newMessage", finalData);
  });
});

 

// Send the total number of connected clients to a new client upon connection
io.on("connection", (socket) => {
  broadcastData(socket);
});

function broadcastData(socket) {
  // Send the initial count to the newly connected client

  if (socket != undefined) {
    socket.emit("connectedClientsCount", connectedClients.length);

    socket.emit("connectedClientsDetails", connectedClientDetails);
  }
}

io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

httpServer.listen(3001, () => {
  console.log("server is running");
});
