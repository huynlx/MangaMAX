import { createStore, AnyAction, Store, applyMiddleware } from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';

const bindMiddleware = (middleware: any) => {
    // if (process.env.NODE_ENV !== 'production') {
    //     const { composeWithDevTools } = require('redux-devtools-extension')
    //     return composeWithDevTools(applyMiddleware(...middleware))
    // }
    return applyMiddleware(...middleware)
}

export let defaultState = {
    source: '1',
    name: 'Server 1',
    url: 'http://nettruyengo.com/',
    type: 'latest'
}
// create your reducer
const reducer = (state: any = defaultState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            const clientState = { ...state }; //luôn là defaultState
            const serverState = { ...action.payload }; //previous state => khi vào ssr thì phải dispatch thì mới có, còn nếu ko dispatch thì nó cũng lại là defaultState
            const nextState = { ...clientState, ...serverState };

            return nextState; //đây là state đồng bộ cho cả server và client (là initialState nằm trong response của request)
        case 'SOURCE':

            return { ...state, ...action.payload }; //=> previous state sau khi dispatch ở ssr
        default:
            return state;
    }
};

// create a makeStore function
let store: any;
const makeStore = () => {
    store = createStore(reducer, bindMiddleware([thunkMiddleware]));
    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<any>>(makeStore, { debug: true });
export { store }