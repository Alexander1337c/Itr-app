import React, { Component } from 'react'
import {StickyEditor} from './StickyEditor'
import {StickyGrid} from './StickyGrid'
// import NoteStore from '../../stores/NoteStore'
// import NoteActions from '../../actions/NotesActions'
import { render } from 'react-dom'
import './Sticky.css'

// function getStateFromFlux() {
//     return {
//         isLoading: NoteStore.isLoading(),
//         notes: NoteStore.getNotes()
//     }
// }

class Sticky extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...getStateFromFlux()
    //     }
    //     this._onChange = this._onChange.bind(this)
    // }
    // componentDidMount() {
    //     NoteStore.addChangeListener(this._onChange);
    // }
    // componentWillUnmount() {
    //     NoteStore.removeChangeListener(this._onChange)
    // }
    // componentWillMount() {
    //     NoteActions.loadNotes()
    // }
    // handleNoteAdd(data) {
    //     console.log(data)
    //     NoteStore.createNote(data);

    // }
    // constructor(){
    //     super();
    //     this.state={
    //         notes:[]
    //     }
    // }
    // handleNoteDelete(note) {
    //     let notes = this.state.notes.slice()
    //     notes = notes.filter(u=>{return n._id !==note._id});
    //     this.setState({notes: notes})
    //     NoteStore.deleteNote(note.id);
    // }
    // _onChange() {
    //     this.setState({ ...getStateFromFlux() })
    // }

    render() {
        return (
            <div className="Sticky">
                <h2 className="Sticky_header">Стикеры</h2>
                <StickyEditor/>
                <StickyGrid/>
            </div>
        )
    }


}
export default Sticky

{/* <StickyEditor onNoteAdd={this.handleNoteAdd} /> */}
{/* <StickyGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} /> */}