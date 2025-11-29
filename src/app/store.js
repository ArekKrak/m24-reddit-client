import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/PostList/postsSlice";

const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});
