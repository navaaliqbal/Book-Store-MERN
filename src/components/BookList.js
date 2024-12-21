import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  // Fetch books from the server when the component mounts
  componentDidMount() {
    axios
      .get('http://localhost:4000/books')
      .then((res) => {
        this.setState({ books: res.data });
      })
      .catch((err) => {
        console.error('There was an error fetching the books!', err);
      });
  }

  // Delete a book by its ID
  deleteBook(id) {
    axios
      .delete(`http://localhost:4000/books/delete-book/${id}`)
      .then((res) => {
        console.log('Book deleted:', res.data);
        this.setState({
          books: this.state.books.filter((book) => book._id !== id), // Remove the deleted book from the state
        });
      })
      .catch((err) => {
        console.error('There was an error deleting the book!', err);
      });
  }

  render() {
    return (
      <div className="container">
        <h2>Book List</h2>
        <Link to="/create-book">
          <Button variant="primary" className="mb-3">
            Add New Book
          </Button>
        </Link>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>ISBN</th>
              <th>Page Count</th>
              <th>Published Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.authors.join(', ')}</td> {/* Display authors as a comma-separated string */}
                <td>{book.isbn}</td>
                <td>{book.pageCount}</td>
                <td>{new Date(book.publishedDate).toLocaleDateString()}</td> {/* Format date */}
                <td>{book.status}</td>
                <td>
                  <Link to={`/edit-book/${book._id}`}>
                    <Button variant="warning" size="sm" className="mr-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => this.deleteBook(book._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
