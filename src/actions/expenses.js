import offline from 'react-native-simple-store';
import { expensesRef } from '../firebase';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const REMOVE_EXPENSE_SUCCESS = 'REMOVE_EXPENSE_SUCCESS';

export function addExpense(purpose, category, amount, date) {
    const id = Date.now();
    const expenseRef = expensesRef.child(id);

    expenseRef.set({
        id,
        purpose,
        category,
        amount: parseInt(amount),
        date: date || Date.now()
    });

    return {
        type: ADD_EXPENSE
    }
}

export function addExpenseSuccess(expenseData) {
    return {
        type: ADD_EXPENSE_SUCCESS,
        expenseData
    }
}

export function removeExpense(id) {
    expensesRef.child(id).remove();
    return {
        type: REMOVE_EXPENSE,
        id
    }
}

export function removeExpenseSuccess(id) {
    return {
        type: REMOVE_EXPENSE_SUCCESS,
        id
    }
}


export const OFFLINE_EXPENSES_LOADED = 'OFFLINE_EXPENSES_LOADED';
export const CONNECTION_CHECKING = 'CONNECTION_CHECKING';
export const CONNECTION_CHECKED = 'CONNECTION_CHECKED';
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE';
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE';

function offlineExpensesLoaded(expenses) {
    return {
        type: OFFLINE_EXPENSES_LOADED,
        expenses: expenses
    }
}

export function loadOfflineExpenses() {
    return dispatch => {
        offline.get('expenses').then(expenses => {
            dispatch(offlineExpensesLoaded(expenses || []));
        });
    }
}

export function checkConnection() {
    return dispatch => {
        dispatch({ type: CONNECTION_CHECKING });
        setTimeout(() => dispatch({ type: CONNECTION_CHECKED}), 5000);
    }
}

export function goOnline() {
    return {
        type: CONNECTION_ONLINE
    }
}

export function goOffline() {
    return {
        type: CONNECTION_OFFLINE
    }
}
