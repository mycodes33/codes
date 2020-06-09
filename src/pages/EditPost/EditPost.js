import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import Editor from '../../components/Editor/Editor'
import './EditPost.css'

const EditPost = (props) => {
    const {authState} = useContext(AuthContext)
    const [post, setPost] = useState()

    const getPost = async () => {
        const id = props.match.params.id
        const response = await (await db.collection('posts').doc(id).get()).data()
        setPost(response)
    }

    const editPost = value => {
        const data = {
            ...value,
            lastModifiedBy: authState.uid
        }
        db.collection('posts').doc(`${post.id}`).set(data)
        props.history.replace('/posts')
    }

    useEffect(() => {
        getPost()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Navbar />
            {post && <div className="edit-post">
                <Editor value={editPost} defaultValue={post} />
            </div>}
        </>
    )
}

export default withRouter(EditPost)