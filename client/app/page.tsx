"use client"

import Head from 'next/head';
import styles from '../app/styles/Home.module.css';
import { useEffect, useState } from 'react';
import React from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { getAllNotes } from './api';


export interface Note {
  id: number;
  text: string;
}

export default function Home() {

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [text, setText] = useState<string | undefined>();;
  const [toggle, setToggle] = useState(false);
  

  useEffect(() => {
    const fetchNotes = async () => {
        const data = await getAllNotes();
        setNotes(data.dataPosts);
    };
    fetchNotes();
}, [toggle]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Notes App</title>
        <meta name="description" content="A simple notes app built with Next.js and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <section className={styles.grid}>
          <div className={styles.card}>
            <NoteList notes={notes} setSelectedNote={setSelectedNote} setText={setText} toggle={toggle} setToggle={setToggle}/>
          </div>
          <div className={styles.card}>
            <NoteForm notes={notes} setNotes={setNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} text={text} setText={setText} toggle={toggle} setToggle={setToggle}/>
          </div>
        </section>
    </div>
  );
}