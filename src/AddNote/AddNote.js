import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './addNote.css'; 
class AddNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				touched: false
			},
			folderId: {
				value: '',
				touched: false
			},
			content: {
				value: '',
				touched: false
			},

		};
	}

	static contextType = ApiContext;

	handleNoteSubmit = (e) => {
		e.preventDefault();

		// const newNote = {
		// 	name: this.state.name.value,
		// 	folderId: this.state.folderId.value,
		// 	content: this.state.content.value,
		// 	modified: new Date(),
		// }
		const newNote = {
			name: e.target['note-name'].value,
			content: e.target['note-content'].value,
			folderId: e.target['note-folderId'].value,
			modified: new Date(),
		  }
		fetch(`${config.NOTES_ENDPOINT}`,
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(newNote),
			})

			.then(res => {
				if (!res.ok)
					return res.json().then(e => Promise.reject(e))
				return res.json()
			})
			.then(note => {
				console.log(note)
				this.context.addNote(note)
				this.props.history.push(`/folder/${note.folderId}`)

			})
			// .then(data => {
			// 	console.log(data)
			// 	this.props.history.push('/')
			// })

			.catch(error => {
				console.log(error.message)
			})
	}

	updateFolderId = (folderId) => {
		this.setState({
			folderId: {
				value: folderId,
				touched: true
			}
		})
	}

	updateName = (name) => {
		this.setState({
			name: {
				value: name,
				touched: true
			}
		})
	}

	updateContent = (content) => {
		this.setState({
			content: {
				value: content,
				touched: true
			}
		})
	}

	validateName() {
		const name = this.state.name.value.trim();
		if (name.length === 0) {
			return 'Name is required'
		}
	}

	validateFolderSelect() {
		const folderIsSelected = this.state.folderId.value;
		return !folderIsSelected;
	}

	render() {
		const folderList = this.context.folders.map(folder => {
			return (
				<option key={folder.id} value={folder.id}>{folder.folder_name}{folder.name}</option>
			)
		})


		return (
			<form className="addNote-form" onSubmit={this.handleNoteSubmit}>
				<label htmlFor="note-name">Title *</label>
				<input
					id="note-name"
					type="text"
					name="note-name"
					onChange={e => this.updateName(e.target.value)}
				>
				</input>
				{this.state.name.touched && (<ValidationError message={this.validateName()} />)}
				<label htmlFor="note-content">Content</label>
				<textarea id="note-content"
					name="note-content"
					onChange={e => this.updateContent(e.target.value)}
					defaultValue=""
				></textarea>
				<label htmlFor="folders">Save in *</label>
				<select
					id="folderId"
					name="note-folderId"
					onChange={e => this.updateFolderId(e.target.value)}
					value={this.state.folderId.value}
				>
					<option value={null}>Select Folder</option>
					{folderList}
				</select>
				<button type="submit"
					disabled={this.validateName() || this.validateFolderSelect()
					}
				>Save</button>
			</form>
		)
	}
}
export default AddNote;

AddNote.propTypes = {
	folders: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})),
	addNote: PropTypes.func
}