import { configureStore } from '@reduxjs/toolkit';

/* Temporary reducer, it just returns whatever state it gets. */
const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: dummyReducer
});
