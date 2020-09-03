import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { Package } from './Package/index';
import { Customers } from './Customer/index';
import { City } from './City/index';
import { Description } from './Description/index';
import { Type } from './Type/index';
import { Status } from './Status/index';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/packages" component={Package} />
        <Route path="/customers" component={Customers} />
        <Route path="/city" component={City} />
        <Route path="/description" component={Description} />
        <Route path="/type" component={Type} />
        <Route path="/status" component={Status} />
      </Switch>
    );
  }
}

class Splash extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-1">CPSC 304 Project</h1>
          <h1 className="display-4">Group 85</h1>
          <hr />
          <p className="lead">This application models a delivery system</p>
          <p className="lead">Use navigation on top of the page</p>
        </Container>
      </Jumbotron>
    );
  }
}

export default Main;
