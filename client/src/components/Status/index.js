import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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

export class Status extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/status/" component={New} />{' '}
      </Switch>
    );
  }
}

class New extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cities: [],
      descriptions: [],
      trackingnumber: '',
      descriptionid: '',
      cityid: ''
    };
  }

  componentDidMount() {
    fetch('/api/description')
      .then(res => res.json())
      .then(descriptions => {
        this.setState({
          descriptions: descriptions
        });
      });

    fetch('/api/city')
      .then(res => res.json())
      .then(cities => {
        this.setState({
          cities: cities
        });
      });
  }

  onChange = e => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    const { trackingnumber, descriptionid, cityid } = this.state;

    e.preventDefault();

    fetch('/api/status/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trackingnumber: trackingnumber,
        descriptionid: descriptionid,
        cityid: cityid
      })
    })
      .then(res => res.json())
      .then(status => {
        if (status.error) {
          alert(status.error);
          this.props.history.push('/status');
        } else this.props.history.push('/package/' + status.trackingnumber);
      });
  };

  render() {
    const {
      trackingnumber,
      descriptionid,
      cityid,
      descriptions,
      cities
    } = this.state;

    return (
      <div>
        <Container fluid className="customer-header">
          <Row>
            <Col>
              <h2> New Status </h2> <p> Create a new status here. </p>{' '}
            </Col>{' '}
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="trackingnumber"> Tracking Number </Label>{' '}
                  <Input
                    type="text"
                    name="trackingnumber"
                    id="trackingnumber"
                    value={trackingnumber}
                    onChange={this.onChange}
                    placeholder="tracking number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description"> Description </Label>{' '}
                  <Input
                    type="select"
                    name="descriptionid"
                    value={descriptionid}
                    onChange={this.onChange}
                    id="description"
                  >
                    <option value="" selected disabled hidden>
                      Choose here{' '}
                    </option>{' '}
                    {descriptions.map((description, i) => (
                      <option key={i} value={description.id}>
                        {' '}
                        {description.text}{' '}
                      </option>
                    ))}{' '}
                  </Input>{' '}
                </FormGroup>
                <FormGroup>
                  <Label for="city"> City </Label>{' '}
                  <Input
                    type="select"
                    name="cityid"
                    value={cityid}
                    onChange={this.onChange}
                    id="city"
                  >
                    <option value="" disabled hidden>
                      Choose here{' '}
                    </option>{' '}
                    {cities.map((city, i) => (
                      <option key={i} value={city.cityid}>
                        {' '}
                        {city.cityname +
                          ', ' +
                          city.province +
                          ', ' +
                          city.country}{' '}
                      </option>
                    ))}{' '}
                  </Input>{' '}
                </FormGroup>
                <Button type="submit"> Submit </Button>{' '}
              </Form>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
      </div>
    );
  }
}

export default Status;
