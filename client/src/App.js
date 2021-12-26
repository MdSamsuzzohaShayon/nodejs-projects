import React from 'react';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

function App() {
    return (
        <div className='App container'>
            <PostCreate />
            <hr />
            <hr />
            <h2 className='h2'>Post List</h2>
            <PostList />
        </div>
    )
}

export default App;

