// The PostList component gets an array of posts, loops over them.
import './PostCard';

export default function PostList({ posts }) {

    return (
        <section className="postlist-style">
            {posts.map((post) => (
                <PostCard className='postlist-card' key={post.id} post={post}/>
            ))}
        </section>
    );
}