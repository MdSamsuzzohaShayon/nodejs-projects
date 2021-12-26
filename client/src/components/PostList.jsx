import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        console.log(res.data);
        setPosts(res.data.posts);
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    // console.log(posts);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className='card' key={post.id}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <div className="card-text">
                    <CommentCreate postId={post.id} />
                    </div>
                    <CommentList comments={post.comments} />
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>)
    });

    return (
        <div className='PostList'>
            <div className="row row-cols-1 row-cols-md-3 g-4">{renderedPosts}</div>
        </div>
    )
}

export default PostList;
