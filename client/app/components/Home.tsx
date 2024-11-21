import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import React from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchNotes, selectNote, setText } from '../../redux/features/notesSlice';



export default function Home() {
  const dispatch = useAppDispatch();
  const { notes, isLoading, text } = useAppSelector(state => state.notes);


  useEffect(() => {
    if (!isLoading && !notes.length) {
      dispatch(fetchNotes());
    }
  }, [dispatch, isLoading, notes]);

  function clickHandler(e: React.FormEvent<HTMLFormElement>) {
    if (e.target.id == '1') {
      dispatch(setText(''));
      dispatch(selectNote(null));
    }
  };

  return (
      <div id="1" className={styles.container} onClick={(e) => clickHandler(e)}>
        <Head>
          <title>Next.js Заметки</title>
          <meta name="description" content="Тестовое задание для компании Арта" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.grid}>
          <div className={styles.card}>
          <NoteList />
          </div>
          <div className={styles.card}>
          <NoteForm />
          </div>
        </div>
      </div>
  );
}