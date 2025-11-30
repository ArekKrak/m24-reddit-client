import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubredditPosts } from "../../api/reddit";

const initialState = {
    items: [],  // array of post objects
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,     // error message or null
    currentSubreddit: null
};
/* A thunk to postsSlice */
export const fetchPostsForSubreddit = createAsyncThunk(
    "posts/fetchPostsForSubreddit",
    async (subreddit, { rejectWithValue }) => {
        try {
            const posts = await fetchSubredditPosts(subreddit);
            return posts;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to load posts");
        }
    }
);

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
    },
    extraReducers: (builder) => {
        /* Triggered when the thunk is dispatched and it has just started */
        builder.addCase(fetchPostsForSubreddit.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        /* Triggered when thunk finishes successfully and returns `posts` */
        builder.addCase(fetchPostsForSubreddit.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        });
        /* Triggered when the thunk throws or calls `rejectWithValue` */
        builder.addCase(fetchPostsForSubreddit.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || action.error.message;
        });
    }
});

export const { setPosts, setStatus, setError } = postsSlice.actions;
export default postsSlice.reducer;