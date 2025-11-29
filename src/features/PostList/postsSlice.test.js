import postsReducer, { setPosts, setStatus, setError } from "./postsSlice";

describe("postsSlice", () => {
    /* When reducer is called with `undefined` state and an unknown action, it should return the initial state 
    (`items: [], status: "idle", error: null`) */
    it("returns the initial state when passed an undefined state", () => {
        const state = postsReducer(undefined, { type: "@@INIT" });

        expect(state).toEqual({
            items: [],
            status: "idle",
            error: null
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
});