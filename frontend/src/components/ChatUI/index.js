import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import UsersList from "./UsersList";
import MessageList from "./MessageList";
import toast from "react-hot-toast";

/**
 * ChatUI component for managing the chat interface and communication with the Socket.IO server.
 * Props:
 * - {user}: The current user participating in the chat 🙋‍♂️
 */
const ChatUI = ({ user }) => {
  // State variables
  const [users, setUsers] = useState([]);
  const socketRef = useRef();

  // Effect to connect to the Socket.IO server when the user is defined
  useEffect(() => {
    if (!user) return;

    // Connect to the Socket.IO server
    socketRef.current = io("http://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      extraHeaders: {
        "ngrok-skip-browser-warning": true,
      },
    }); // Replace with your server URL

    // Event: 'connect' - Triggered when the connection is successful
    socketRef.current.on("connect", () => {
      socketRef.current.emit("addUser", {
        user,
        socketId: socketRef.current.id,
      });
    });

    // Event: 'error' - Triggered on connection error
    socketRef.current.on("error", (error) => {
      toast.error("Error connecting to server.");
      console.error("Error connecting to server:", error.message);
    });

    // Event: 'connect_error' - Triggered on connection error
    socketRef.current.on("connect_error", (error) => {
      toast.error("Connection lost, retrying...");
      console.error("Error connecting to server:", error.message);
    });

    // Event: 'disconnect' - Triggered on disconnection
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
      toast.error("Disconnected from server.");
    });

    // Event: 'reconnect' - Triggered when a reconnection is successful
    socketRef.current.on("reconnect", (attemptNumber) => {
      console.log(`Reconnected to the server (attempt ${attemptNumber})`);
    });

    // Event: 'reconnect_failed' - Triggered when all reconnection attempts have failed
    socketRef.current.on("reconnect_failed", () => {
      console.log("Reconnection attempts failed. Please check the server.");
    });

    // Event: 'reconnect_attempt' - Triggered before a reconnection attempt is made
    socketRef.current.on("reconnect_attempt", (attemptNumber) => {
      console.log(`Attempting to reconnect (attempt ${attemptNumber})`);
    });

    // Event: 'connectedClientsDetails' - Triggered when receiving connected clients' details
    socketRef.current.on("connectedClientsDetails", (clientList) => {
      setUsers(
        clientList.filter((user) => user.socketId !== socketRef.current.id)
      );
    });

    // Event: 'connectedClientsCount' - Triggered when receiving the connected clients count
    socketRef.current.on("connectedClientsCount", (count) => {
      console.log({ count });
    });

    // Event: 'reconnect' (from socket.io) - Triggered on successful reconnect
    socketRef.current.io.on("reconnect", (attempt) => {
      toast.success("Back online.");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);

  // Render the chat UI components
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Section (User List) */}
      <UsersList users={users} />

      {/* Right Section (Chat Data with Input Field) */}
      {socketRef.current && (
        <MessageList
          socketClient={socketRef.current}
          users={users}
          currentUser={user}
        />
      )}
    </div>
  );
};

export default ChatUI;
