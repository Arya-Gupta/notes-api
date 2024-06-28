import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema - noteSchema, Model - Note, Collection - notes, Database - Node-API
const noteSchema = new Schema(
  {
    user: { type: String, required: true },
    note: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
