import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditBook extends Component {

  constructor(props) {
    super(props)

    this.onChangeBookName = this.onChangeBookName.bind(this);
    this.onChangeBookEmail = this.onChangeBookEmail.bind(this);
    this.onChangeBookRollno = this.onChangeBookRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/books/edit-book/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

    axios.put('http://localhost:4000/books/update-book/' + this.props.match.params.id, bookObject)
      .then((res) => {
        console.log(res.data)
        console.log('book successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/book-list')
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
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeBookEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeBookRollno} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Book
        </Button>
      </Form>
    </div>);
  }
}