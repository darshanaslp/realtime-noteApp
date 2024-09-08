import api from "./api"; // Import the pre-configured API service

// Service to create a new note
export const createNote = async (title, content) => {
  try {
    const response = await api.post("/notes", { title, content });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error creating note";
  }
};

// Service to get all notes
export const getNotes = async () => {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching notes";
  }
};

// Service to update a note by ID
export const updateNote = async (noteId, title, content) => {
  try {
    const response = await api.put(`/notes/${noteId}`, { title, content });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating note";
  }
};

// Service to delete a note by ID
export const deleteNote = async (noteId) => {
  try {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error deleting note";
  }
};

// Service to share a note with another user by note ID
export const shareNote = async (noteId, userId) => {
  try {
    const response = await api.post(`/notes/share/${noteId}`, { userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error sharing note";
  }
};

export const getSharedNotes = async () => {
  try {
    const response = await api.get("/notes/shared");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching shared notes";
  }
};

// Service to delete a note by ID
export const getNoteId = async (noteId) => {
  try {
    const response = await api.get(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error note find";
  }
};

// Service to delete a note by ID
export const getUseryId = async (userId) => {
  try {
    const response = await api.get(`/notes/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error user find";
  }
};


// Service to get user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/notes/user/email/${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error finding user by email";
  }
};
