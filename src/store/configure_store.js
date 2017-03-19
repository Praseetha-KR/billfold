import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import { syncFirebase } from '../firebase';

export default function configureStore(initialState) {
    const store = createStore(reducer, applyMiddleware(thunk));
    syncFirebase(store);

    // if (module.hot) {
    //     module.hot.accept(() => {
    //         const nextRootReducer = require('../reducers/index').default;
    //         store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store;
}
