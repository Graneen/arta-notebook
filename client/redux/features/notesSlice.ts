import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllNotes, createNote, updateNote, deleteNote } from '../../app/api/api'; 


export interface Note {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  text: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  text: '',
  isLoading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  'notes/all',
  async () => {
    const response = await getAllNotes();
    return response;
  }
);

export const addNote = createAsyncThunk(
  'notes/add',
  async (text: string) => {
    const response = await createNote(text);
    return response;
  }
);

export const removeNote = createAsyncThunk(
  'notes/delete',
  async (id: number) => {
    const res = await deleteNote(id);
    return Number(res);
  }
);

export const updNote = createAsyncThunk(
  'notes/update/:id',
  async ({ id, text }: { id: number, text: string }) => {
    const response = await updateNote(id, text);
    return response;
  }
);
export const selectNote = (note: Note) => ({
  type: 'notes/selectNote',
  payload: note,
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.error = action.error.message || 'Что-то не так в слайсе...';
      state.isLoading = false;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
      state.selectedNote = null;
      state.text = '';
    });
    builder.addCase(removeNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.selectedNote = null;
      state.text = '';
    });
    builder.addCase(selectNote(null), (state, action) => {
      state.selectedNote = action.payload;
      state.text = action.payload.text;
    });
    builder.addCase(updNote.fulfilled, (state, action) => {
      const existingIndex = state.notes.findIndex((note) => note.id === action.payload.id);
      if (existingIndex >= 0) {
        state.notes[existingIndex] = action.payload;
        state.selectedNote = null;
        state.text = '';
      }
    });
  },
});

export const { setText } = notesSlice.actions;

export default notesSlice.reducer;