import React from 'react';
import './App.css';
import Header from './features/Header/Header';
import SubredditList from './features/SubredditList/SubredditList';

function App() {
  const MOCK_SUBREDDITS = ['news', 'python', 'javascript', 'reactjs'];

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
