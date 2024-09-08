const express = require("express");
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
  getSharedNotes,
  getUseryId,
  getUserByEmail
} = require("../controllers/notesController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getNotes);
router.get("/shared", authMiddleware, getSharedNotes);
router.get('/user/email/:email', getUserByEmail);
router.get("/:id", authMiddleware, getNoteById);
router.post("/", authMiddleware, createNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
router.post("/share/:id", authMiddleware, shareNote);
router.get("/user/:id",authMiddleware,getUseryId);

module.exports = router;


