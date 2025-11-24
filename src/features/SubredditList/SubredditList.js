import './SubredditList.css';

export default function SubredditList({ subreddits }) {
    <aside>
        <h2>Subreddits</h2>
        <ul>
            {subreddits.map((name) => (
                <li key={name}>r/{name}</li>
            ))}
        </ul>
    </aside>
}