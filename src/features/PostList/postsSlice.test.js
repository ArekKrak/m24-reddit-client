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
});