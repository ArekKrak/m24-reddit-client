// The SubredditList component shows the sidebar "Subreddits" and the subreddit topics.

import './SubredditList.css';

export default function SubredditList({ subreddits }) {

    return (
        <aside className='sidebar-aside'>
            <h2>Subreddits</h2>
            <ul className='sidebar-ulist'>
                {subreddits.map((name) => (
                    <li className='sidebar-ulist-item' key={name}>r/{name}</li>
                ))}
            </ul>
        </aside>
    );
}