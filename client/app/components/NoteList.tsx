import styles from '../styles/Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Note, selectNote } from '../../redux/features/notesSlice';
import { useState } from 'react';

export default function NoteList() {
  const dispatch = useAppDispatch();
  const { notes, selectedNote } = useAppSelector(state => state.notes);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNote = currentPage * 5;
  const indexOfFirstNote = indexOfLastNote - 5;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);


  function selectorHandler(note: Note) {
    dispatch(selectNote(note));
  };

  

  return (
    <>
      <ul>
        {currentNotes.map((note) => (
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
      {notes.length > 5 && (
        <div>
          {Array.from({ length: Math.ceil(notes.length / 5) }, (_, i) => (
            <button className={i + 1 === currentPage ? styles.button_paginate_active : styles.button_paginate } key={ i+1 } onClick={() => setCurrentPage( i+1 )}> { i+1 } </button>
          ))}
        </div>
      )}
    </>
  );
}