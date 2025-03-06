import { useState } from "react";
import { addComment } from "../services/postServices";

const Post = ({ post, onLike, onDelete }) => {
    const [ likes, setLikes ] = useState(post.likes);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ comments, setComments ] = useState(post.comments || []);
    const [ newComment, setNewComment] = useState("");

    const handleLike = () => {
        setIsLiked(!isLiked);
        const newLikes = isLiked ? likes - 1 : likes + 1;
        setLikes(newLikes);
        onLike(post._id)
    };

    const handleAddComment = () => {
        if (newComment.trim() === "") return;

        const newCommentObject = {
            userId: "currentUserId",
            text: newComment,
            createdAt: new Date().toISOString()
        };

        setComments({...comments, newCommentObject});
        setNewComment("");
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
                {onDelete && (
                    <button className="delete-btn" onClick={() => onDelete(post._id)}>
                        Delete
                    </button>
                )}
            </div>

            {/* Comment section */}
            <div className="comments-section">
                <h4>Comments</h4>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.userId.name || "User"}</strong>: {comment.text}
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
                    <button onClick={handleAddComment}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Post;