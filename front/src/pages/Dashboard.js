import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteExistingNote } from "../redux/actions/noteActions";
import { getSharedNotes } from "../services/noteService";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/Notes/NoteCard";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./Dashboard.css"; // Assuming the CSS file contains the font styles

const Dashboard = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { notes, error } = useSelector((state) => state.notes);
  const [sharedNotes, setSharedNotes] = useState([]);

  useEffect(() => {
    // Fetch user's own notes
    dispatch(fetchNotes());

    // Fetch notes shared with the user
    const fetchShared = async () => {
      try {
        const result = await getSharedNotes();
        setSharedNotes(result);
      } catch (error) {
        console.log("Error fetching notes", error);
      }
    };

    fetchShared();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log("Error fetching notes", error);
    }
  }, [error]);

  const handleCreateNote = () => {
    navigate("/notes/create");
  };

  const handleDelete = async (noteId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      dispatch(deleteExistingNote(noteId));
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
    }
  };

  return (
    <>
      <div className="container mt-4">
        {/* Apply Lobster font to Created Notes header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="font-shared-notes">Created Notes</h2>
          {/* Apply Roboto font to Create Note button */}
          <button
            onClick={handleCreateNote}
            className="btn btn-success btn-lg font-create-note-button"
          >
            Create Note
          </button>
        </div>

        {/* Row for User's Own Notes */}
        <div className="row">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div className="col-md-5 mb-5 font-user-note" key={note._id}>
                <NoteCard note={note} onDelete={() => handleDelete(note._id)} />
              </div>
            ))
          ) : (
            // Apply Oswald font to No Notes message
            <p className="font-no-notes">No notes found. Create a new note!</p>
          )}
        </div>

        {/* Apply Raleway font to Shared Notes header */}
        <h3 className="font-shared-notes">Notes Shared With You</h3>

        {/* Row for Shared Notes */}
        <div className="row">
          {sharedNotes && sharedNotes.length > 0 ? (
            sharedNotes.map((note) => (
              <div className="col-md-4 mb-4 font-shared-note" key={note._id}>
                <NoteCard note={note} onDelete={null} shared />
              </div>
            ))
          ) : (
            // Apply Courgette font to No Shared Notes message
            <p className="font-no-shared-notes">No notes have been shared with you.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
