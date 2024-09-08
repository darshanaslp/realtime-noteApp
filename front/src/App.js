import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import NoteForm from "./components/Notes/NoteForm";
import ShareNote from "./components/Notes/ShareNote";
import RealTimeEditor from "./components/Notes/RealTimeEditor";
import Layout from "./pages/Layout";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  // Use useEffect to watch for changes to the authentication state
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
    };

    // Add a storage event listener for cross-tab updates (optional but useful)
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* Private Routes (wrapped inside Layout for persistent header/footer/sidebar) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {/* Dashboard Route */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Route to Create a New Note */}
          <Route path="notes/create" element={<NoteForm />} />

          {/* Route to Edit an Existing Note */}
          <Route path="notes/:noteId" element={<NoteForm />} />

          {/* Route to Share a Note */}
          <Route path="notes/share/:noteId" element={<ShareNote />} />

          {/* Real-time Editor Route */}
          <Route path="notes/realtime/:noteId" element={<RealTimeEditor />} />
        </Route>

        {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
