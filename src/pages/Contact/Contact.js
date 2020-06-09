import React, {useState} from 'react'
import {db} from '../../services/Firebase'
import Menu from '../../components/Menu/Menu'
import './Contact.css'

const Contact = () => {
    const [input, setInput] = useState()

    const handleChange = e => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSend = () => {
        const data = {
            ...input,
            id: `${Date.now()}`,
            read: [],
            sendTime: new Date()
        }
        db.collection('message').doc(`${data.id}`).set(data)
        alert("Pesan berhasil dikirim")
    }

    return (
        <>
            <Menu />
            <div className="contact">
                <div className="form">
                    <input type="email" id="email" placeholder="example@email.com" onChange={handleChange}/>
                    <textarea id="text" placeholder="Mesage" onChange={handleChange}/>
                    <button onClick={input?.email && handleSend}>Send</button>
                </div>
                <footer>Copyright &copy; 2020. <span>InfoWargaGarsel.com</span></footer>
            </div>
        </>
    )
}

export default Contact