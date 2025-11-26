const BASE_URL = 'https://www.reddit.com';

export async function fetchSubredditPosts(subreddit) {
    const url = `${BASE_URL}/r/${subreddit}.json`;
    /* fetch(url) - starts an HTTP request and returns a Promise.
       await - pauses this async function until the response arrives. */
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status} ${response.statusText}`);
    }
}