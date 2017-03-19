import {
    ADD_EXPENSE_SUCCESS,
    REMOVE_EXPENSE_SUCCESS
} from '../actions/expenses';

const initialState = {
    onlineList: []
};

export default function reducer(state = initialState, action) {
    let list;
    console.log(action);

    switch(action.type) {
        case ADD_EXPENSE_SUCCESS:
            list = state.onlineList.concat([action.expenseData]).sort((a,b) => b.date - a.date);
            return {
                ...state,
                onlineList: list
            }

        case REMOVE_EXPENSE_SUCCESS:
            list = state.onlineList.slice(0);
            const index = list.map(i => i.id).indexOf(action.id);
            list.splice(index, 1);

            return {
                ...state,
                onlineList: list
            }

        default:
            return state
    }
}
