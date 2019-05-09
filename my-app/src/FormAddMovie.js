import React from 'react';
import './App.css';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Col, Row } from 'reactstrap';

export default class FormAddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      poster: '',
      comment: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(this.state)
    };
    const url = "http://campus-bordeaux.ovh:3001/api/quests/movies/";

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Added ${this.state.name} film with the comment: ${this.state.comment}!`);
        }
      }).catch(e => {
        console.error(e);
        alert('Error during film adding');
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.fetchData();
  }

  render() {
    return (
      <Container>
        <div className="FormAddMovie">
          <h1 className="text-muted">Tell about your favourite film</h1>
          <Form>
            <Row>
              <Col lg={{ size: 4, offset: 2 }}>
                <FormGroup>
                  <Label for="name">Film:</Label>
                  <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name} />
                </FormGroup>
              </Col>
              <Col lg={{ size: 4 }}>
                <FormGroup>
                  <Label for="poster">Poster URL:</Label>
                  <Input type="text" name="poster" id="poster" placeholder="http://" onChange={this.onChange} value={this.state.poster} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 8, offset: 2 }}>
                <FormGroup>
                  <Label for="comment">Comment:</Label>
                  <Input type="textarea" name="comment" id="comment" onChange={this.onChange} value={this.state.comment} />
                  <FormText>Why do you like this film? What impressed you in this film?</FormText>
                </FormGroup>
                <Button color="success" type="submit" onClick={this.submitForm}>Send</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container >
    );
  }
}