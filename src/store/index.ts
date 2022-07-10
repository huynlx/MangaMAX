import { createStore, Store, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from '@/store/reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';

const bindMiddleware = (middleware: any) => composeWithDevTools(applyMiddleware(...middleware));

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

var store: any;
var persistor: any;

const makeStore = () => {
    store = createStore(persistedReducer, bindMiddleware([thunkMiddleware]));
    persistor = persistStore(store);

    return store;
};

const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: false });

export { store, persistor, wrapper };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



