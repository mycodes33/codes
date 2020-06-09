import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import './Navbar.css'

const Navbar = (props) => {
    const [open, setOpen] = useState(false)
    const path = ['/admin', '/posts', '/category', '/comment', '/message']

    return (
        <>
            <nav>
                <i className="i-menu" onClick={() => setOpen(!open)}><span className={open ? 'open' : null}/></i>
                <p>{props.location.pathname.charAt(1).toUpperCase() + props.location.pathname.split('/')[1].substr(1)}</p>
                {!path.filter(e => e === props.location.pathname)[0] && <svg viewBox="0 0 1024 1024" onClick={() => props.history.goBack()}><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"/></svg>}
            </nav>
            {open && <Sidebar closeSidebar={() => setOpen(false)} />}
        </>
    )
}

export default withRouter(Navbar)