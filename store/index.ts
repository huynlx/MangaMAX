import { createStore, AnyAction, Store, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { WINDOW_SIZE } from 'constants/index';
import { handleTypes } from './action';

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
            const clientState = { ...state }; //state sau khi dispatch ở client, nếu ko thì luôn là defaultState
            const serverState = { ...action.payload.reducer }; //action.payload => previous state => khi vào ssr thì phải dispatch thì mới có (dispatch ở server), còn nếu ko dispatch thì nó cũng lại là defaultState

            const nextState = { ...clientState, ...serverState }; //state server ghi đè state client

            return nextState; //đây là state đồng bộ cho cả server và client (là initialState nằm trong response của request) (dispatch ở server thì mới đồng bộ đc còn dispatch ở client thì đéo)
        case handleTypes.SOURCE:

            return { ...state, ...action.payload }; //=> previous state sau khi dispatch ở ssr (dispatch ở server)
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
    indexChapters: false, //true:index or false:list
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
    bookmarks: []
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
