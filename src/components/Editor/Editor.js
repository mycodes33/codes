import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import './Editor.css'

const Editor = (props) => {
    const [category, setCategory] = useState()
    const [input, setInput] = useState()
    const [tag, setTag] = useState()

    const addTag = () => {
        const newTags = input?.tags ?? []
        newTags.push(tag)
        setInput({...input, tags: newTags})
        setTag('')
    }

    const removeTag = e => {
        const newTags = input.tags
        newTags.splice(input.tags.indexOf(e.target.textContent), 1)
        setInput({...input, tags: newTags})
    }

    const handleChange = e => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSave = () => {
        props.value(input)
    }

    const getCategory = async () => {
        const response = await (await db.collection('config').doc('category').get()).data().category
        setCategory(response)
    }

    useEffect(() => {
        getCategory()
        setInput(props.defaultValue)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="editor">
            <input type="text" id="title" value={input?.title ?? ''} placeholder="Title" onChange={handleChange}/>
            <textarea id="body" value={input?.body} placeholder="Text" spellCheck="false" onChange={handleChange}/>
            <select id="category" value={props.defaultValue?.category} onChange={handleChange}>
                {category?.map((cat, i) => (
                    <option key={i}>{cat}</option>
                ))}
            </select>
            <input id="tag-input" value={tag ?? ''} placeholder="#tag" onChange={e => setTag(e.target.value)}/>
            <button id="tag-btn" onClick={addTag}>Add</button>
            <div className="tags">
                {input?.tags?.map((tag, i) => (
                    <span key={i} onClick={removeTag}>{tag}</span>
                ))}
            </div>
            <label>Publish</label>
            <input type="checkbox" checked={input?.publish ?? true} onChange={() => setInput({...input, publish: (!input?.publish ?? !true)})}/>
            <button id="save" onClick={input?.title && handleSave}>Save</button>
        </div>
    )
}

export default Editor