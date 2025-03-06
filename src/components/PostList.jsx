import { useEffect, useState } from "react";
import { getPosts } from "../services/postServices";
import Post from "./Post";

const PostList = () => {
    const [ posts, setPosts ] = useState([]);
    const token = localStorage.getItem("token");

    const handleLike = (postId) => {
        console.log("Liked post with id:", postId); 
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
    }, [])

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => <Post key={post._id} post={post} token={token} onLike={handleLike} />)
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    )
}

export default PostList;