'use client'
import NoteForm from './NoteForm';
import Posts from './Posts';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import styles from '../../app/styles/Home.module.scss';

function SPA() {
    return (
        <>
            <div className={styles.card}>
                <Provider store={store}>
                    <Posts />
                </Provider>
            </div>
            <div className={styles.card}>
                <Provider store={store}>
                    <NoteForm />
                </Provider>
            </div>
        </>
    );
}

export default SPA;