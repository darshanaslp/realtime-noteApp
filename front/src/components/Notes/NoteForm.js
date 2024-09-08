import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createNewNote,
  updateExistingNote,
} from "../../redux/actions/noteActions";
import { getNotes } from "../../services/noteService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteForm = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [note, setNote] = useState({ title: "", content: "" });
  const isEditMode = !!noteId; // Check if we're in "edit mode"

  useEffect(() => {
    // If we're in edit mode, fetch the note details based on the noteId
    if (isEditMode) {
      const fetchNote = async () => {
        const notes = await getNotes();
        const currentNote = notes.find((n) => n._id === noteId);
        if (currentNote) {
          setNote({ title: currentNote.title, content: currentNote.content });
        }
      };
      fetchNote();
    }
  }, [noteId, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (note.title === "" || note.content === "") {
      toast.error("Both title and content are required!");
      return;
    }

    if (isEditMode) {
      // If in edit mode, update the existing note
      dispatch(updateExistingNote(noteId, note.title, note.content))
        .then(() => {
          toast.success("Note updated successfully!");
          setTimeout(() => navigate("/dashboard"), 1000);
        })
        .catch(() => {
          toast.error("Error updating note");
        });
    } else {
      // Otherwise, create a new note
      dispatch(createNewNote(note.title, note.content))
        .then(() => {
          //toast.success('Note created successfully!');
          setTimeout(() => navigate("/dashboard"), 500);
        })
        .catch(() => {
          toast.error("Error creating note");
        });
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="font-form-title mb-5">{isEditMode ? "Edit Note" : "Create New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label font-form-title">
            Note Title
          </label>
          <input
            type="text"
            className="form-control"
            id="noteTitle"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            placeholder="Enter note title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="noteContent" className="form-label font-form-title">
            Note Content
          </label>
          <textarea
            className="form-control"
            id="noteContent"
            rows="6"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            placeholder="Enter note content"
          />
        </div>
        <button
          type="submit"
          className={`btn ${isEditMode ? "btn-warning" : "btn-primary"}`}
        >
          {isEditMode ? "Update Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
