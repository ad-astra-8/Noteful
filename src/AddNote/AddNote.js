import React, { Component } from 'react';
import config from '../config';
import './addNote.css';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
            content: " ",
            folder: " ",
        };
    }

    contentAdded(content) {
        this.setState({
            content
        });
    }

    nameAdded(name){
            this.setState({
                name
            });
    }

    folderAdded(folder){
        this.setState({
            folder
        });
    }

    handleSubmitNote(e) {
        e.preventDefault();
        const { name, content, folder } = this.state;
        const note = { name, content, folder };
        const url = (`${config.API_ENDPOINT}/notes`);
        const options = {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "
            }
        };

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later');
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    name: "",
                    content: "",
                    folder: "",
                });
                this.props.handleAddNote(note);
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            });
    }

    render() {
        const error = this.state.error
            ? <div className="error">{this.state.error}</div>
            : "";
            const { folders=[] } = this.context

        return (
            <div className="addnote">
                <h2>Add Note</h2>
                {error}
                <form className="addfolder__form">

                    <label htmlFor="folder-name">Name: </label>
                    <input type="text"
                        name="note-name"
                        id="note-id"
                        placeholder="Note name"
                        value={this.state.name}
                        onChange={e => this.nameAdded(e.target.value)}
                    />

                    <label htmlFor="note-content">Content: </label>
                    <textarea type="text"
                        content="note-content"
                        name="content"
                        id="note-id"
                        placeholder="Write here"
                        value={this.state.content}
                        onChange={e => this.contentAdded(e.target.value)}
                    />

                    <label htmlFor="folder"> Folder</label>
                    {/* <input type="text"
                        name="note-name"
                        id="folder-id"
                        placeholder="Folder Name" 
                        value={this.state.folder}
                        onChange={e => this.folderAdded(e.target.value)}
                        /> */}
                         <select id='note-folder-select' name='note-folder-id'> 
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.folder_name}
                </option>
              )}
            </select>


                    <div className="addnote__button">
                        <button type="submit">Add new note</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddFolder;