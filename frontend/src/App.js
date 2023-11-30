import { useState } from "react";
import "./App.css";
import ChatUI from "./components/ChatUI";
import UserForm from "./components/UserForm";
import { Toaster } from "react-hot-toast";

/**
 * App component serving as the main entry point for the application.
 */
function App() {
  // State variable to store the current user
  const [user, setUser] = useState("");

  /**
   * Callback function to handle form submission and set the user.
   * @param {string} userName - The entered username.
   */
  const onFormSubmit = (userName) => {
    setUser(userName);
  };

  // Render the App component
  return (
    <div className="App">
      {/* UserForm component for capturing user details */}
      <UserForm onFormSubmit={onFormSubmit} />

      {/* ChatUI component for managing the chat interface */}
      {user && <ChatUI user={user} />}

      {/* Toaster component for displaying notifications */}
      <Toaster />
    </div>
  );
}

export default App;
