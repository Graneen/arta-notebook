import { useState } from 'react';
import { createNote, updateNote } from '../api';

interface Note {
    id?: number;
    text: string;
}

export default function NoteForm({ noteToEdit }: { noteToEdit?: Note }) {

}

return (
    <>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your note here..."
            />
            <button type="submit">Save</button>
        </form>
        {selectedNote ? <button onClick={() => deleteHandler(selectedNote)}>
            Delete
        </button>
            :
            ''
        }
    </>
);
}