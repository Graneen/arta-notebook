import { Note } from '../page';
import styles from '../styles/Home.module.css';

export default function NoteList({ notes, setSelectedNote, setText, toggle, setToggle }) {


    function selectorHandler(note: Note) {
        setText(note.text);
        setToggle(!toggle);
        setSelectedNote(note);
    };

    return (
        <>
            <ul>
                {notes.map((note: Note) => (
                    <li key={note.id}>
                            <div className={styles.note} onClick={() => selectorHandler(note)} >
                                {note.text}
                            </div>
                    </li>
                ))}
            </ul>
        </>
    );
}