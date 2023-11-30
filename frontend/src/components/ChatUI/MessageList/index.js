import React, { useRef, useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import ScrollableFeed from "react-scrollable-feed";

/**
 * MessageList component for displaying and sending chat messages.
 * Props:
 * - {socketClient}: The Socket.IO client for communication with the server 🚀
 * - {currentUser}: The current user sending messages 🧑‍💻
 * - {users}: An array of user objects containing socketId and user information 🙋‍♂️
 */
const MessageList = ({ socketClient, currentUser = "", users = [] }) => {
  const clientRef = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // Effect to listen for incoming messages when the socketClient is defined
  useEffect(() => {
    if (!socketClient) return;

    // Listen for incoming messages
    if (!clientRef.current) {
      socketClient.on("newMessage", (message) => {
        // Update local state with the new message
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      clientRef.current = true;
    }
  }, [socketClient]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        senderSocketId: socketClient.id,
        text: inputValue,
        user: currentUser,
      };

      // Send the message to the server
      socketClient.emit("sendMessage", newMessage);

      // Update the local state
      setInputValue("");
    }
  };

  // Handle key down event (Enter key for sending message)
  const handleKeyDown = (event) => {
    if (event.code === "Enter") {
      handleInputChange(event);
      handleSendMessage();
    }
  };

  return (
    // Container for the MessageList component
    <div style={{ flex: 1, flexDirection: "column", overflowY: "hidden" }}>
      {/* Message display area */}
      <div style={{ height: "calc(100% - 30px)", overflowY: "hidden" }}>
        <ScrollableFeed>
          {messages.length > 0 ? (
            // Map through messages and display them
            messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  alignItems:
                    socketClient.id === message.socketId
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                {/* Display user and message text */}
                <ListItemText primary={message.user} secondary={message.text} />
              </ListItem>
            ))
          ) : (
            // Display a warning if no messages found
            <Alert icon={false} severity="warning">
              No messages found!
            </Alert>
          )}
        </ScrollableFeed>
      </div>

      {/* Message input area */}
      <div style={{ marginTop: -50, padding: 20 }}>
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleSendMessage}
                disabled={users.length === 0}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
          disabled={users.length === 0}
        />
      </div>
    </div>
  );
};

export default MessageList;
