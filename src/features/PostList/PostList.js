// The PostList component gets an array of posts, loops over them.
import './PostList.css';
import PostCard from "./PostCard";

export default function PostList({ posts }) {

	return (
		<section className="postlist-style">
			{posts.map((post) => (
				<PostCard 
					key={post.id} 
					post={post}
				/>
			))}
		</section>
	);
}