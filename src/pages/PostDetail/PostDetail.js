import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import Menu from '../../components/Menu/Menu'
import CommentItem from '../../components/CommentItem/CommentItem'
import CreateComment from '../../components/CreateComment/CreateComment'
import Loader from '../../components/Loader/Loader'
import './PostDetail.css'

const PostDetail = (props) => {
    const [post, setPost] = useState()
    const [comment, setComment] = useState()

    const getPost = async () => {
        const path = props.match.params.url
        const resPost = await (await db.collection('posts').where('url', '==', `${path}`).get()).docs[0].data()
        setPost(resPost)

        const resComment = await (await db.collection('comment').get()).docs.map(res => res.data())
        const dataComment = resComment.filter(res => resPost.comment.includes(res.id))
        setComment(dataComment)

        const data = resPost
        data.view += 1
        db.collection('posts').doc(resPost.id).set(data)
    }

    useEffect(() => {
        getPost()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Menu />
            {comment ? <div className="post-detail">
                <h2>{post.title}</h2>
                <p className="time">{post.creationTime.toDate().toString().split(' ').slice(0, 4).join(' ')}</p>
                <div className="body" dangerouslySetInnerHTML={{__html: post.body}}></div>
                <div className="tags">
                    {post.tags && post.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                    ))}
                </div>
                <div className="comment-list">
                    <h3>{comment.length} Comment</h3>
                    {comment.map((comment, i) => (
                        <CommentItem key={i} comment={comment} />
                    ))}
                </div>
                <CreateComment post={post} />
                <footer>Copyright &copy; 2020, <span>InfoWargaGarsel.com</span></footer>
            </div> : <Loader />}
        </>
    )
}

export default PostDetail