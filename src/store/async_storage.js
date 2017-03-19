import offline from 'react-native-simple-store';

export default function(store) {
    let currentExpenses;

    store.subscribe(() => {
        const { offlineLoaded, offlineList } = store.getState().expenses;

        if (offlineLoaded && currentExpenses != offlineList) {
            offline.save('expenses', offlineList);
            currentExpenses = offlineList;
        }
    })
}
