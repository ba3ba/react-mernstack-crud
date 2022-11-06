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
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      rollno: '',
      number: ''
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

  onChangeNumber(e) {
    this.setState({ number: e.target.value });
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

  state = { showing: false };

  render() {
    const { showing } = this.state;
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeBookName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={this.state.email} onChange={this.onChangeBookEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeBookRollno} />
        </Form.Group>

        <div style={{"display":"flex", "justifyContent":"center"}}>
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Book
        </Button>

        <Button variant="info" size="lg" block="block" className="mt-4" style={{"marginLeft":"100px"}} onClick= {
          () => this.setState({ showing: true })
        }>
          Get Notified
        </Button>
        
        </div>
        { showing ? 
        <div>
          <Form.Group controlId="Name" style={{"marginTop":"15px"}}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" value={this.state.number} onChange={this.onChangeNumber} />
          </Form.Group>
          <Button variant="danger" size="lg" block="block" className="mt-4" onClick={
            function postNumber(){
              const numberObj = { number: this.state.number };
              axios.post('http://localhost:4000/books/create-book', numberObj)
              .then(res => console.log(res.data));
            }
          }>
          Enter
          </Button>
        </div>
        
        : null
        }
      </Form>
    </div>);
  }
}