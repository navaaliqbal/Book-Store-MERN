import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class BookTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteBook = this.deleteBook.bind(this)
  }

  // Function to delete the book
  deleteBook() {
    axios
      .delete('http://localhost:4000/books/delete-book/' + this.props.obj._id)
      .then((res) => {
        console.log('Book successfully deleted!')
        // Optionally, trigger a refresh of the list after deletion
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.isbn}</td>
        <td>{this.props.obj.pageCount}</td>
        <td>{this.props.obj.publishedDate}</td>
        <td>
          <Link
            className="edit-link"
            to={'/edit-book/' + this.props.obj._id}
          >
            Edit
          </Link>
          <Button onClick={this.deleteBook} size="sm" variant="danger" className="ml-2">
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}
