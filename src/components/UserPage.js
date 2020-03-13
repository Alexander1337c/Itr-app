import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Note/UserPage.css'
import { Switch, Route, Redirect } from 'react-router-dom'



export default class UserPage extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.clicked = this.clicked.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.state = { users: [], checkedId: [] };
    }


    clicked = (event) => {
        if (event.target.checked) {
            var checkboxes = document.getElementsByName("rowSelectCheckBox");
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = true;
                this.checkedId = []
                this.checkedId = this.props.users.map(x => {
                    return x._id
                })
            }
        } else {
            var checkboxes = document.getElementsByName("rowSelectCheckBox");
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = false;
                this.checkedId = []
            }
        }
        console.log(this.checkedId)
    }
    checkedId = []
    handleClick = (event, id) => {

        if (event.target.checked) {
            if (this.checkedId.includes(id) === false) {
                this.checkedId = [...this.checkedId, id]
            }
        } else {
            this.checkedId = this.checkedId.filter(x => x !== id)

        }

        console.log(this.checkedId)
    }
    componentDidMount() {
        axios.get('http://localhost:3000/api/users')
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteUser = async () => {

        for (var i = 0; i <= this.checkedId.length; i++) {

            try {

                axios.delete('http://localhost:3000/api/users/' + this.checkedId[i])

                    .then(response => { console.log(response.data) });
                if (JSON.parse(localStorage.getItem('userData')).userId === this.checkedId[i]) {
                    localStorage.removeItem('userData')
                    // return <Redirect to='/'/>
                    window.location.href = '/';
                }

                this.setState({
                    users: this.state.users.filter(el => el._id !== this.checkedId[i])
                })

                console.log(this.checkedId[i])
                window.location.reload()

            } catch (e) { }
        }

    }

    blockUser = async () => {

        for (var i = 0; i <= this.checkedId.length; i++) {

            try {

                axios.put('http://localhost:3000/api/users/update-block/' + this.checkedId[i])

                    .then(response => { console.log(response.data) });
                if (JSON.parse(localStorage.getItem('userData')).userId === this.checkedId[i]) {
                    localStorage.removeItem('userData')
                    // return <Redirect to='/'/>
                    window.location.href = '/';
                }
                console.log(this.checkedId[i])
                window.location.reload()

            } catch (e) { }
        }

    }
    unblockUser = async () => {

        for (var i = 0; i <= this.checkedId.length; i++) {

            try {

                axios.put('http://localhost:3000/api/users/update-unblock/' + this.checkedId[i])

                    .then(response => { console.log(response.data) });
                if (JSON.parse(localStorage.getItem('userData')).userId === this.checkedId[i]) {
                    localStorage.removeItem('userData')
                    // return <Redirect to='/'/>
                    window.location.href = '/users';
                }

                this.setState({
                    users: this.state.users.filter(el => el._id !== this.checkedId[i])
                })

                console.log(this.checkedId[i])
                window.location.reload()

            } catch (e) { }
        }

    }
    // if (JSON.parse(localStorage.getItem('userData')).userId === id) {
    //     localStorage.removeItem('userData')
    //     return <Redirect to='/'
    //   }

    render() {
        let classNames = 'list';
        return (
            <div className = "table">
                <h3>Таблица пользователей</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th><label><input type="checkbox" id="scales" onClick={this.clicked} /><span></span></label></th>
                            <th>Id</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Дата рег.</th>
                            <th>Дата посл. лог</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.users.map((users, index) => {
                            return (
                                <tr key={users._id} className={classNames}>
                                    <td><label><input type="checkbox" id="scale" name="rowSelectCheckBox" onClick={event => this.handleClick(event, users._id)} /><span></span></label></td>
                                    <td>{index + 1}</td>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{new Date(users.regDate).toLocaleString('ru')}</td>
                                    <td>{new Date(users.loginDate).toLocaleString('ru')}</td>
                                    <td>{users.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <a href="#" className="waves-effect red darken-1 btn-small " onClick={this.deleteUser}><i className="material-icons">delete</i></a>
                <a href="#" className="waves-effect red lighten-4 btn-small" onClick={this.blockUser}><i className="material-icons">block</i></a>
                <a href="#" className="waves-effect green darken-1 btn-small" onClick={this.unblockUser}>Разблокировать</a>


            </div>
        )
    }
}


// export const UserPage = ({ users }) => {
//     const auth = useContext(AuthContext)
//     const { loading, error, request, clearError } = useHttp()
//     if (!users.length) {
//         return <p className="center">Пользователей нет</p>
//     }
//     console.log(users)
//     const clicked = (event) => {
//         if (event.target.checked) {
//             var checkboxes = document.getElementsByName("rowSelectCheckBox");
//             for (var i = 0, n = checkboxes.length; i < n; i++) {
//                 checkboxes[i].checked = true;
//                 checkedId = []
//                 checkedId = users.map(x => {
//                     return x._id
//                 })
//             }
//         } else {
//             var checkboxes = document.getElementsByName("rowSelectCheckBox");
//             for (var i = 0, n = checkboxes.length; i < n; i++) {
//                 checkboxes[i].checked = false;
//                 checkedId = []
//             }
//         }
//         console.log(checkedId)
//     }

//     let checkedId = []

//     const handleClick = (event, id) => {
//         if (event.target.checked) {
//             if (checkedId.includes(id) === false) {
//                 checkedId = [...checkedId, id]
//             }
//         } else {
//             checkedId = checkedId.filter(x => x !== id)

//         }

//         console.log(checkedId)
//     }

//     const deleteUser = async () => {
//         for (var i = 0; i <= checkedId.length; i++) {
//             try {
//                 const data = await request(`/api/users/${checkedId[i]}/delete`, 'DELETE', null, {
//                     Authorization: `Bearer ${auth.token}`
//                 })
//                 console.log(data)

//             } catch (e) { }
//         }
//     }
//     const block = async () => {
//         for (var i = 0; i <= checkedId.length; i++) {

//             try {
//                 const data = await request(`/api/users/${checkedId[i]}/update`, 'PUT', null, {
//                     Authorization: `Bearer ${auth.token}`

//                 })
//                 // if (JSON.parse(localStorage.getItem('userData')).userId === id) {
//                 //     localStorage.removeItem('userData')
//                 // }

//                 console.log(data)

//             } catch (e) { }
//         }
//     }
//     const unblock = async () => {
//         for (var i = 0; i <= checkedId.length; i++) {
//             try {
//                 const data = await request(`/api/users/${checkedId[i]}/update`, 'PUT', null, {
//                     Authorization: `Bearer ${auth.token}`
//                 })
//                 console.log(data)

//             } catch (e) { }
//         }
//     }


//     return (
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th><input type="checkbox" id="scales" onClick={clicked} /></th>
//                         <th>Id</th>
//                         <th>Имя</th>
//                         <th>Email</th>
//                         <th>Дата рег.</th>
//                         <th>Дата посл. лог</th>
//                         <th>Статус</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {users.map((users, index) => {
//                         return (
//                             <tr key={users._id}>
//                                 <td><input type="checkbox" id="scale" name="rowSelectCheckBox" onClick={event => handleClick(event, users._id)} /></td>
//                                 <td>{index + 1}</td>
//                                 <td>{users.name}</td>
//                                 <td>{users.email}</td>
//                                 <td>{new Date(users.regDate).toLocaleString('ru')}</td>
//                                 <td>{new Date(users.loginDate).toLocaleString('ru')}</td>

//                                 <td>{users.status}</td>

//                                 <td>

//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//             <button className="delete" onClick={deleteUser}>Удалить</button>
//             {/* <button className="delete" onClick={block}>Заблокировать</button>
//             <button className="delete" onClick={unblock}>Разблокировать</button> */}

//         </div>


//     )
// }