import React, { useState, useContext, useCallback } from 'react'
import { useHttp } from '../../hookc/http.hook';

import Masonry from 'react-masonry-component';
import './NoteList.css'
import axios from 'axios';

 

export const NoteList = ({ notes }) => {
    const { request } = useHttp()
    if (!notes.length) {
        return <p className="center">Ссылок пока нет</p>
    }

    console.log(notes)

    const masonryOptions = {
        itemSelector: '.Note',
        columnWidth: 250,
        gutter: 10,
        isFitWidth: true
    };

    const deleteNote= (id) => {
        axios.delete('http://localhost:3000/api/notes/'+id)
      .then(response => { console.log(response.data)});
      window.location.reload()
    }


    return (
        <Masonry
            className='NoteList'
            options={masonryOptions}
        >
            {
                notes.map((note) => {
                    return (
                        <div className='Note' style={{ backgroundColor: `${note.color}` }}>
                            <span className='Note__del-icon' onClick={() => deleteNote(note._id)} > × </span>
                            {
                                note.title
                                    ?
                                    <h4 className='Note__title'>{note.title}</h4>
                                    :
                                    null
                            }
                            <div className='Note__text'>{note.text}</div>
                        </div>

                    )


                }

                )
            }
        </Masonry>
    )
    
}
