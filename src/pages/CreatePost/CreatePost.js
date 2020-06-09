import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import Editor from '../../components/Editor/Editor'
import './CreatePost.css'

const CreatePost = (props) => {
    const {authState} = useContext(AuthContext)

    const createPost = value => {
        const data = {
            ...value,
            id: `${Date.now()}`,
            author: authState.uid,
            comment: [],
            creationTime: new Date(),
            tags: [],
            url: value.title.replace(' ', '-').toLowerCase(),
            view: 0
        }
        value.category ?? (data.category = 'Uncategory')
        value.publish === undefined && (data.publish = true)

        db.collection('posts').doc(`${data.id}`).set(data)
        props.history.replace('/posts')
    }

    return (
        <>
            <Navbar />
            <div className="create-post">
                <Editor value={createPost} />
            </div>
        </>
    )
}

export default withRouter(CreatePost)