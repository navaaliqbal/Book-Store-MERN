import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    // Initializing the state for the book fields
    this.state = {
      title: '',
      isbn: '',
      pageCount: '',
      publishedDate: '',
      status: '',
      authors: '',
      shortDescription: '',
      longDescription: '',
      thumbnailUrl: '',
    };

    // Binding the methods to this
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeIsbn = this.onChangeIsbn.bind(this);
    this.onChangePageCount = this.onChangePageCount.bind(this);
    this.onChangePublishedDate = this.onChangePublishedDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeAuthors = this.onChangeAuthors.bind(this);
    this.onChangeShortDescription = this.onChangeShortDescription.bind(this);
    this.onChangeLongDescription = this.onChangeLongDescription.bind(this);
    this.onChangeThumbnailUrl = this.onChangeThumbnailUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Component lifecycle method to fetch book data by ID
  componentDidMount() {
    const { id } = this.props.match.params; // Get the book ID from the URL
    axios
      .get(`http://localhost:4000/books/edit-book/${id}`)
      .then((res) => {
        const book = res.data;
        this.setState({
          title: book.title,
          isbn: book.isbn,
          pageCount: book.pageCount,
          publishedDate: book.publishedDate,
          status: book.status,
          authors: book.authors.join(', '), // Authors are stored as a comma-separated string
          shortDescription: book.shortDescription,
          longDescription: book.longDescription,
          thumbnailUrl: book.thumbnailUrl,
        });
      })
      .catch((err) => {
        console.error('There was an error fetching the book data!', err);
      });
  }

  // Handle the form inputs
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
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

  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }

  onChangeAuthors(e) {
    this.setState({ authors: e.target.value });
  }

  onChangeShortDescription(e) {
    this.setState({ shortDescription: e.target.value });
  }

  onChangeLongDescription(e) {
    this.setState({ longDescription: e.target.value });
  }

  onChangeThumbnailUrl(e) {
    this.setState({ thumbnailUrl: e.target.value });
  }

  // Submit the form data to update the book
  onSubmit(e) {
    e.preventDefault();

    const updatedBook = {
      title: this.state.title,
      isbn: this.state.isbn,
      pageCount: this.state.pageCount,
      publishedDate: this.state.publishedDate,
      status: this.state.status,
      authors: this.state.authors.split(',').map((author) => author.trim()), // Convert the authors back to an array
      shortDescription: this.state.shortDescription,
      longDescription: this.state.longDescription,
      thumbnailUrl: this.state.thumbnailUrl,
    };

    const { id } = this.props.match.params; // Get the book ID from the URL
    axios
      .put(`http://localhost:4000/books/update-book/${id}`, updatedBook)
      .then((res) => {
        console.log('Book updated:', res.data);
        // Redirect to the book list page after successful update
        this.props.history.push('/book-list');
      })
      .catch((err) => {
        console.error('There was an error updating the book!', err);
      });
  }

  render() {
    return (
      <div className="container">
        <h2>Edit Book</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </Form.Group>

          <Form.Group controlId="Isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={this.state.isbn}
              onChange={this.onChangeIsbn}
            />
          </Form.Group>

          <Form.Group controlId="PageCount">
            <Form.Label>Page Count</Form.Label>
            <Form.Control
              type="number"
              value={this.state.pageCount}
              onChange={this.onChangePageCount}
            />
          </Form.Group>

          <Form.Group controlId="PublishedDate">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              value={this.state.publishedDate}
              onChange={this.onChangePublishedDate}
            />
          </Form.Group>

          <Form.Group controlId="Status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={this.state.status}
              onChange={this.onChangeStatus}
            />
          </Form.Group>

          <Form.Group controlId="Authors">
            <Form.Label>Authors</Form.Label>
            <Form.Control
              type="text"
              value={this.state.authors}
              onChange={this.onChangeAuthors}
            />
            <Form.Text className="text-muted">
              Separate authors with commas.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="ShortDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.shortDescription}
              onChange={this.onChangeShortDescription}
            />
          </Form.Group>

          <Form.Group controlId="LongDescription">
            <Form.Label>Long Description</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.longDescription}
              onChange={this.onChangeLongDescription}
            />
          </Form.Group>

          <Form.Group controlId="ThumbnailUrl">
            <Form.Label>Thumbnail URL</Form.Label>
            <Form.Control
              type="text"
              value={this.state.thumbnailUrl}
              onChange={this.onChangeThumbnailUrl}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Book
          </Button>
        </Form>

        <Link to="/book-list">
          <Button variant="secondary" className="mt-3">
            Back to Book List
          </Button>
        </Link>
      </div>
    );
  }
}
