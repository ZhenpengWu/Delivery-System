import React from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import '../../stylesheets/main.css';

class New extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: ''
    };
  }

  onChange = e => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    const { text } = this.state;

    e.preventDefault();

    fetch('/api/description/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text
      })
    })
      .then(res => res.json())
      .then(description => {
        if (description.error) {
          alert(description.error);
          this.props.history.push('/description');
        } else this.props.history.push('/description/' + description.id);
      });
  };

  render() {
    const { text } = this.state;

    return (
      <div>
        <Container fluid className="customer-header">
          <Row>
            <Col>
              <h2> New Description </h2> <p> Create a new description here. </p>{' '}
            </Col>{' '}
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="text"> Description </Label>{' '}
                  <Input
                    type="text"
                    name="text"
                    id="text"
                    value={text}
                    onChange={this.onChange}
                    placeholder="description"
                  />
                </FormGroup>{' '}
                <Button type="submit"> Submit </Button>{' '}
              </Form>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
      </div>
    );
  }
}

export default New;
