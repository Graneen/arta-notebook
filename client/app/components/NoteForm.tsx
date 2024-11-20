
import { createNote, deleteNote } from '../api';
import { Note } from '../page';


export default function NoteForm({ notes, setNotes, text, selectedNote, setSelectedNote, setText, toggle, setToggle }) {


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const newNote = await createNote(text);
            setText('');
            setNotes([...notes, newNote]);
            setToggle(!toggle);
        } catch (error) {
            console.error('Error while try to create new note:', error);
        }
    };

    async function deleteHandler(note: Note) {
        try {
            setNotes(notes.filter((item: Note) => item.id !== note.id));
            setText('');
            await deleteNote(note.id);
            setSelectedNote(null);
            setToggle(!toggle);
        } catch (error) {
            console.error('Error while try to delete note:', error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <textarea rows="4" cols="50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your note here..."
                ></textarea>
                <button type="submit">Save</button>
            </form>
            {selectedNote ? (
                <button onClick={() => deleteHandler(selectedNote)}>Delete</button>
            ) : (
                ''
            )}
        </>
    );
}