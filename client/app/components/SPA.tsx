'use client'
import NoteForm from './NoteForm';
import Posts from './Posts';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import styles from '../../app/styles/Home.module.scss';

function SPA() {
    return (
        <>
            <Provider store={store}>
                <div className={styles.card}>
                    <Posts />
                </div>
                <div className={styles.card}>
                    <NoteForm />
                </div>
            </Provider>
        </>
    );
}

export default SPA;