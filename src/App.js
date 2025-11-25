import React from 'react';
import './App.css';
import Header from './features/Header/Header';
import SubredditList from './features/SubredditList/SubredditList';

function App() {
  const MOCK_SUBREDDITS = ['news', 'python', 'javascript', 'reactjs'];
  const MOCK_POSTS = [
    {
      id: '1',
      title: 'Breaking: The President of the Russian Federation, Vladimir Vladimirovich Putin backs US plan for ending Ukraine war as Trump gives Kyiv deadline to accept',
      author: 'Rorey Bosotti',
      subreddit: 'news',
      score: 155,
      noOfComments: 221
    },
    {
      id: '2',
      title: 'Python 3.15.0 alpha 2',
      author: 'Steve Dower',
      subreddit: 'python',
      score: 32,
      noOfComments: 7
    },
    {
      id: '3',
      title: 'Node.js 22.18 LTS',
      author: 'John Doe',
      subreddit: 'javascript',
      score: 50,
      noOfComments: 4
    },
    {
      id: '4',
      title: 'Records & Tuples for React',
      author: 'Sébastien Lorber',
      subreddit: 'reactjs',
      score: 39,
      noOfComments: 12
    },
  ];

  return (
    <div className="App">
      <Header />
      <main className='layout'>
        <SubredditList subreddits={MOCK_SUBREDDITS} />
        <div>Post list will go here</div>
      </main>
    </div>
  );
}

export default App;
