import { useEffect } from 'react';
import { createNote, deleteNote, getAllNotes } from '../api';

interface Note {
    id: number;
    text: string;
}

export default function NoteList() {


    useEffect(() => {
        const fetchNotes = async () => {
            const data = await getAllNotes();
            setNotes(data.dataPosts);
        };
        fetchNotes();
    }, [toggle]);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const newNote = await createNote(text);
            setText('');
            setNotes(notes.filter(item => item.id !== newNote.id));
            setToggle(!toggle);
        } catch (error) {
            console.error('Error while try to create new note:', error);
        }
    };

    function selectorHandler(note: Note) {
        setText(note.text);
        setToggle(!toggle);
        setSelectedNote(note);
    };

    async function deleteHandler(note: Note) {
        try {
            await deleteNote(note.id);
            setSelectedNote(null);
            setToggle(!toggle);
            setNotes(notes.filter(item => item.id !== note.id));
        } catch (error) {
            console.error('Error while try to delete note:', error);
        }
    }

    return (
        <>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <span onClick={() => selectorHandler(note)}>
                            {note.text}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}