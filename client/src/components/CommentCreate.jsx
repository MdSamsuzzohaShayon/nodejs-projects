import axios from 'axios';
import React, { useState } from 'react';


const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const body = { content };
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, body);

        setContent('');
    }

    return (
        <div className='CommentCreate alert alert-secondary'>
            <form onSubmit={submitHandler} >
                <div className="from-group">
                    <label htmlFor="" className="mb-2">New Comment</label>
                    <input value={content} type="text" onChange={e => setContent(e.target.value)} className="form-control mb-2" />
                </div>
                <button className="btn btn-primary" type='submit'>Add Comment</button>
            </form>
        </div>
    )
}

export default CommentCreate;
