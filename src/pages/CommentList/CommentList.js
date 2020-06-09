import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import styles from './CommentList.module.css'

const CommentList = () => {
    const [comment, setComment] = useState()
    console.log(comment)

    const getComment = async () => {
        const response = await (await db.collection('comment').get()).docs.map(res => res.data())
        setComment(response)
    }

    useEffect(() => {
        getComment()
    }, [])

    return (
        <>
            <Navbar />
            {comment ? <div className={styles.list}>
                {comment.map((comment, i) => (
                    <div className={styles.item} key={i}>
                        <h4>{comment.name}</h4>
                        <p>{comment.message}</p>
                        <p className={styles.time}>{comment.creationTime.toDate().toString().split(' ').slice(1, 4).join(' ')}</p>
                    </div>
                ))}
            </div> : <Loader />}
        </>
    )
}

export default CommentList