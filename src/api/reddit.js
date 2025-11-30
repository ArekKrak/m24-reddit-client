/* Data flow:
Build URL > `fetch` it > throw an `Error` if status is bad > parse JSON > extract `children[].data` > return array of posts. */

const BASE_URL = 'https://api.reddit.com';

export async function fetchSubredditPosts(subreddit) {
  const url = `${BASE_URL}/r/${subreddit}.json`;
  /* fetch(url) - starts an HTTP request and returns a Promise.
      await - pauses this async function until the response arrives. */
  const response = await fetch(url);
  /* `if` block to check if Reddit responded with something not OK.
      `response.ok` is `true` for status 200-299; if it's false, an Error is thrown. */
  if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status} ${response.statusText}`);
  }
  /* The flow is:
      - I'm sure the status is OK.
      - Now I parse the body as JSON. */
  const json = await response.json();
  /* Extract the posts from Reddit's shape
      Reddit's JSON looks like this:
      {
        "data": {
          "children": [
            { "data": { post_1 } },
            { "data": { post_2 } }
          ]
        }
      }
      
      `json.data.children` → an array of wrappers
      For each `child`, take `child.data` */
  const posts = json.data.children.map((child) => child.data); /* - maps to `posts` */
  return posts;
}