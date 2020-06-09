import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import './MessageDetail.css'

const MessageDetail = (props) => {
    const [message, setMessage] = useState()

    const getMessage = async () => {
        const id = props.match.params.id
        const response = await db.collection('message').doc(id).get()
        setMessage(response.data())
    }

    useEffect(() => {
        getMessage()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Navbar />
            {message ? <div className="message-detail">
                <h3>{message.email}</h3>
                <span>{message.sendTime.toDate().toString().split(' ').slice(0, 5).join(' ')}</span>
                <p>{message.text}</p>
            </div> : <Loader />}
        </>
    )
}

export default withRouter(MessageDetail)