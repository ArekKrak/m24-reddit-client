import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubredditPosts, fetchCommentsForPost } from "../../api/reddit";

const initialState = {
	items: [],  // array of post objects
	status: "idle", // "idle", "loading", "succeeded", "failed"
	error: null,     // error message or null
	currentSubreddit: null,
	comments: [], 	// comments for the selected post
	commentsStatus: "idle", // "idle", "loading", "succeeded", "failed"
	commentsError: null 	// error message for comments
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
		builder.addCase(fetchPostsForSubreddit.pending, (state, action) => {
			state.status = "loading";
			state.currentSubreddit = action.meta.arg;
		});
		/* Triggered when thunk finishes successfully and returns `posts` */
		builder.addCase(fetchPostsForSubreddit.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.items = action.payload;
			state.error = null;
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