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
