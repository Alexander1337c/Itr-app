import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../../hookc/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { Loader } from '../Loader'
import {NoteList} from '../Note/NotesList'


export const StickyGrid = () => {
    const [notes, setNotes] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchNotes = useCallback(async () => {
        try {
            const fetched = await request('/api/notes', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setNotes(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchNotes()
      }, [fetchNotes])
    
      if (loading) {
        return <Loader/>
      }
    return (
        <>
            {!loading && <NoteList notes={notes} />}
        </>
    )

}
