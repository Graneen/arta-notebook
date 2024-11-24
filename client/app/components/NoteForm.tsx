'use client';

import styles from '../styles/Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNote, removeNote, updNote, setText } from '../../redux/features/notesSlice';


export default function NoteForm() {
    const dispatch = useAppDispatch();
    const { selectedNote, text } = useAppSelector((state) => state.notes);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            if (text.split('').length <= 200 && 2 < text.split('').length) {
                if (selectedNote !== null) {
                    await dispatch(updNote({ id: selectedNote.id, text }));
                } else {
                    await dispatch(addNote(text));
                }
            } else {
                alert('Давай уложим длину текста в диапазон от 3 до 200 символов!');
            }
        } catch (error) {
            console.log('Ошибка при попытке добавить новую заметку', error);
        }
    }

    async function deleteHandler() {
        try {
            if (text === selectedNote?.text) {
                await dispatch(removeNote(Number(selectedNote.id)));
            }
        } catch (error) {
            console.log("Ошибка при попытке удалить заметку", error);
        }
    }

    return (
        <div className={styles.grid}>
            <form onSubmit={handleSubmit}>
                <textarea
                    className={styles.area}
                    rows="4"
                    cols="50"
                    value={text ?? ''}
                    onChange={(e) => dispatch(setText(e.target.value))}
                    placeholder="Текст заметки"
                ></textarea>
                <div className={styles.button_flex}>
                    <button className={styles.button} type="submit">Сохранить</button>
                    {selectedNote && (
                        <button className={styles.button} type="button" onClick={deleteHandler}>Удалить</button>
                    )}
                </div>
            </form>
        </div>
    );
}