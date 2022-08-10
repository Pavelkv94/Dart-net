import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const rootReducer = combineReducers({
    // categories: categoriesReducer,
	// posts: postsReducer,
	// filter: filterReducer,
	// app: appReducer

});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type AppStateType = ReturnType<typeof rootReducer>