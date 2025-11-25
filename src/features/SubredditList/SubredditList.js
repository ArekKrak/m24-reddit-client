import './SubredditList.css';

export default function SubredditList({ subreddits }) {
    <aside className='sidebar-aside'>
        <h2>Subreddits</h2>
        <ul className='sidebar-ulist'>
            {subreddits.map((name) => (
                <li key={name}>r/{name}</li>
            ))}
        </ul>
    </aside>
}