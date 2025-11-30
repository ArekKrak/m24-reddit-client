import React, { useEffect } from "react";	// `useEffect` to run the code when the modal opens
import { useDispatch, useSelector } from "react-redux";		// `useDispatch` to dispatch the comments thunk and `useSelector` to read comments state from Redux
import { fetchCommentsForPostThunk } from "./postsSlice";

export default function PostDetailModal({ post, onClose }) {
	/* Trigger the thunk */
	const dispatch = useDispatch();

	/* Read comments info from Redux */
	const comments = useSelector((state) => state.posts.comments);
	const commentsStatus = useSelector((state) => state.posts.commentsStatus);
	const commentsError = useSelector((state) => state.posts.commentsError);

	/* When the modal opens (or the post changes) fetch its comments */
	useEffect(() => {
		if (!post) return;		// safety: do nothing if post is missing
		dispatch(fetchCommentsForPostThunk(post.id));
	}, [dispatch, post]);

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<h3>{post.title}</h3>
				<p>r/{post.subreddit} • u/{post.author}</p>
				<footer>
					{post.score} upvotes • {post.noOfComments} comments
				</footer>
				{/* Comments section */}
				<div>
					<h4>Comments</h4>
					{/* Loading state */}
					{commentsStatus === "loading" && <p>Loading comments...</p>}
					{/* Error state */}
					{commentsStatus === "failed" && <p>Couldn&apos;t load comments: {commentsError}</p>}
					{/* Loaded but empty */}
					{commentsStatus === "succeeded" && comments.length === 0 && (<p>No comments to display.</p>)}
					{/* Loaded with some comments */}
					{commentsStatus === "succeeded" && comments.length > 0 && (
						<ul>
							{comments.map((comment) => (
								<li key={comment.id}>
									{/* the text of the body */}
									<p>{comment.body}</p>
									<small>u/{comment.author}</small>
								</li>
							))}
						</ul>
					)}
				</div>
				<button type="button" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
}