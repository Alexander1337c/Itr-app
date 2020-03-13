import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <span className="brand-logo">Itr</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/table">Таблица</NavLink></li>
                    <li><NavLink to="/notes">Стикеры</NavLink></li>
               
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}