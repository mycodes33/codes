import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import './MessageList.css'

const MessageList = (props) => {
    const {authState} = useContext(AuthContext)
    const [message, setMessage] = useState()

    const handleDetail = id => {
        const data = message.filter(mes => mes.id === id)[0]
        !data.read.filter(rd => rd === authState.uid)[0] && data.read.push(authState.uid)
        db.collection('message').doc(id).set(data)
        props.history.push(`/message/${id}`)
    }

    const getMessage = async () => {
        const response = await (await db.collection('message').get()).docs.map(res => res.data())
        setMessage(response)
    }

    useEffect(() => {
        getMessage()
    }, [])

    return (
        <>
            <Navbar />
            {message ? <div className="message-list">
                {message.reverse().map((mes, i) => (
                    <div key={i} onClick={() => handleDetail(mes.id)}>
                        <h4 className={mes.read.filter(rd => rd === authState.uid)[0] ? "read" : null}>{mes.text}</h4>
                        <p>{mes.email}</p>
                        <span>{mes.sendTime.toDate().toString().split(' ').slice(0, 5).join(' ')}</span>
                    </div>
                ))}
            </div> : <Loader />}
        </>
    )
}

export default withRouter(MessageList)