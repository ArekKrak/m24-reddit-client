import React from 'react';
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

  return (
    <div className="App">
      <Header />
      <main className='layout'>
        <SubredditList subreddits={MOCK_SUBREDDITS} />
        <PostList posts={MOCK_POSTS} />
      </main>
    </div>
  );
}

export default App;
