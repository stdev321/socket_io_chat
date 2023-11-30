import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// UserForm component for capturing user details through a dialog
// Props:
// - {onFormSubmit}: Function to be called when the form is submitted, receives the entered username as a parameter 📝
export default function UserForm({ onFormSubmit }) {
  // State variables 🔄
  const [open, setOpen] = React.useState(true);
  const [userName, setUserName] = React.useState("demo");

  // Close the dialog 🚪
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission ✅
  const onSubmit = () => {
    // Validate and submit the form ✨
    if (!userName) return alert("Please enter a valid user name");
    if (onFormSubmit) {
      onFormSubmit(userName);
    }
    // Close the dialog 🚪
    setOpen(false);
  };

  return (
    // React fragment to encapsulate the component 📦
    <>
      {/* Dialog for user details 🗣 */}
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown fullWidth>
        {/* Dialog title 🌟 */}
        <DialogTitle>User Details</DialogTitle>
        {/* Dialog content 📝 */}
        <DialogContent>
          {/* Instruction text 📌 */}
          <DialogContentText>Please enter your user name.</DialogContentText>
          {/* Text field for entering username 📬 */}
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="email"
            fullWidth
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </DialogContent>
        {/* Dialog actions 🚀 */}
        <DialogActions>
          {/* Submit button 🚀 */}
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
