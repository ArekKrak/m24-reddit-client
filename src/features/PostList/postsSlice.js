import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],  // array of post objects
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null     // error message or null
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action) {
            state.items = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { setPosts, setStatus, setError } = postsSlice.actions;
export default postsSlice.reducer;