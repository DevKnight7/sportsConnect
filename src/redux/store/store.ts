import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {socket} from '../../utils/socket'
import { useDispatch } from 'react-redux'
import showNotification, { parseRTKErrors, showAllNotifications } from '../../helpers/notificationHelper';

import { baseApi } from '../../features/baseApi';

import authReducer, { signOutSuccess } from '../slices/authSlice';
import alertReducer from '../slices/alertSlice';

export const rtkQueryErrorLogger: Middleware = ({ getState }) => (next) => (action) => {
  
  let isLoggedIn = getState().authReducer.isLoggedIn
  
  
  if (isRejectedWithValue(action) && isLoggedIn) {
    showAllNotifications(parseRTKErrors(action.payload), 'error');
  }

  return next(action);
};

export const logoutOn401: Middleware = ({ getState }) => (next) => (action) => {
  let isLoggedIn = getState().authReducer.isLoggedIn
  if (isRejectedWithValue(action) && action.payload?.status === 401 && isLoggedIn) {
    socket.logoutAction();
    showNotification("Your Session has been expired.", 'info');
    return next(signOutSuccess());
  }
  return next(action);
};

const reducers = combineReducers({
  authReducer,
  alertReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer', 'alertReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat(baseApi.middleware, logoutOn401, rtkQueryErrorLogger),
});

export default store;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

