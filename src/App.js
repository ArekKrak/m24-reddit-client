import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './features/Header/Header';
import SubredditList from './features/SubredditList/SubredditList';
import PostList from './features/PostList/PostList';
import { fetchSubredditPosts } from './api/reddit';

function App() {
  const MOCK_SUBREDDITS = ['news', 'python', 'javascript', 'reactjs'];
  const MOCK_POSTS = [
    {
      id: '1',
      title: 'HUGE news in my town\'s newspaper today',
      author: 'MadeMeSmile',
      subreddit: 'news',
      score: 231,
      noOfComments: 11
    },
    {
      id: '2',
      title: 'How I learned Python ',
      author: 'PythonLearning',
      subreddit: 'python',
      score: 99,
      noOfComments: 134
    },
    {
      id: '3',
      title: 'How much JavaScript is actually “enough”?',
      author: 'webdev',
      subreddit: 'javascript',
      score: 146,
      noOfComments: 103
    },
    {
      id: '4',
      title: 'Why use React over plain HTML and JavaScript',
      author: 'RennugunneR',
      subreddit: 'reactjs',
      score: 0,
      noOfComments: 29
    }
  ];

  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Below is the part that conencts the app to Reddit.
  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */
  useEffect(() => {
    /* The effect callback can't be itself `async`, so an inner async function is defined and called. */
    async function loadPosts() {
      /* 1. I tell the UI we're starting a fetch: turn loading "on" and clear any previous error message. */
      setIsLoading(true);
      setError(null);

      try {
        /* 2. Call the API helper to get real posts from /r/news. This may throw if the network fails or Reddit
        returns a bad status (e.g. rate limit 429) */
        const apiPosts = await fetchSubredditPosts('news');
        /* 3. If the request succeeds, replace the current posts (initially MOCK_POSTS) with the fresh posts from Reddit. */
        setPosts(apiPosts);
      } catch (err) {
        /* 4. If anything goes wrong (rate limit, network error, etc.), store the error message so we can show a friendly banner.
        We *don't* clear the posts here, so the UI can keep showing the mock/example posts as a fallback. */
        setError(err.message);
      } finally {
        /* 5. In both success and error cases, we're done loading. */
        setIsLoading(false);
      }
    }
    // Call the inner async function once when the component mounts.
    loadPosts();
  /* Empty dependency array: run this effect only once, on the initial render (like "componentDidMount" in class components). */
  }, []);

  return (
    <div className="App">
      <Header />
      {isLoading && <p>Loading posts from Reddit...</p>}
      {error && (
        <p className='error-banner'>
          Couldn&apos;t load fresh data from Reddit ({error}). Showing cached example posts instead.
        </p>
      )}
      <main className='layout'>
        <SubredditList subreddits={MOCK_SUBREDDITS} />
        <PostList posts={posts} />
      </main>
    </div>
  );
}

export default App;