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
        expect(fetch).toHaveBeenCalledWith("https://api.reddit.com/r/reactjs.json");
    });
    it("returns an array of posts objects from the reddit response", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    children: [
                        { data: { id: "post1", title: "First", author: "katie" } },
                        { data: { id: "post2", title: "Second", author: "mike" } },
                    ]
                }
            })
        });
        const posts = await fetchSubredditPosts("reactjs");
        /* An expectation to check the length */
        expect(posts).toHaveLength(2);
        /* Another one to check the actual contents */
        expect(posts[0]).toEqual({ id: "post1", title: "First", author: "katie" })
    });
    /* Test non-OK response should throw */
    it("throws an error when Reddit responds with a non-OK status", async () => {
        /* Mock `fetch` to resolve with a bad status */
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
            json: async () => ({
                data: {
                    children: [
                        { data: { id: "post1", title: "First", author: "katie" } },
                        { data: { id: "post2", title: "Second", author: "mike" } },
                    ]
                }
            })
        })
        await expect(fetchSubredditPosts("reactjs")).rejects.toThrow("Reddit API error: 500 Internal Server Error");
    });
});