import {
    ADD_EXPENSE_SUCCESS,
    REMOVE_EXPENSE_SUCCESS,
    OFFLINE_EXPENSES_LOADED,
    CONNECTION_CHECKING,
    CONNECTION_CHECKED,
    CONNECTION_ONLINE,
    CONNECTION_OFFLINE
} from '../actions/expenses';

const initialState = {
    onlineList: [],
    offlineList: [],
    connectionChecked: false
};

export default function reducer(state = initialState, action) {
    let list;
    console.log(action);

    switch(action.type) {
        case ADD_EXPENSE_SUCCESS:
            list = state.onlineList.concat([action.expenseData]).sort((a,b) => b.date - a.date);
            return {
                ...state,
                onlineList: list,
                offlineList: list
            }

        case REMOVE_EXPENSE_SUCCESS:
            list = state.onlineList.slice(0);
            const index = list.map(i => i.id).indexOf(action.id);
            list.splice(index, 1);

            return {
                ...state,
                onlineList: list,
                offlineList: list
            }

        case OFFLINE_EXPENSES_LOADED:
            return {
                ...state,
                offlineList: action.expenses,
                offlineLoaded: true
            }

        case CONNECTION_CHECKING:
            return {
                ...state,
                connectionChecked: false
            }

        case CONNECTION_CHECKED:
            return {
                ...state,
                connectionChecked: true
            }

        case CONNECTION_ONLINE:
            return {
                ...state,
                connectionChecked: true,
                connected: true
            }

        case CONNECTION_OFFLINE:
            return {
                ...state,
                connectionChecked: true,
                connected: false
            }

        default:
            return state
    }
}
