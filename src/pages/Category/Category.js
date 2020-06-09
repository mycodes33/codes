import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import './Category.css'

const Category = () => {
    const [category, setCategory] = useState()
    const [input, setInput] = useState()

    const handleAdd = () => {
        const data = category.map(cat => cat.name)
        data.push(input)
        db.collection('config').doc('category').set({category: data})
        getCategory()
        setInput()
    }

    const handleDelete = (e) => {
        const data = category.map(cat => cat.name)
        data.splice(data.indexOf(e), 1)
        db.collection('config').doc('category').set({category: data})
        getCategory()
    }

    const getCategory = async () => {
        const resCategory = await (await db.collection('config').doc('category').get()).data().category
        const resPost = await (await db.collection('posts').get()).docs.map(res => res.data())
        const data = resCategory.map(cat => {
            const post = resPost.filter(pos => pos.category === cat)
            return {name: cat, post: post.length}
        })
        setCategory(data)
    }

    useEffect(() => {
        getCategory()
    }, [])

    return (
        <>
            <Navbar />
            {category ? <div className="category-list">
                <div className="add-category">
                    <input type="text" placeholder="New category" value={input ?? ''} onChange={e => setInput(e.target.value)}/>
                    <button onClick={input && handleAdd}>Add</button>
                </div>
                <h2>Category List</h2>
                {category.map((cat, i) => (
                    <div className="category-item" key={i}>
                        <h3>{cat.name}</h3>
                        <p>Post: {cat.post}</p>
                        <svg viewBox="0 0 1024 1024" onClick={() => handleDelete(cat.name)}><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"/></svg>
                    </div>
                ))}
            </div> : <Loader />}
        </>
    )
}

export default Category