import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = (props) => {
    const [title, setTitle] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault();
        const body = { title };
        await axios.post('http://localhost:4000/posts', body);
        setTitle('');
    }

    return (
        <div className="PostCreate">
            <form onSubmit={submitHandler}>
                <div className="form-group" >
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" />
                </div>
                <button className="btn btn-primary" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default PostCreate;
