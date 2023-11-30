# Websocket based React Chat App

This is a Websocket based chat application with a React frontend and Node.js/Socket.io backend. The app is a Group chat app implementing websocket logic using socket.io.

## Frontend (React)

### Features:

- **Group Chat** Implemented Group Chat functionality. 
- **State Management** functionality to send a message from the input field to the server via WebSockets when a user submits it.
displayed incoming messages from the server in the message display area.
- **Error handling and reconnection** Implemented error handling for WebSocket communication
Added reconnection logic to attempt reconnecting if the WebSocket connection is lost.
- **Performance** Efficiently updating the DOM whenever new messages come without causing re-renders of the entire message list
 

### Backend (NodeJS+Socket.io):

- **Websocket integration** For Websocket integration used Socket.io
- **Security and validation** (Prevented XSS by Sanitizing the incoming messages )
- **Connection/Re-connection Handling** Handled reconnection logic & error in connection

### Code Quality:

- Used best practices in improving the code quality in both frontent & backend.
- Kept the code clean , minimal & used proper commenting to improve code readiblity


### Technologies Used:

- React
- Socket.io (for WebSocket)
- MUI (for UI library)
- validator (for sanitizing the incoming messages)
  

## How to Run the App:

Clone the library:
The front-end code is in "frontend" folder & backend code is in "backend"

To run backend
```
cd backend
npm install
npm run
``````
To run frontend
```
cd frontend
npm install
npm start
``````
### Simulation/Running 
- Open frontend in atleast two seprate windows to test the full functionality of the app
- To simulate the input disabled logic closed all the browser windows except one
- To simulate the connection/re-connection/error logic close the running websocket server
- To simulate the message-flooding(for performance test) navigate to the backend folder & run following command:
    (first uncomment the setinterval function)
```
node client.js
```
