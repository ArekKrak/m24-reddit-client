const BASE_URL = 'https://www.reddit.com';

export async function fetchSubredditPosts(subreddit) {
    const url = `${BASE_URL}/r/${subreddit}.json`;
}