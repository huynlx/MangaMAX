import { createStore, AnyAction, Store } from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';


var defaultState = {
    source: 'nettruyen',
    name: 'NetTruyen',
    url: 'http://nettruyengo.com/',
    type: 'latest'
}
// create your reducer
const reducer = (state: any = defaultState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            const clientState = { ...state };
            const serverState = { ...action.payload };
            const nextState = { ...clientState, ...serverState };

            return nextState;
        case 'SOURCE':
            defaultState = { ...defaultState, ...action.payload }

            return { ...state, ...action.payload };
        default:
            return state;
    }
};

// create a makeStore function
let store: any;
const makeStore = (context: Context) => {
    store = createStore(reducer);
    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<any>>(makeStore, { debug: true });
export { store }