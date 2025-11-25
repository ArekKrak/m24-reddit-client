// The PostCard component gets a single post and displays it nicely.
import './PostCard.css';

export default function PostCard({ post }) {

    return (
        <article className="postcard-article">
            <div>r/{post.subreddit} • Posted by u/{post.author}</div>
            <h3 className="postcard-heading">{post.title}</h3>
            <footer className="postcard-footer">{post.score} upvotes • {post.noOfComments} comments</footer>
        </article>
    );
}