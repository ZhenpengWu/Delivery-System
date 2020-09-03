import React from 'react';
import { Container, Table, Row, Col, Button } from 'reactstrap';
import '../../stylesheets/main.css';

class Show extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      packages: [],
      statuses: [],
      trackingnumber: this.props.match.params.trackingnumber
    };
    this.deletePackage = this.deletePackage.bind(this);
  }
  componentDidMount() {
    //alert(JSON.stringify(this.props));
    const body = {
      trackingnumber: this.state.trackingnumber
    };
    fetch('/api/package/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(packages => {
        this.setState({
          packages: packages
        });
      });
    fetch('/api/package/statuses/' + this.state.trackingnumber)
      .then(res => res.json())
      .then(statuses => {
        if (statuses.length === 0) {
          alert('This package has no status updates. Check back later!');
        }
        this.setState({
          statuses: statuses
        });
      });
  }

  deletePackage() {
    fetch('/api/package/' + this.state.trackingnumber, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {}
    })
      .then(res => res.json())
      .then(packages => {
        if (packages.error) {
          alert(packages.error);
          this.props.history.push(
            '/packages/show/' + this.state.trackingnumber
          );
        } else {
          alert('Package has been deleted');
          this.props.history.push('/packages/');
        }
      });
  }
  render() {
    return (
      <div>
        <Container fluid className="customer-header">
          <Row>
            <Col>
              <h2> Package </h2> <p> details </p>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
        <Container fluid>
          <Table>
            <thead>
              <tr>
                <th> Tracking Number </th> <th> Weight </th> <th> Type </th>{' '}
                <th> Signature </th> <th> Sender </th> <th> Receiver</th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody>
              {' '}
              {this.state.packages.map(p => (
                <tr key={p.trackingnumber}>
                  <td> {p.trackingnumber} </td> <td> {p.weight} </td>{' '}
                  <td> {p.type} </td>{' '}
                  <td> {p.signaturerequired.toString()} </td>{' '}
                  <td> {p.senderid} </td> <td> {p.receiverid} </td>{' '}
                </tr>
              ))}{' '}
            </tbody>{' '}
          </Table>{' '}
          <br />
          <Container fluid>
            <Button outline color="primary" onClick={this.deletePackage}>
              {' '}
              Delete Package{' '}
            </Button>{' '}
          </Container>{' '}
          <br />
          <Row>
            <Col>
              <h4> Statuses </h4>{' '}
            </Col>{' '}
          </Row>{' '}
          <Table striped size="sm">
            <thead>
              <tr>
                <th> Timestamp </th> <th> Location </th> <th> Description </th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody>
              {' '}
              {this.state.statuses.map(s => (
                <tr key={s.timestamp}>
                  <td> {s.timestamp} </td> <td> {s.location} </td>{' '}
                  <td> {s.description} </td>{' '}
                </tr>
              ))}{' '}
            </tbody>{' '}
          </Table>{' '}
        </Container>{' '}
      </div>
    );
  }
}

export default Show;
