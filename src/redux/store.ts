import { configureStore } from '@reduxjs/toolkit';

import LoginReducer from './login/LoginSlice';

export const store = configureStore({ reducer: { LoginReducer } });

export type RootState = ReturnType<typeof store.getState>;
