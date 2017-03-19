import { initializeApp } from 'firebase';
import { addExpenseSuccess, removeExpenseSuccess, goOnline, goOffline } from './actions/expenses';

import config from '../config';

const firebaseApp = initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    databaseURL: config.FIREBASE_DATABASE_URL,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID
});

export const expensesRef = firebaseApp.database().ref('expenses');
const connectedRef = firebaseApp.database().ref('.info/connected');

export function syncFirebase(store) {
    expensesRef.on('child_added', (snapshot) => {
        store.dispatch(addExpenseSuccess(snapshot.val()));
    });

    expensesRef.on('child_removed', (snapshot) => {
        store.dispatch(removeExpenseSuccess(snapshot.val().id));
    });

    connectedRef.on('value', snap => {
        if (snap.val() === true) {
            store.dispatch(goOnline());
        } else {
            store.dispatch(goOffline());
        }
    });
}
