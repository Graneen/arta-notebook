
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchNotes, Note, selectNote } from '@/redux/features/notesSlice';

export default function Plans() {

  const dispatch = useAppDispatch();
  const { notes, isLoading, selectedNote } = useAppSelector(state => state.notes);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNote = currentPage * 5;
  const indexOfFirstNote = indexOfLastNote - 5;
  const currentNotes = notes?.slice(indexOfFirstNote, indexOfLastNote);

  useEffect(() => {
    if (!isLoading && !notes.length) {
      dispatch(fetchNotes());
    }
  }, [dispatch, isLoading, notes]);

  function selectorHandler(note: Note) {
    dispatch(selectNote(note));
  };

  return (
    <>
      <div>
        {currentNotes?.map((note) => (
          <div key={note.id}
            className={`${styles.note} ${note === selectedNote ? styles.selected : ''}`}
            onClick={() => selectorHandler(note)}>
            <div>
              {note.text}
            </div>
            <span>{note.createdAt.slice(0, 10)}</span>
          </div>
        ))}
      </div>
      {notes.length > 5 && (
        <div>
          {Array.from({ length: Math.ceil(notes.length / 5) }, (_, i) => (
            <button className={i + 1 === currentPage ? styles.button_paginate_active : styles.button_paginate} key={i + 1} onClick={() => setCurrentPage(i + 1)}> {i + 1} </button>
          ))}
        </div>
      )}
    </>
  );
}
