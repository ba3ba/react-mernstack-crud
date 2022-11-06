import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateSubscriber extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeNumber = this.onChangeNumber.bind(this);
   
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      number: ''
    }
  }

  onChangeNumber(e) {
    this.setState({ number: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault()

    const subscriberObject = {
      number: this.state.number
    };
    axios.post('http://localhost:4000/books/create-subscriber', subscriberObject)
      .then(res => console.log(res.data));

    this.setState({ number: '' })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <div>
          <Form.Group controlId="Name" style={{"marginTop":"15px"}}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" value={this.state.number} onChange={this.onChangeNumber} />
          </Form.Group>
          <Button variant="danger" size="lg" block="block" className="mt-4" type = "submit">
          Enter
          </Button>
        </div>
      </Form>
    </div>);
  }
}