import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hookc/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'

import './StickyEditor.css'
import ColorPicker from './ColorPicker';

export const StickyEditor = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [note, setNote] = useState({
        title: '', text: '', color: '#fff'
    })

    const handleNoteAdd = async event => {
        try {
            const data = await request('/api/notes', 'POST', { ...note }, {
                Authorization: `Bearer ${auth.token}`

            })
            window.location.reload()
            console.log(data)
            setNote({ title: '', text: '', color: '#fff' })
            


        }
        catch (e) { }
    }


    const changeHandler = event => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const handleColorChange = (color) => {
        setNote({ ...note, color });
    }
    return (
        <div className='NoteEditor'>
            <input
                type='text'
                className='NoteEditor__title'
                placeholder='Enter title'
                value={note.title}
                name="title"
                onChange={changeHandler}
            />

            <textarea
                placeholder='Enter note text'
                rows={5}
                className='NoteEditor__text'
                value={note.text}
                name="text"
                onChange={changeHandler}
            />
            <div className='NoteEditor__footer'>
                <ColorPicker
                    name='color'
                    value={note.color}
                    onChange={handleColorChange}
                />
                <button
                    className='NoteEditor__button'
                    disabled={!note.text}
                    onClick={handleNoteAdd}
                >
                    Add
                    </button>
            </div>
        </div>
    )
}
