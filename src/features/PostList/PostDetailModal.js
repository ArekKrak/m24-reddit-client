export default function PostDetailModal({ post, onClose }) {
    
	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<h3>{post.title}</h3>
				<p>r/{post.subreddit} • u/{post.author}</p>
				<footer>
					{post.score} upvotes • {post.noOfComments} comments
				</footer>
				<button type="button" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
}