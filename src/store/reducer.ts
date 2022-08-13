import { SOURCES, WINDOW_SIZE } from "@/constants";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { combineReducers } from 'redux';
import { handleTypes } from "./types";

const defaultState = SOURCES[0];

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
  isLoading: null,
  layout: 1 //0 => simple layout, 1 => waterfall layout
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

      const newRecents = [...state.recents, ...action.payload.recents].reverse();

      if (newRecents.length > 200) {
        newRecents.length = 200
      }

      return {
        ...state,
        recents: newRecents.reverse()
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
    case handleTypes.LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case handleTypes.LAYOUT:
      return {
        ...state,
        layout: action.layout
      }
    case handleTypes.DEL_RECENTS:
      return {
        ...state,
        recents: []
      }
    case handleTypes.DEL_BOOKMARKS:
      return {
        ...state,
        bookmarks: []
      }
    default:

      return state
  }
}

const defaultState5 = {

}

//reducer 5
const reducer5 = (state = defaultState5, action: AnyAction) => {
  switch (action.type) {
    case handleTypes.FILTER_CHAPTER:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({ reducer, reducer2, reducer3, reducer4, reducer5 });

export { rootReducer };