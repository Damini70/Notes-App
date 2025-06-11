import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface SubNote {
  id: string
  title: string
  content: string
  createdAt: Date
}

export interface Note {
  id: string
  title: string
  content: string
  subnotes: SubNote[]
  createdAt: Date
}

interface NotesState {
  notes: Note[]
}

const initialState: NotesState = {
  notes: [],
}

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ title: string; content: string }>) => {
      const { title, content } = action.payload
      if (title.trim()) {
        const newNote: Note = {
          id: Date.now().toString(),
          title,
          content,
          subnotes: [],
          createdAt: new Date(),
        }
        state.notes.unshift(newNote) // Add to beginning of array
      }
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },

    updateNote: (state, action: PayloadAction<{ id: string; update?: any }>) => {
      const { id, ...updates } = action.payload
      const noteIndex = state.notes.findIndex((note) => note.id === id)
      if (noteIndex !== -1) {
        state.notes[noteIndex] = { ...state.notes[noteIndex], ...updates }
      }
    },

    addSubnote: (state, action: PayloadAction<{ noteId: string; title: string; content: string }>) => {
      const { noteId, title, content } = action.payload
      if (title.trim()) {
        const noteIndex = state.notes.findIndex((note) => note.id === noteId)
        if (noteIndex !== -1) {
          const newSubnote: SubNote = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: new Date(),
          }
          state.notes[noteIndex].subnotes.push(newSubnote)
        }
      }
    },

    deleteSubnote: (state, action: PayloadAction<{ noteId: string; subnoteId: string }>) => {
      const { noteId, subnoteId } = action.payload
      const noteIndex = state.notes.findIndex((note) => note.id === noteId)
      if (noteIndex !== -1) {
        state.notes[noteIndex].subnotes = state.notes[noteIndex].subnotes.filter((subnote) => subnote.id !== subnoteId)
      }
    },

   updateSubnote: (
  state,
  action: PayloadAction<{
    noteId: string;
    subnoteId: string;
    update: Partial<SubNote>;
  }>
) => {
  const { noteId, subnoteId, update } = action.payload;

  const noteIndex = state.notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    const subnoteIndex = state.notes[noteIndex].subnotes.findIndex(
      (subnote) => subnote.id === subnoteId
    );

    if (subnoteIndex !== -1) {
      state.notes[noteIndex].subnotes[subnoteIndex] = {
        ...state.notes[noteIndex].subnotes[subnoteIndex],
        ...update, // ✅ Apply actual update fields
      };
    }
  }
}

  },
})

export const { addNote, deleteNote, updateNote, addSubnote, deleteSubnote, updateSubnote } = notesSlice.actions

export default notesSlice.reducer
