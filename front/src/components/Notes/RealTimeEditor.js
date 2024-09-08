import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  joinNote,
  leaveNote,
  onNoteUpdated,
  editNote,
  updateUserPresence,
  onUserPresenceUpdated,
} from "../../services/socket";
import { getUseryId , getNoteId } from "../../services/noteService"; // Import the services to get user info and notes

const RealTimeEditor = () => {
  const { noteId } = useParams(); // Get noteId from the URL
  const navigate = useNavigate();
  const typingTimeoutRef = useRef(null);

  const [content, setContent] = useState(""); // Track the content of the note
  const [editingUsers, setEditingUsers] = useState([]); // Track users currently editing

  useEffect(() => {
    const user = localStorage.getItem("userId");

    // Fetch the initial note content from the list of notes
    const fetchNote = async () => {
      try {
        const note = await getNoteId(noteId);
        if (note) {
          setContent(note.content); // Set the fetched note content
        }
      }  catch (error) {
        console.error("Error fetching the initial note content:", error);
      }
    };

    fetchNote(); // Fetch the note when the component mounts

    // Join the note room and notify other users
    joinNote(noteId, user);
    updateUserPresence(noteId, user, "joined");

    // Listen for real-time note updates
    onNoteUpdated((updatedNote) => {
      setContent(updatedNote.content); // Update the content state when the note is updated
    });

    // Listen for updates on who is currently editing the note
    onUserPresenceUpdated(async (users) => {
      const userEmails = await Promise.all(
        users.map(async (userId) => {
          try {
            const user = await getUseryId(userId);
            return user.email;
          } catch (error) {
            console.error("Error fetching user by ID:", error);
            return "Unknown User";
          }
        })
      );
      setEditingUsers(userEmails); // Update the list of emails for users currently editing
    });

    // Leave the note room when the user navigates away
    return () => {
      leaveNote(noteId, user);
      updateUserPresence(noteId, user, "left");
    };
  }, [noteId]);

  // Emit changes to the note content as the user types
  const handleEdit = (e) => {
    const updatedContent = e.target.value;
    setContent(updatedContent); // Update the local state

    // Clear any existing timeout before setting a new one
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Set a new timeout for 2 seconds (2000 ms)
    typingTimeoutRef.current = setTimeout(() => {
      editNote(noteId, updatedContent); // Emit the updated content to the server after the delay
    }, 2000);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side: Active Users */}
        <div className="col-md-4">
          <div className="card" style={{border:'none'}}>
            <div className="card-header" style={{border:'none',background:'#d7faf8'}}>
              <h5 className="realtime-title">Active Users</h5>
            </div>
            <ul className="list-group list-group-flush">
              {editingUsers.map((email, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    src={`https://www.gravatar.com/avatar/${index}?d=identicon`}
                    alt="Avatar"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  <span className="realtime-body">{email}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Message Editor */}
        <div className="col-md-8">
          <div className="card" style={{border:'none'}}>
            <div className="card-header" style={{border:'none',background:'#d7faf8'}}>
              <h5 className="realtime-title">Real-time Note Editor</h5>
            </div>
            <div className="card-body">
              {/* Text area for editing the note */}
              <textarea
                className="form-control realtime-body"
                value={content}
                onChange={handleEdit}
                rows="10"
                placeholder="Type your message here..."
              />
            </div>
            <div className="card-footer d-flex justify-content-end" style={{border:'none',background:'#d7faf8'}}>
              <button
                className="btn btn-info"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeEditor;
