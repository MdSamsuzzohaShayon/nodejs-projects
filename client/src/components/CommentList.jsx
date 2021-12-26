import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CommentList = ({postId}) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        
        setComments(res.data.comments);
    }

    useEffect(() => {
        fetchComments();
    }, []);
    // console.log(comments);

    const renderComments = comments.map(comment => {
        return (
            <li className='list-group-item list-group-flush' key={comment.id}>
                {comment.content}
            </li>)
    });


    return (
        <ul className='CommentList list-group'>
            {renderComments}
        </ul>
    )
}

export default CommentList
