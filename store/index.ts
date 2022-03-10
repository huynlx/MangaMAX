import { createStore, AnyAction, Store, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { WINDOW_SIZE } from '../shared/constants';

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
// reducer
const reducer = (state: any = defaultState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            const clientState = { ...state }; //state sau khi dispatch ở client, nếu ko thì luôn là defaultState
            const serverState = { ...action.payload.reducer }; //action.payload => previous state => khi vào ssr thì phải dispatch thì mới có (dispatch ở server), còn nếu ko dispatch thì nó cũng lại là defaultState

            const nextState = { ...clientState, ...serverState }; //state server ghi đè state client

            return nextState; //đây là state đồng bộ cho cả server và client (là initialState nằm trong response của request) (dispatch ở server thì mới đồng bộ đc còn dispatch ở client thì đéo)
        case 'SOURCE':

            return { ...state, ...action.payload }; //=> previous state sau khi dispatch ở ssr (dispatch ở server)
        default:

            return state;
    }
};

const defaultState2 = {
    windowSize: WINDOW_SIZE.all
}

const reducer2 = (state = defaultState2, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:

            return { ...state }
        case "WINDOW_RESIZE":

            return { ...state, ...action.payload }
        default:

            return state
    }
}

const defaultState3 = {
    scrollPosition: 0,
    indexChapters: true, //true:index or false:list
    keyword: null
}

const reducer3 = (state = defaultState3, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:

            return { ...state }
        case "SCROLL_POSITION":

            return { ...state, ...action.payload }
        default:

            return state
    }
}

var rootReducer = combineReducers({
    reducer,
    reducer2,
    reducer3
});

// create a makeStore function
let store: any;
const makeStore = () => {
    store = createStore(rootReducer, bindMiddleware([thunkMiddleware]));
    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<any>>(makeStore, { debug: true });
export { store }