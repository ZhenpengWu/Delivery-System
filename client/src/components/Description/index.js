import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import '../../stylesheets/main.css';
import Show from './show.js';
import New from './new.js';

export class Description extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/description/" component={Index} />
        <Route exact path="/description/new" component={New} />
        <Route exact path="/description/:id" component={Show} />
      </Switch>
    );
  }
}

class Index extends React.Component {
  state = {
    descriptions: []
  };

  componentDidMount() {
    fetch('/api/description')
      .then(res => res.json())
      .then(descriptions => {
        if (descriptions.error) alert(descriptions.error);
        this.setState({
          descriptions: descriptions
        });
      });
  }

  render() {
    return (
      <div>
        <Container fluid className="citiesHeader">
          <Row>
            <Col>
              <h2>Descriptions</h2>
              <p>View your descriptions here.</p>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Table>
            <thead>
              <tr>
                <th>Description ID</th>
                <th>Text</th>
              </tr>
            </thead>

            <tbody>
              {this.state.descriptions.map(d => (
                <tr key={d.id} onClick={e => this.showDescription(e, d)}>
                  <td>{d.id}</td>
                  <td>{d.text}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Container fluid>
          <Row>
            <Col>
              <Button
                color="primary"
                href="/description/new"
                to="/description/new"
              >
                New
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  showDescription = (e, d) => {
    this.props.history.push('/description/' + d.id);
  };
}

export default Description;
