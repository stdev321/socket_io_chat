import React from "react";
import {
  Alert,
  Badge,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

/**
 * UsersList component for displaying a list of online users.
 * Props:
 * - {users}: An array of user objects containing socketId and user information 🧑‍💻
 */
const UsersList = ({ users = [] }) => {
  console.log("re render"); // Log to the console for re-render information

  return (
    // Container for the UsersList component
    <div
      style={{
        flexShrink: 0,
        width: "200px",
        overflowY: "auto",
        padding: "20px",
        borderRight: "1px solid #ccc",
      }}
    >
      {/* Display the number of online users */}
      {users.length > 0 && (
        <Badge badgeContent={users.length} color="primary">
          <PeopleIcon color="action" />
        </Badge>
      )}

      {/* List of online users */}
      <List>
        {users.length > 0 ? (
          // If there are users, map through and display each user's information
          users.map((user) => (
            <ListItem key={user.socketId} sx={{ alignItems: "center" }}>
              {/* Avatar for the user */}
              <Avatar
                variant="rounded"
                alt={user.user}
                src={`https://robohash.org/${user.user}.png?set=set3&size=150x150`}
              />
              {/* User name */}
              <ListItemText primary={user.user} />
            </ListItem>
          ))
        ) : (
          // If no users are found, display a warning message
          <Alert icon={false} severity="warning">
            No user found online!
          </Alert>
        )}
      </List>
    </div>
  );
};

export default UsersList;
