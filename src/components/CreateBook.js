import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthors = this.onChangeAuthors.bind(this);
    this.onChangeIsbn = this.onChangeIsbn.bind(this);
    this.onChangePageCount = this.onChangePageCount.bind(this);
    this.onChangePublishedDate = this.onChangePublishedDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      title: '',
      authors: '',
      isbn: '',
      pageCount: '',
      publishedDate: '',
      description: '',
      status: 'PUBLISH', // Default status is 'PUBLISH'
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeAuthors(e) {
    this.setState({ authors: e.target.value });
  }

  onChangeIsbn(e) {
    this.setState({ isbn: e.target.value });
  }

  onChangePageCount(e) {
    this.setState({ pageCount: e.target.value });
  }

  onChangePublishedDate(e) {
    this.setState({ publishedDate: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bookObject = {
      title: this.state.title,
      authors: this.state.authors.split(','), // Convert authors to an array
      isbn: this.state.isbn,
      pageCount: this.state.pageCount,
      publishedDate: new Date(this.state.publishedDate),
      description: this.state.description,
      status: this.state.status,
    };

    axios
      .post('http://localhost:4000/books/create-book', bookObject)
      .then((res) => {
        console.log(res.data);
        this.props.history.push('/book-list'); // Redirect to the book list after creating
      })
      .catch((err) => {
        console.error('There was an error creating the book!', err);
      });

    // Reset state
    this.setState({
      title: '',
      authors: '',
      isbn: '',
      pageCount: '',
      publishedDate: '',
      description: '',
      status: 'PUBLISH',
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.onChangeTitle}
              required
            />
          </Form.Group>

          <Form.Group controlId="Authors">
            <Form.Label>Authors (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={this.state.authors}
              onChange={this.onChangeAuthors}
              required
            />
          </Form.Group>

          <Form.Group controlId="Isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={this.state.isbn}
              onChange={this.onChangeIsbn}
              required
            />
          </Form.Group>

          <Form.Group controlId="PageCount">
            <Form.Label>Page Count</Form.Label>
            <Form.Control
              type="number"
              value={this.state.pageCount}
              onChange={this.onChangePageCount}
              required
            />
          </Form.Group>

          <Form.Group controlId="PublishedDate">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              value={this.state.publishedDate}
              onChange={this.onChangePublishedDate}
              required
            />
          </Form.Group>

          <Form.Group controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={this.state.description}
              onChange={this.onChangeDescription}
              required
            />
          </Form.Group>

          <Form.Group controlId="Status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={this.state.status}
              onChange={this.onChangeStatus}
            >
              <option value="PUBLISH">PUBLISH</option>
              <option value="DRAFT">DRAFT</option>
            </Form.Control>
          </Form.Group>

          <Button variant="danger" size="lg" block type="submit" className="mt-4">
            Create Book
          </Button>
        </Form>
      </div>
    );
  }
}
