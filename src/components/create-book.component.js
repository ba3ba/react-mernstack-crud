import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateBook extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeBookName = this.onChangeBookName.bind(this);
    this.onChangeBookEmail = this.onChangeBookEmail.bind(this);
    this.onChangeBookRollno = this.onChangeBookRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  onChangeBookName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeBookEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeBookRollno(e) {
    this.setState({ rollno: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const bookObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };
    axios.post('http://localhost:4000/books/create-book', bookObject)
      .then(res => console.log(res.data));

    this.setState({ name: '', email: '', rollno: '' })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeBookName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={this.state.email} onChange={this.onChangeBookEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeBookRollno} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Book
        </Button>
      </Form>
    </div>);
  }
}