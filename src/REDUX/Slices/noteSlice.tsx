import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Note = {
  title: string;
  content: string;
  date: string;
};

type NotesState = {
  notes: Note[];
};

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.date !== action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const editedNote = state.notes.findIndex(
        (note) => note.date === action.payload.date
      );
      if (editedNote !== -1) {
        state.notes[editedNote] = action.payload;
      }
    },
  },
});

export const { addNote, deleteNote, editNote } = notesSlice.actions;

export default notesSlice.reducer;
