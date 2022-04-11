import { createStore, AnyAction, Store, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { WINDOW_SIZE } from 'constants/index';
import { handleTypes } from 'store/action';

const bindMiddleware = (middleware: any) => applyMiddleware(...middleware);

export let defaultState = {
    source: '1',
    name: 'Server 1',
    url: 'http://www.nettruyenmoi.com/',
    type: 'latest'
}

// reducer
const reducer = (state: any = defaultState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            const clientState = { ...state }; //state after dispatch on client, otherwise it's always defaultState
            const serverState = { ...action.payload.reducer }; //action.payload => previous state => when go to ssr then must be dispatched it just has (dispatch on server), otherwise dispatch then it's also defaultState

            const nextState = { ...clientState, ...serverState }; //state server overwrite state client

            return nextState; //this is state that synced for either server and client (initialState in response of request) (only dispatch on server then can it be synchronized, but dispatch on client then can't)
        case handleTypes.SOURCE:

            return { ...state, ...action.payload }; //=> previous state after dispatch in ssr (dispatch on server)
        default:

            return state;
    }
};

const defaultState2 = {
    windowSize: WINDOW_SIZE.all
}

//reducer 2
const reducer2 = (state = defaultState2, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:

            return { ...state }
        case handleTypes.WINDOW_RESIZE:

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

//reducer 3
const reducer3 = (state = defaultState3, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:

            return { ...state }
        case handleTypes.SCROLL:

            return { ...state, ...action.payload }
        default:

            return state
    }
}

const defaultState4 = {
    recents: [],
    user: null,
    bookmarks: [],
    isLoading: null
}

//reducer 4
const reducer4 = (state = defaultState4, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:

            return { ...state }
        case handleTypes.RECENTS:
            const checkDuplicate = state.recents.findIndex((item: any) => item.slug === action.payload.recents[0].slug);
            if (checkDuplicate !== -1) {
                state.recents.splice(checkDuplicate, 1);
            }

            return {
                ...state,
                recents: [
                    ...state.recents,
                    ...action.payload.recents
                ]
            }
        case handleTypes.USER:
            return {
                ...state,
                user: action.user
            }
        case handleTypes.BOOKMARKS:
            return {
                ...state,
                bookmarks: [
                    ...action.bookmarks
                ]
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:

            return state
    }
}

var rootReducer = combineReducers({
    reducer,
    reducer2,
    reducer3,
    reducer4
});

// create a makeStore function
let store: any;
const makeStore = () => {
    store = createStore(rootReducer, bindMiddleware([thunkMiddleware]));
    return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: false });
export { store };
