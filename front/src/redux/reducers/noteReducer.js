// src/redux/reducers/noteReducer.js

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

const initialState = {
  notes: [],
  error: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        error: null,
      };

    case GET_NOTES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        error: null,
      };

    case CREATE_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
        error: null,
      };

    case UPDATE_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
        error: null,
      };

    case DELETE_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case SHARE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
        error: null,
      };

    case SHARE_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default noteReducer;
