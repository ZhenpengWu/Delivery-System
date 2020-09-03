import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import '../../stylesheets/main.css';
import Show from './show.js';
import New from './new.js';

export class City extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/city/" component={Index} />{' '}
        <Route exact path="/city/new" component={New} />{' '}
        <Route exact path="/city/:id" component={Show} />{' '}
      </Switch>
    );
  }
}

class Index extends React.Component {
  state = {
    cities: []
  };

  componentDidMount() {
    fetch('/api/city')
      .then(res => res.json())
      .then(cities => {
        if (cities.error) alert(cities.error);
        else
          this.setState({
            cities: cities
          });
      });
  }

  render() {
    return (
      <div>
        <Container fluid className="citiesHeader">
          <Row>
            <Col>
              <h2> Cities </h2> <p> View your cities here. </p>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
        <Container fluid>
          <Table>
            <thead>
              <tr>
                <th> City ID </th> <th> City Name </th> <th> Province </th>{' '}
                <th> Country </th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody>
              {' '}
              {this.state.cities.map(c => (
                <tr key={c.cityid} onClick={e => this.showCity(e, c)}>
                  <td> {c.cityid} </td> <td> {c.cityname} </td>{' '}
                  <td> {c.province} </td> <td> {c.country} </td>{' '}
                </tr>
              ))}{' '}
            </tbody>{' '}
          </Table>{' '}
        </Container>{' '}
        <Container fluid>
          <Row>
            <Col>
              <Button color="primary" href="/city/new" to="/city/new">
                New{' '}
              </Button>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
      </div>
    );
  }

  showCity = (e, c) => {
    this.props.history.push('/city/' + c.cityid);
  };
}

export default City;
