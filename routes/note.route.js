import express from "express";
import {
  createNote,
  viewNotes,
  viewNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
const router = express.Router();

// Create a note
router.post("/", createNote);

// View all notes
router.get("/", viewNotes);

// View a note
router.get("/:id", viewNote);

// Update a note
router.put("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

export default router;
