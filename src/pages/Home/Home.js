import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import Menu from '../../components/Menu/Menu'
import PostItem from '../../components/PostItem/PostItem'
import Loader from '../../components/Loader/Loader'
import './Home.css'

const Home = (props) => {
    const [posts, setPosts] = useState()

    const getAllPost = async () => {
        const response = await (await db.collection('posts').where('publish', '==', true).get()).docs.map(res => res.data())
        setPosts(response)
    }

    useEffect(() => {
        getAllPost()
    }, [])

    return (
        <>
            <Menu />
            {posts ? <div className="home">
                <div>
                    {posts.reverse().slice(0, 3).map((post, i) => (
                        <PostItem key={i} post={post} />
                    ))}
                </div>
                <h3>Populer</h3>
                <div className="popular">
                    {posts.sort((a, b) => a.view - b.view).reverse().slice(0, 5).map((post, i) => (
                        <div className="item" key={i} onClick={() => props.history.push(`/${post.url}`)}>
                            <img src="https://placeimg.com/30/30/tech" alt=""/>
                            <p>{post.title}</p>
                            <span>{post.category}</span>
                        </div>
                    ))}
                </div>
                <footer>Copyright &copy; 2020. <span>InfoWargaGarsel.com</span></footer>
            </div> : <Loader />}
        </>
    )
}

export default Home