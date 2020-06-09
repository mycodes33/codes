import React, {useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {auth} from '../../services/Firebase'
import {withRouter} from 'react-router-dom'
import './Sidebar.css'

const Sidebar = (props) => {
    const {authState} = useContext(AuthContext)

    const handleRoute = path => {
        props.history.push(path)
        props.closeSidebar()
    }

    const handleLogout = () => {
        auth.signOut()
        console.log('ok')
    }

    return (
        <div className="sidebar">
            <div>
                <img src="https://placeimg.com/100/100/people" alt=""/>
                <p>{authState && authState.username}</p>
            </div>
            <p onClick={() => handleRoute('/admin')}>Dashboard</p>
            <p onClick={() => handleRoute('/posts')}>Posts</p>
            <p onClick={() => handleRoute('/category')}>Category</p>
            <p onClick={() => handleRoute('/comment')}>Comment</p>
            <p onClick={() => handleRoute('/message')}>Message</p>
            <p onClick={handleLogout}>Logout</p>
        </div>
    )
}

export default withRouter(Sidebar)