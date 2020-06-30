import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError'; // validating user input
import PropTypes from 'prop-types';
import './addFolder.css';

class AddFolder extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			name: {
				value: '',
			  touched: false
			}
		};
	}

	static contextType = ApiContext; // used to avoid prop drilling
	
  handleFolderFormSubmit = (event) => {
		event.preventDefault();

		const newFolder = JSON.stringify({
			folder_name: this.state.name.value
		})

		fetch(`${config.FOLDERS_ENDPOINT}`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: newFolder
		})
		.then(res => {
			if (!res.ok)
				return res.json().then(e => Promise.reject(e))
			return res.json()
		})
		.then(response => this.context.addFolder(response))
		.then(
			this.props.history.push('/')
		)
		.catch(error => {
			alert(error.message)
		})
	}
	
	updateFolderName = (name) => {
		this.setState({
			name: {
				value: name,
				touched: true
			}
		})
	}

  validateFolderName() {
		const name = this.state.name.value.trim();
		  if (name.length === 0) {
				return 'Name is required'
			}
	}

	render() {
		return (
			<form className="addFolder-form" onSubmit={this.handleFolderFormSubmit}>
				<label htmlFor="folder-name">Folder name</label>
				<input 
				id="folder-name" 
				type="text" 
				name="folder-name"
				onChange = {e => this.updateFolderName(e.target.value)}
				></input>
				{this.state.name.touched && (<ValidationError message = {this.validateFolderName()}/>)}
				<button type="submit" disabled={this.validateFolderName()}>Save</button>
			</form>
		)
	}
}
export default AddFolder;

AddFolder.propType = {
name : PropTypes.string.isRequired,	
addFolder: PropTypes.func
}

