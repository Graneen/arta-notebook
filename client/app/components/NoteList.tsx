import styles from '../styles/Home.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Note, selectNote } from '../../redux/features/notesSlice';

export default function NoteList() {
  const dispatch = useAppDispatch();
  const { notes, selectedNote } = useAppSelector(state => state.notes);

  function selectorHandler(note: Note) {
    dispatch(selectNote(note));
  }

  return (
    <>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div
              className={`${styles.note} ${note === selectedNote ? styles.selected : ''}`}
              onClick={() => selectorHandler(note)}
            >
              {note.text}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}