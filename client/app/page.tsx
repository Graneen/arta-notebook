"use client"

import Head from 'next/head';
import styles from '../app/styles/Home.module.css';
import NoteList from '../app/components/NoteList';
import NoteForm from '../app/components/NoteForm';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [text, setText] = useState<string | undefined>();;
  const [toggle, setToggle] = useState(false);



  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Notes App</title>
        <meta name="description" content="A simple notes app built with Next.js and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Notes App!</h1>

        <section className={styles.grid}>
          <div className={styles.card}>
            <NoteList />
          </div>
          <div className={styles.card}>
            <NoteForm />
          </div>
        </section>
      </main>
    </div>
  );
}