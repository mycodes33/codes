import React from 'react'
import styles from './Styles.module.css'

const CommentItem = (props) => {
    return (
        <div className={styles.item}>
            <img src="https://placeimg.com/100/100/people" alt=""/>
            <h4>{props.comment.name}</h4>
            <p>{props.comment.message}</p>
            <p className={styles.create}>{props.comment.creationTime.toDate().toString().split(' ').slice(1, 4).join(' ')}</p>
        </div>
    )
}

export default CommentItem