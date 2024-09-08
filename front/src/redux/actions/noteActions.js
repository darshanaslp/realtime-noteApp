// src/redux/actions/noteActions.js

import {
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  SHARE_NOTE_SUCCESS,
  SHARE_NOTE_FAILURE,
} from "../noteConstants";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
} from "../../services/noteService";
import { toast } from "react-toastify";

// Action to fetch all notes
export const fetchNotes = () => async (dispatch) => {
  try {
    const notes = await getNotes();
    dispatch({ type: GET_NOTES_SUCCESS, payload: notes });
  } catch (error) {
    dispatch({ type: GET_NOTES_FAILURE, payload: error });
  }
};

// Action to create a new note
export const createNewNote = (title, content) => async (dispatch) => {
  try {
    const newNote = await createNote(title, content);
    dispatch({ type: CREATE_NOTE_SUCCESS, payload: newNote });
    toast.success("Create Note successful!");
  } catch (error) {
    dispatch({ type: CREATE_NOTE_FAILURE, payload: error });
  }
};

// Action to update an existing note
export const updateExistingNote =
  (noteId, title, content) => async (dispatch) => {
    try {
      const updatedNote = await updateNote(noteId, title, content);
      dispatch({ type: UPDATE_NOTE_SUCCESS, payload: updatedNote });
    } catch (error) {
      dispatch({ type: UPDATE_NOTE_FAILURE, payload: error });
    }
  };

// Action to delete a note
export const deleteExistingNote = (noteId) => async (dispatch) => {
  try {
    await deleteNote(noteId);
    dispatch({ type: DELETE_NOTE_SUCCESS, payload: noteId });
  } catch (error) {
    dispatch({ type: DELETE_NOTE_FAILURE, payload: error });
  }
};

// Action to share a note with another user
export const shareExistingNote = (noteId, email) => async (dispatch) => {
  try {
    const sharedNote = await shareNote(noteId, email);
    dispatch({ type: SHARE_NOTE_SUCCESS, payload: sharedNote });
    toast.success("Note Share successful!");
  } catch (error) {
    dispatch({ type: SHARE_NOTE_FAILURE, payload: error });
  }
};
