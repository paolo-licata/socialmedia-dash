import { useState } from "react";
import { addComment, likePost } from "../services/postServices";
import { jwtDecode } from "jwt-decode";
import "../styles/Post.css"

const Post = ({ post, onLike, token }) => {

    let currentUserId = null;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            currentUserId = decodedToken.id;
        } catch (error) {
            console.error("Error decoding token", error);
        }
    }

    const [ likes, setLikes ] = useState(post.likes.length);
    const [ isLiked, setIsLiked ] = useState(post.likes.includes(currentUserId));
    const [ comments, setComments ] = useState(post.comments || []);
    const [ newComment, setNewComment] = useState("");

    const handleLike = async () => {
        try {
            const response = await likePost(post._id, token);
            if (response) {
                setIsLiked(!isLiked);
                setLikes(response.likes);
            }
        } catch (error) {
            console.log("Error while liking/unliking post", error)
        }
    };

    const handleAddComment = async () => {
        if (!token) {
            console.error("User not authenticated");
            return;
          }

        if (newComment.trim() === "") return;

        const commentData = {
            text: newComment
        };

        const newCommentObj = {
            userId: { username: "You" },
            text: newComment
        };

        setComments([...comments, newCommentObj]); //Adds the new comment immediately
        setNewComment("");

        try {
            const updatedPost = await addComment(post._id, commentData, token);
            if (updatedPost.comments) {
                setComments(updatedPost.comments);
            }
        } catch (error) {
            console.error("Error while adding comment:", error.message)
        }
    }

    return (
        <div className="post">
            <h3>{post.userId.username}</h3>
            <p>{post.description}</p>

            {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}

            <div className="post-actions">
                <button className={isLiked ? "liked" : ""} onClick={handleLike}>
                    {isLiked ? "❤️" : "🤍"} {likes}
                </button>
            </div>

            {/* Comment section */}
            <div className="comments-section">
                <h4>Comments</h4>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.userId.username || "User"}</strong>: {comment.text}
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}

                {/* Add a comment */}
                <div className="add-comment">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(event) => setNewComment(event.target.value)}                    
                    />
                    <button onClick={handleAddComment} className="material-icons">&#xe163;</button>
                </div>
            </div>
        </div>
    )
}

export default Post;