import React, {useState} from 'react'
import {db} from '../../services/Firebase'
import styles from './Styles.module.css'

const CreateComment = (props) => {
    const [input, setInput] = useState()

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const createComment = () => {
        const data = {
            ...input,
            id: `${Date.now()}`,
            creationTime: new Date(),
            isReply: false
        }
        db.collection('comment').doc(data.id).set(data)

        const newData = props.post
        newData.comment.push(data.id)
        db.collection('posts').doc(props.post.id).set(newData)
        setInput()
    }

    return (
        <div className={styles.create}>
            <h3>Post your comment</h3>
            <input type="text" id="name" placeholder="Name" value={input?.name ?? ''} onChange={handleChange}/>
            <input type="email" id="email" placeholder="Email" value={input?.email ?? ''} onChange={handleChange}/>
            <textarea id="message" placeholder="Message" value={input?.message ?? ''} onChange={handleChange}/>
            <button onClick={input?.name && createComment}>Send</button>
        </div>
    )
}

export default CreateComment