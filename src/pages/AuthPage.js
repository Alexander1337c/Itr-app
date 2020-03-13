import React, { useState, useEffect, useContext } from 'react'
import './AuthPage.css'
import { useHttp } from '../hookc/http.hook'
import { useMessage } from '../hookc/message.hook'
import { AuthContext } from '../context/AuthContext'



export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', name: '', loginDate:''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {

        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            console.log(data)
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {

        try {
            const data = await request('/api/auth/login', 'POST', {  ...form  })
            auth.login(data.token, data.userId)
            console.log(data)

        } catch (e) { }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Страница регистрации</h1>
                <div className="row">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <div className="link">
                                {/* <a href="#">Вход</a>
                                <a href="#">Регистрация</a> */}
                            </div>
                            <span className="card-title">Авторизация</span>
                            <div>
                                <div className="input-field">
                                    <input

                                        placeholder="Ваше имя"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        className="yellow-input"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="name">Имя</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        placeholder="Введите email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        className="yellow-input"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input

                                        placeholder="Введите пароль"
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        className="yellow-input"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Пароль</label>
                                </div>

                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn yellow darken-4 mar"
                                disabled={loading}
                                onClick={loginHandler}
                            >Войти</button>
                            <button
                                className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}
                            >Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}