import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: number;
  title: string;
  content: string;
  text?: string;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  selectedNote: Note | null;
  text: string;
}

export const fetchNotes = createAsyncThunk<Note[]>(
  'notes/fetchNotes',
  async () => {
    try {
      const response = await fetch('/api/notes/all');
      if (!response.ok) {
        throw new Error('Ошибка при получении записей');
      }
      const data = await response.json();
      return data as Note[];
    } catch (error) {
      console.error('Ошибка при получении записей:', error);
      throw error;
    }
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (text: string) => {
    try {
      const response = await fetch('/api/notes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Ошибка при создании заметки');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      throw error;
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    isLoading: false,
    error: null,
    selectedNote: null,
    text: ''
  } as NotesState,
  reducers: {
    selectNote: (state, action: PayloadAction<Note | null>) => {
      state.selectedNote = action.payload;
      if (action.payload) {
        state.text = action.payload.text || '';
      } else {
        state.text = '';
      }
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      if (state.selectedNote?.id === action.payload) {
        state.selectedNote = null;
        state.text = '';
      }
    },
    updNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
        if (state.selectedNote?.id === action.payload.id) {
          state.selectedNote = action.payload;
          state.text = action.payload.text || '';
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.notes = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.text = '';
      })
    .addCase(createNote.rejected, (action) => {
        console.error('Ошибка при создании заметки:', action.error);
    });
  }
});

export const { selectNote, setText, addNote, removeNote, updNote } = notesSlice.actions;
export default notesSlice.reducer; 