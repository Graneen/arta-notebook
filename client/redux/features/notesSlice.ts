import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllNotes, createNote, deleteNote } from '../../app/api'; 


export interface Note {
  id: number;
  text: string;
}

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  text: string | undefined;
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
  'notes/fetch',
  async () => {
    const response = await getAllNotes();
    return response.dataPosts;
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
      state.error = action.error.message || 'Что-то не так...';
      state.isLoading = false;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
      state.selectedNote = action.payload;
      state.text = '';
    });
    builder.addCase(removeNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.selectedNote = null;
      state.text = '';
    });
    builder.addCase(selectNote(undefined), (state, action) => {
      state.selectedNote = action.payload;
      state.text = action.payload?.text;
    });
  },
});

export const { setText } = notesSlice.actions;
export const selectNote = (note: Note) => ({
  type: 'notes/selectNote',
  payload: note,
});

export default notesSlice.reducer;