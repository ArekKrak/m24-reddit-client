import React from 'react';
import './App.css';
import Header from './features/Header/Header';
import SubredditList from './features/SubredditList/SubredditList';

function App() {
  subredditsArray = ['news', 'python', 'javascript', 'reactjs'];

  return (
    <div className="App">
      <Header />
      <SubredditList subredditsArray={subredditsArray} />
    </div>
  );
}

export default App;
