// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000', {
//   auth: {
//     token: localStorage.getItem('accessToken'), // Attach token if needed for socket authentication
//   },
// });

// // Join a specific note's room to enable real-time updates
// export const joinNote = (noteId) => {
//   socket.emit('joinNote', noteId);
// };

// // Listen for real-time note updates
// export const onNoteUpdated = (callback) => {
//   socket.on('noteUpdated', callback);
// };

// // Emit the updated note content to the server
// export const editNote = (noteId, content) => {
//   socket.emit('editNote', { noteId, content });
// };

// export default socket;


import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: localStorage.getItem('accessToken'), // Attach token for socket authentication
  },
});

// Join a specific note's room to enable real-time updates
export const joinNote = (noteId, userId) => {
  socket.emit('joinNote', { noteId, userId });
};

// Notify when the user leaves the note room
export const leaveNote = (noteId, userId) => {
  socket.emit('leaveNote', { noteId, userId });
};

// Listen for real-time note updates
export const onNoteUpdated = (callback) => {
  socket.on('noteUpdated', callback);
};

// Emit the updated note content to the server
export const editNote = (noteId, content) => {
  socket.emit('editNote', { noteId, content });
};

// Listen for updates on users who are currently editing
export const onUserPresenceUpdated = (callback) => {
  socket.on('userPresenceUpdated', callback);
};

// Emit the user presence status
export const updateUserPresence = (noteId, userId, status) => {
  socket.emit('userPresence', { noteId, userId, status });
};

export default socket;
