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
      city: '',
      province: '',
      country: ''
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
    const { city, province, country } = this.state;

    e.preventDefault();

    fetch('/api/city/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cityname: city,
        province: province,
        country: country
      })
    })
      .then(res => res.json())
      .then(cities => {
        if (cities.error) {
          alert(cities.error);
          this.props.history.push('/city');
        } else this.props.history.push('/city/' + cities.cityid);
      });
  };

  render() {
    const { city, province, country } = this.state;

    return (
      <div>
        <Container fluid className="customer-header">
          <Row>
            <Col>
              <h2> New City </h2> <p> Create a new city here. </p>{' '}
            </Col>{' '}
          </Row>{' '}
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="city"> City </Label>{' '}
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={this.onChange}
                    placeholder="city"
                  />
                </FormGroup>{' '}
                <FormGroup>
                  <Label for="address"> Address </Label>{' '}
                  <Input
                    type="text"
                    name="province"
                    id="province"
                    value={province}
                    onChange={this.onChange}
                    placeholder="province"
                  />
                </FormGroup>{' '}
                <FormGroup>
                  <Label for="country"> Country </Label>{' '}
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={this.onChange}
                    placeholder="country"
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
