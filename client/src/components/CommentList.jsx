import React from 'react';


const CommentList = ({comments}) => {
    // const [comments, setComments] = useState([]);

    // const fetchComments = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        
    //     setComments(res.data.comments);
    // }

    // useEffect(() => {
    //     fetchComments();
    // }, []);
    // // console.log(comments);

    const renderComments = comments.map(comment => {
        return (
            <li className='list-group-item list-group-flush' key={comment.id}>
                <p className="fw-bold">{comment.id}</p>
                <p>{comment.content}</p>
                
            </li>)
    });


    return (
        <ul className='CommentList list-group'>
            {renderComments}
        </ul>
    )
}

export default CommentList
