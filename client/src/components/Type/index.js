import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import '../../stylesheets/main.css';
import Show from './show.js';
import New from './new.js';

export class Type extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/type/" component={Index} />{' '}
        <Route exact path="/type/new" component={New} />{' '}
        <Route exact path="/type/:id" component={Show} />{' '}
      </Switch>
    );
  }
}

class Index extends React.Component {
  state = {
    types: []
  };

  componentDidMount() {
    fetch('/api/type')
      .then(res => res.json())
      .then(types => {
        if (types.error) alert(types.error);
        this.setState({
          types: types
        });
      });
  }

  render() {
    return (
      <div>
        <Container fluid className="citiesHeader">
          <Row>
            <Col>
              <h2> Types </h2> <p> View your package types here. </p>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>
        <Container fluid>
          <Table>
            <thead>
              <tr>
                <th> Type ID </th> <th> Service Type </th> <th> Category </th>{' '}
              </tr>{' '}
            </thead>
            <tbody>
              {' '}
              {this.state.types.map(t => (
                <tr key={t.id} onClick={e => this.showDescription(e, t)}>
                  <td> {t.id} </td> <td> {t.servicetype} </td>{' '}
                  <td> {t.category} </td>{' '}
                </tr>
              ))}{' '}
            </tbody>{' '}
          </Table>{' '}
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <Button color="primary" href="/type/new" to="/type/new">
                New{' '}
              </Button>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
      </div>
    );
  }

  showDescription = (e, t) => {
    this.props.history.push('/type/' + t.id);
  };
}

export default Type;
