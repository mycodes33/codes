import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import PostSum from '../../components/PostSum/PostSum'
import Loader from '../../components/Loader/Loader'
import './PostList.css'

const Posts = (props) => {
    const [posts, setPosts] = useState()

    const getPosts = async () => {
        const response = await db.collection('posts').get()
        const data = response.docs.map(item => item.data())
        setPosts(data)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <Navbar />
            {posts ? <div className="post-list">
                <button onClick={() => props.history.push('/create')}>Create +</button>
                <div>
                    {posts.reverse().map((post, i) => (
                        <PostSum key={i} post={post} refresh={getPosts} />
                    ))}
                </div>
            </div> : <Loader />}
        </>
    )
}

export default withRouter(Posts)