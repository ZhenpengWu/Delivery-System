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
      name: '',
      address: '',
      phone: ''
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
    const { name, address, phone } = this.state;

    e.preventDefault();

    fetch('/api/customer/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        address,
        phone
      })
    })
      .then(res => res.json())
      .then(customer => {
        if (customer.error) {
          alert(customer.error);
          this.props.history.push('/customers');
        } else this.props.history.push('/customers/' + customer.customerid);
      });
  };

  render() {
    const { name, address, phone } = this.state;

    return (
      <div>
        <Container fluid className="customer-header">
          <Row>
            <Col>
              <h2> New Customer </h2> <p> Create a new customer here. </p>{' '}
            </Col>{' '}
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name"> Name </Label>{' '}
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.onChange}
                    placeholder="name"
                  />
                </FormGroup>{' '}
                <FormGroup>
                  <Label for="address"> Address </Label>{' '}
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={this.onChange}
                    placeholder="address"
                  />
                </FormGroup>{' '}
                <FormGroup>
                  <Label for="phone"> Phone </Label>{' '}
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={this.onChange}
                    placeholder="phone"
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
