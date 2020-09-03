import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import '../../stylesheets/main.css';
import Show from './show.js';
import New from './new.js';
import Edit from './edit.js';

export class Customers extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/customers/" component={Index} />{' '}
        <Route exact path="/customers/new" component={New} />{' '}
        <Route exact path="/customers/:id" component={Show} />{' '}
        <Route exact path="/customers/edit/:id" component={Edit} />{' '}
      </Switch>
    );
  }
}

class Index extends React.Component {
  state = {
    customers: []
  };

  componentDidMount() {
    fetch('/api/customer')
      .then(res => res.json())
      .then(customers => {
        if (customers.error) alert(customers.error);
        this.setState({
          customers: customers
        });
      });
  }

  render() {
    return (
      <div>
        <Container fluid className="customer-header">
          <Row>
            <Col>
              <h2> Customers </h2> <p> View your customers here. </p>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>
        <Container fluid>
          <Table>
            <thead>
              <tr>
                <th> User ID </th> <th> Name </th> <th> Address </th>{' '}
                <th> Phone# </th>{' '}
              </tr>{' '}
            </thead>
            <tbody>
              {' '}
              {this.state.customers.map(c => (
                <tr key={c.customerid} onClick={e => this.showCustomer(e, c)}>
                  <td> {c.customerid} </td> <td> {c.name} </td>{' '}
                  <td> {c.address} </td> <td> {c.phone} </td>{' '}
                </tr>
              ))}{' '}
            </tbody>{' '}
          </Table>{' '}
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <Button color="primary" href="/customers/new" to="/customers/new">
                {' '}
                New{' '}
              </Button>{' '}
              <Button
                color="primary"
                href="/customers/giver"
                to="/customers/giver"
              >
                {' '}
                Find Givers{' '}
              </Button>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
      </div>
    );
  }

  showCustomer = (e, c) => {
    this.props.history.push('/customers/' + c.customerid);
  };
}
