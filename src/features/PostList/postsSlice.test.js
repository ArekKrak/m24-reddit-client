import postsReducer, { setPosts, setStatus, setError, fetchPostsForSubreddit } from "./postsSlice";

describe("postsSlice", () => {
    /* When reducer is called with `undefined` state and an unknown action, it should return the initial state 
    (`items: [], status: "idle", error: null`) */
    it("returns the initial state when passed an undefined state", () => {
        const state = postsReducer(undefined, { type: "@@INIT" });

        expect(state).toEqual({
            items: [],
            status: "idle",
            error: null,
            currentSubreddit: null
        });
    });
    /* Given some previous state and an array of posts, `setPosts` should replace `items` with that array */
    it("sets items when setPosts is dispatched", () => {
        const previousState = {
            items: [],
            status: "idle",
            error: null
        };
        /* Mock posts */
        const mockPosts = [
            { id: "post1", title: "First", author: "katie" },
            { id: "post2", title: "Second", author: "mike" }
        ];
        /* Call the reducer */
        const state = postsReducer(previousState, setPosts(mockPosts));

        expect(state.items).toEqual(mockPosts);
        expect(state.status).toBe("idle");
        expect(state.error).toBeNull();
    });
    it("sets status when setStatus is dispatched", () => {
        const previousState = {
            items: [],
            status: "idle",
            error: null
        };
        /* Call the reducer */
        const state = postsReducer(previousState, setStatus("loading"));

        expect(state.items).toEqual([]);
        expect(state.status).toBe("loading");
        expect(state.error).toBeNull();
    });
    it("sets error message when setError is dispatched", () => {
        const previousState = {
            items: [],
            status: "idle",
            error: null
        };
        /* Call the reducer */
        const state = postsReducer(previousState, setError("Something went wrong"));

        expect(state.items).toEqual([]);
        expect(state.status).toBe("idle");
        expect(state.error).toBe("Something went wrong");
    });

    /* How the reducer reacts to the thunk's `pending` action; how it reacts to the `fulfilled` action; 
    how it reacts to the `rejected` action */
    it("reacts to the pending action", () => {
        const previousState = {
            items: [],
            status: "idle",
            error: "Previous error"
        };
        /* Call the reducer */
        const action = { type: fetchPostsForSubreddit.pending.type, meta: { arg: "reactjs" } };
        const state = postsReducer(previousState, action);

        expect(state.items).toEqual(previousState.items);
        expect(state.status).toBe("loading");
        expect(state.error).toBeNull();
        expect(state.currentSubreddit).toBe("reactjs");
    });
    it("reacts to the fulfilled action", () => {
        const previousState = {
            items: [],
            status: "loading",
            error: null
        };
        /* Mock posts */
        const mockPosts = [
            { id: "post1", title: "First", author: "katie" },
            { id: "post2", title: "Second", author: "mike" }
        ];
        /* Call the reducer */
        const action = { type: fetchPostsForSubreddit.fulfilled.type, payload: mockPosts };
        const state = postsReducer(previousState, action);

        expect(state.items).toEqual(mockPosts);
        expect(state.status).toBe("succeeded");
        expect(state.error).toBeNull();
    });
    it("reacts to the rejected action", () => {
        const previousState = {
            items: [],
            status: "loading",
            error: null
        };
        /* Call the reducer */
        const action = { type: fetchPostsForSubreddit.rejected.type, payload: "Network error" };
        const state = postsReducer(previousState, action);

        expect(state.items).toEqual(previousState.items);
        expect(state.status).toBe("failed");
        expect(state.error).toBe("Network error");
    });
});