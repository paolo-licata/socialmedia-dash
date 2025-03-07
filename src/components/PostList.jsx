import { useEffect, useState } from "react";
import { getPosts, createPost } from "../services/postServices";
import Post from "./Post";
import "../styles/PostList.css"

const PostList = () => {
    const [ posts, setPosts ] = useState([]);
    const [ newPost, setNewPost] = useState({ description:"", imageUrl:""})
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    const handleLike = (postId) => {
        console.log("Liked post with id:", postId); 
    };

    const handleCreatePost = async (event) => {
        event.preventDefault();
        setError("");

        if (!newPost.description.trim()) {
            setError("Post description cannot be empty.");
            return;
        }

        try {
            const createdPost = await createPost(newPost, token);
            setPosts([createdPost, ...posts]);
            setNewPost({ description: "", imageUrl: "" }); // Reset form
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post. Please try again.");
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.log("Error fetching posts: ", error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div>
            {/* Post creation form */}
            <div className="create-post">
                <h3>Create a New Post</h3>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleCreatePost}>
                    <textarea 
                        placeholder="Say something about your post"
                        value={newPost.description}
                        onChange={(event) => setNewPost({ ...newPost, description: event.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL (optional)"
                        value={newPost.imageUrl}
                        onChange={(event) => setNewPost({ ...newPost, imageUrl: event.target.value })}
                    />
                    <button type="submit">Post</button>
                </form>
            </div>

            {/* Post list */}
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => <Post key={post._id} post={post} token={token} onLike={handleLike} />)
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    )
}

export default PostList;