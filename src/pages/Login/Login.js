import React, {useState, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {auth} from '../../services/Firebase'
import './Login.css'

const Login = (props) => {
    const {authState} = useContext(AuthContext)
    const [input, setInput] = useState()
    const [error, setError] = useState()

    const handleChange = e => {
        setInput({...input, [e.target.type]: e.target.value})
    }

    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(input.email, input.password)
            authState && props.history.replace('/admin')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="login">
            <h1>Welcome</h1>
            <input type="email" placeholder="Email" value={input?.email ?? ''} onChange={handleChange}/>
            <input type="password" placeholder="Password" value={input?.password ?? ''} onChange={handleChange}/>
            <p>{error}</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login