import mongoose from "mongoose";
import Note from "../models/note.model.js";

// Create a note
export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    return res.status(200).json(note);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// View all notes
export const viewNotes = async (req, res, next) => {
  try {
    let notes = await Note.find();
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      notes = notes.slice(0, limit);
    }
    return res.status(200).json(notes);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// View a note
export const viewNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid note ID format");
      error.status = 400;
      return next(error);
    }

    const myNote = await Note.findById(id);
    if (!myNote) {
      const error = new Error("Note not found");
      error.status = 404;
      return next(error);
    }

    const note = await Note.findById(id);
    return res.status(200).json(note);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// Update a note
export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid note ID format");
      error.status = 400;
      return next(error);
    }

    const myNote = await Note.findById(id);
    if (!myNote) {
      const error = new Error("Note not found");
      error.status = 404;
      return next(error);
    }

    await Note.findByIdAndUpdate(id, req.body);
    const updatedNote = await Note.findById(id);
    return res.status(200).json(updatedNote);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// Delete a note
export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid note ID format");
      error.status = 400;
      return next(error);
    }

    const myNote = await Note.findById(id);
    if (!myNote) {
      const error = new Error("Note not found");
      error.status = 404;
      return next(error);
    }

    await Note.findByIdAndDelete(id);
    return res.status(200).json({ message: "The note has been deleted" });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
