import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/PostList/postsSlice";

/* Temporary reducer, it just returns whatever state it gets. */
const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});
