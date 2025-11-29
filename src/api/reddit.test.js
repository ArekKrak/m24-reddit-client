import { fetchSubredditPosts } from "./reddit";

global.fetch = jest.fn();

/* Group all tests for this function with `describe` */
describe("fetchSubredditPosts", () => {
    /* make sure `fetch` starts clean before each test */
    beforeEach(() => {
        fetch.mockReset();
    });
    /* First test: does it call the correct URL? */
    it("calls Reddit API with the correct URL", async () => {
        /* Mock `fetch` to resolve to an object that looks just enough like a real response. It has `ok: true` and
        it has a `json` method that returns something in the Reddit shape: `{ data: { children: [] } }` */
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: { children: [] } }),
        });
        /* Call the function in question */
        await fetchSubredditPosts("reactjs");
        /* Check if `fetch` was called once and if the URL contains the subreddit name with `.json` at the end */
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://www.reddit.com/r/reactjs.json");
    });
});