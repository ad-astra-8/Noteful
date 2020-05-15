import React from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }

  static contextType = ApiContext;

    timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp *1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    // let hour = a.getHours();
    // let min = a.getMinutes();
    // let sec = a.getSeconds();
    // let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    let time = date + ' ' + month + ' ' + year;

    return time;
  }


  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, date_modified } = this.props
// console.log(date_modified);
let date = Date.parse(date_modified);
let unixtimedate= date.toLocaleString("en-US").replace(/,/g, "");
// console.log(unixtimedate)

    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Date modified on
            {' '}
            <span className='Date'>
               {/* {format(date_modified, 'yyyy-MM-dd')} */}
               {/* {format(new Date(date_modified), 'yyyy-MM-dd')} */}
               {/* {format(new Date(2014,1,11), 'dd MM yyyy')} */}
               {this.timeConverter(unixtimedate)}
              {/* {date_modified} */}

            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
	modified: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
	}