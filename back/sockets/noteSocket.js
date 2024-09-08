const Note = require('../models/Note');

const userPresence = {}; // To track users editing notes

const noteSocketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // User joins a specific note's room
        socket.on('joinNote', ({ noteId, userId }) => {
            socket.join(noteId);
            console.log(`User ${userId} joined note: ${noteId}`);

            // Add user to presence tracker
            if (!userPresence[noteId]) {
                userPresence[noteId] = [];
            }
            userPresence[noteId].push(userId);

            // Broadcast updated presence to everyone in the room
            io.to(noteId).emit('userPresenceUpdated', userPresence[noteId]);
        });

        // User leaves the note's room
        socket.on('leaveNote', ({ noteId, userId }) => {
            socket.leave(noteId);
            console.log(`User ${userId} left note: ${noteId}`);

            // Remove user from presence tracker
            if (userPresence[noteId]) {
                userPresence[noteId] = userPresence[noteId].filter((id) => id !== userId);
                io.to(noteId).emit('userPresenceUpdated', userPresence[noteId]);
            }
        });

        // Handle note editing
        socket.on('editNote', async ({ noteId, content }) => {
            try {
                const note = await Note.findById(noteId);
                if (note) {
                    note.content = content;
                    await note.save();
                    io.to(noteId).emit('noteUpdated', note);
                }
            } catch (error) {
                console.error('Error updating note:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

module.exports = noteSocketHandler;
