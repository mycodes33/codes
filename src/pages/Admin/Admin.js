import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import './Admin.css'

const Admin = () => {
    const [data, setData] = useState()

    const getData = async () => {
        const resAdmin = await (await db.collection('admin').get()).docs.map(res => res.data())
        const resPosts = await (await db.collection('posts').get()).docs.map(res => res.data())
        const resMessage = await (await db.collection('message').get()).docs.map(res => res.data())

        const dataAdmin = resAdmin.map(adm => {
            const post = resPosts.filter(p => p.author === adm.uid)
            return {...adm, post: post.length}
        })
        setData({admin: dataAdmin, posts: resPosts, message: resMessage})
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Navbar />
            {data ? <div className="admin-page">
                <h2>Admin</h2>
                <div className="admin">
                    {data.admin.map((adm, i) => (
                        <div className="admin-item" key={i}>
                            <img src="https://placeimg.com/100/100/people" alt=""/>
                            <h3>{adm.username}</h3>
                            <p>{adm.email}</p>
                            <span>{adm.post} Post</span>
                        </div>
                    ))}
                </div>
                <h2>Post</h2>
                <div className="card-list">
                    <div className="card">
                        <svg viewBox="0 0 1024 1024"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"/></svg>
                        <h3>Posts</h3>
                        <span>{data.posts.length}</span>
                    </div>
                    <div className="card">
                        <svg viewBox="0 0 1024 1024"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"/></svg>
                        <h3>Message</h3>
                        <span>{data.message.length}</span>
                    </div>
                </div>
            </div> : <Loader />}
        </>
    )
}

export default Admin