import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { appReducer } from "./appReducer";
import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./profileReducer";
import { postsReducer } from "./postsReducer";

const rootReducer = combineReducers({
	app: appReducer,
	profile: profileReducer,
	posts: postsReducer

});

export const store = configureStore({
	reducer: rootReducer,
	middleware:  (getDefaultMiddleware) =>
	getDefaultMiddleware()
		.prepend(thunk, logger)});

export type AppStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch