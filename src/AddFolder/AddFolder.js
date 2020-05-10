import React, { Component } from  'react';
import config from '../config';
import './addFolder.css';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: " ",
        };
      }

folderAdded(folder){
    this.setState({
        folder
      });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {name} = this.state;
        const folder = {name};
        const url =`${config.API_ENDPOINT}/folders`
        const options = {
          method: 'POST',
          body: JSON.stringify(folder),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "
          }
        };

        fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          className: " ",
        });
        this.props.handleAdd(folder);
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
    return (
      <div className="addfolder">
        <h2>Add Folder</h2>
        {error}
        <form className="addfolder__form">

          <label htmlFor="folder-name">Name: </label>
          <input type="text" 
            name="folder-name" 
            id="folder-name" 
            placeholder="Folder Name" 
            value={this.state.folder}
            onChange={e => this.folderAdded(e.target.value)}/>

          <div className="addfolder__button">
            <button type="submit">Add new </button>
          </div>  

        </form>
      </div>
    );
  }
}

export default AddFolder;