const Note = require("../models/Note");
const User = require("../models/User");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (
      note.user.toString() !== req.user._id.toString() &&
      !note.sharedWith.includes(req.user._id)
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      user: req.user._id,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "User not authorized" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "User not authorized" });
    }

    await note.deleteOne();
    res.json({ message: "Note removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.shareNote = async (req, res) => {
  const { userId } = req.body;

  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "User not authorized" });
    }

    if (note.sharedWith.includes(userId)) {
      return res.status(400).json({ message: "Note already shared with this user." });
    }

   // if (!note.sharedWith.includes(userId)) {
      note.sharedWith.push(userId);
      await note.save();
    //}

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fetch notes shared with the authenticated user
exports.getSharedNotes = async (req, res) => {
  try {
    const userId = req.user.id;  

    // Find notes where the user's ID is in the sharedWith array
    const sharedNotes = await Note.find({ sharedWith: userId });

    res.status(200).json(sharedNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching shared notes' });
  }
};


// Service to get user by id
exports.getUseryId = async (req, res) => {
  try {
    const userId = await User.findById(req.params.id);

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: userId._id,
      username: userId.username,
      email: userId.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Service to get user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
