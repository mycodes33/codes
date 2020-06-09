import React from 'react'
import {withRouter} from 'react-router-dom'
import './PostItem.css'

const PostItem = (props) => {
    const handleDetail = () => {
        const path = props.post.url
        props.history.push(`/${path}`)
    }

    return (
        <div className="post-item">
            <h2>{props.post.title}</h2>
            <div className="body" dangerouslySetInnerHTML={{__html: props.post.body}}/>
            <button onClick={handleDetail}>More..</button>
        </div>
    )
}

export default withRouter(PostItem)