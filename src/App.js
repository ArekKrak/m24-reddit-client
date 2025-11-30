import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsForSubreddit } from './features/PostList/postsSlice';
import './App.css';
import Header from './features/Header/Header';
import SubredditList from './features/SubredditList/SubredditList';
import PostList from './features/PostList/PostList';

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
  /* Redux */
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const currentSubreddit = useSelector((state) => state.posts.currentSubreddit);
  const isLoading = status === "loading";
  /* If live Reddit is down, show demo data instead of a blank screen - a nice fallback behaviour */
  const postsToShow = error && posts.length === 0 ? MOCK_POSTS : posts;
  const [selectedPost, setSelectedPost] = useState(null);

  /* Below is the part that conencts the app to Reddit.
  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */
  useEffect(() => {
    dispatch(fetchPostsForSubreddit("news"));
  }, [dispatch]);

  /* Wire subreddit clicks to dispatch the thunk */
  function handleSubredditClick(name) {
    dispatch(fetchPostsForSubreddit(name));
  }
  /* Dispatch the thunk */
  function handleSearch(term) {
    dispatch(fetchPostsForSubreddit(term));
  }
  function handleRetry() {
    const target = currentSubreddit || "news";
    dispatch(fetchPostsForSubreddit(target));
  }
  /* User chose this post, remember it */
  function handlePostSelect(post) {
    setSelectedPost(post);
  }
  /* User closed the detail view, forget it */
  function handleClosePost(post) {
    setSelectedPost(null);
  }

  const isRateLimitError = error && error.includes("429");

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      {isLoading && (
        <div className='loading-indicator'>
          <div className='loading-spinner'/>
          <span>Loading posts from Reddit...</span>
        </div>
      )}
      {error && (
        <div className='error-banner'>
          <p>
            {isRateLimitError 
              ? "Reddit is rate limiting us right now (429). Please wait a moment and try again."
              : <>Couldn&apos;t load fresh data from Reddit ({error}). Showing cached example posts instead.</>
            }
          </p>
          <button className='retry-button' type='button' onClick={handleRetry} disabled={isLoading}>
            {isLoading ? "Retrying..." : "Retry"}
          </button>
        </div>
      )}
      <main className='layout'>
        <SubredditList subreddits={MOCK_SUBREDDITS} onSelectSubreddit={handleSubredditClick} />
        <PostList posts={postsToShow} onPostSelect={handlePostSelect} />
      </main>
    </div>
  );
}

export default App;