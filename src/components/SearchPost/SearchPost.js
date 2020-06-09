import React, {useState} from 'react'
import {db} from '../../services/Firebase'
import './SearchPost.css'

const SearchPost = () => {
    const [query, setQuery] = useState()
    const [posts, setPosts] = useState()

    const getSearch = async () => {
        const response = await (await db.collection('posts').get()).docs.map(res => res.data())
        const data = response.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
        setPosts(data)
        console.log('Get search')
    }

    return (
        <>
            <div className="search-post">
                <input type="text" value={query ?? ''} placeholder="Search" onChange={e => setQuery(e.target.value)}/>
                <svg viewBox="0 0 515.558 515.558" onClick={query && getSearch}><path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"/></svg>
            </div>
            {posts && <div className="search-result">
                <h4>Result</h4>
                {posts.length > 0 ? posts.map((post, i) => (
                    <div className="search-item" key={i}>
                        <h3>{post.title}</h3>
                        <div dangerouslySetInnerHTML={{__html: post.body}}/>
                    </div>
                )) : <span>Tidak ada post</span>}
            </div>}
        </>
    )
}

export default SearchPost