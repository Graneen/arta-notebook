import styles from '../styles/Home.module.css';
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
        <div className={styles.grid}>
            <form onSubmit={handleSubmit}>
                <textarea className={styles.area} rows="4" cols="50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your note here..."
                ></textarea>
                <div className={styles.button_flex}>
                    {selectedNote ? (
                        <button className={styles.button} type="button" onClick={() => deleteHandler(selectedNote)}>Delete</button>
                    ) : (
                        ''
                    )}
                    <button className={styles.button} type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}