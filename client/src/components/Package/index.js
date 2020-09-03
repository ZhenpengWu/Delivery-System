import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormGroup,
  ButtonDropdown,
  DropdownMenu,
  Label,
  DropdownToggle,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import '../../stylesheets/main.css';
import Show from './show';
import New from './new';
export class Package extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/packages/" component={Index} />{' '}
        <Route path="/packages/show/:trackingnumber" component={Show} />{' '}
        <Route path="/packages/new/" component={New} />{' '}
      </Switch>
    );
  }
}

class Index extends Component {
  constructor() {
    super();
    this.state = {
      packages: [],
      sidfilter: null,
      ridfilter: null,
      trackingnumber: null,
      signaturefilter: null,
      sortby: null,
      sortorder: null,
      aggregation: null,
      groupby: null,
      groupagg: null,
      dropdown1Open: false,
      dropdown2Open: false,
      dropdown3Open: false
    };
    //this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.handleAggregation = this.handleAggregation.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
  }
  toggle1() {
    this.setState({
      dropdown1Open: !this.state.dropdown1Open
    });
  }
  toggle2() {
    this.setState({
      dropdown2Open: !this.state.dropdown2Open
    });
  }
  toggle3() {
    this.setState({
      dropdown3Open: !this.state.dropdown3Open
    });
  }

  componentDidMount() {
    fetch('/api/package/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {}
    })
      .then(res => res.json())
      .then(packages => {
        this.setState({
          packages: packages
        });
      });
  }

  handleAggregation() {
    const aggOp = this.state.aggregation;
    fetch('/api/package/aggweights/' + aggOp, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) alert(result.error);
        else alert(JSON.stringify(Object.values(result[0])[0]));
      });
  }

  handleGroup() {
    const body = {
      groupBy: this.state.groupby,
      aggOp: this.state.groupagg
    };
    fetch('/api/package/avgsweight/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) alert(result.error);
        else alert(JSON.stringify(Object.values(result[0])[0]));
      });
  }

  onChange(e) {
    const state = this.state;
    if (e.target.value === '') {
      state[e.target.name] = null;
    } else {
      state[e.target.name] = e.target.value;
    }
    this.setState(state);
  }

  handleFilter() {
    const body = this.state;
    fetch('/api/package/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(packages => {
        //alert(JSON.stringify(packages));
        this.setState({
          packages: packages
        });
      });
  }

  showPackage(tn) {
    this.props.history.push('/packages/show/' + tn);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleFilter();
    }
  }
  render() {
    return (
      <div>
        <Container fluid>
          <h2> Packages </h2>{' '}
        </Container>{' '}
        <br />
        <Container fluid>
          <Button outline color="primary" href="/packages/new">
            {' '}
            Add new package{' '}
          </Button>{' '}
        </Container>{' '}
        <br />
        <Container fluid>
          <h5> View your packages here </h5>{' '}
        </Container>{' '}
        <Container fluid>
          <Row>
            <Col
              sm="12"
              md={{
                size: 8,
                offset: 2
              }}
            >
              <InputGroup>
                <Input
                  type="text"
                  name="trackingnumber"
                  value={this.state.trackingnumber}
                  onKeyPress={this.handleKeyPress}
                  onChange={this.onChange}
                  placeholder="tracking number"
                />
                <InputGroupAddon addonType="append">
                  {' '}
                  <Button outline color="primary" onClick={this.handleFilter}>
                    {' '}
                    Search{' '}
                  </Button>
                </InputGroupAddon>
              </InputGroup>{' '}
            </Col>{' '}
          </Row>{' '}
          <br />
          <Row>
            <Col xs="6">
              <Label>
                <th> Find aggregation for weights of all packages </th>{' '}
              </Label>{' '}
            </Col>{' '}
            <Col xs="6">
              <Label>
                <th>
                  Group by sender / receiver to get average weight of their
                  packages, then find MAX / MIN{' '}
                </th>{' '}
              </Label>{' '}
            </Col>{' '}
          </Row>{' '}
          <Row>
            <Col xs="6">
              <InputGroup>
                <Input
                  type="text"
                  name="aggregation"
                  value={this.state.aggregation}
                  onChange={this.onChange}
                  placeholder="Aggregation Operator (MAX, MIN, AVG, COUNT)"
                />
                <InputGroupAddon addonType="append">
                  <Button
                    outline
                    color="primary"
                    onClick={this.handleAggregation}
                  >
                    Find{' '}
                  </Button>{' '}
                </InputGroupAddon>{' '}
              </InputGroup>{' '}
            </Col>{' '}
            <Col xs="6">
              <InputGroup>
                <Input
                  type="text"
                  name="groupby"
                  value={this.state.groupby}
                  onChange={this.onChange}
                  placeholder="Group By (senderid, receiverid)"
                />
                <Input
                  type="text"
                  name="groupagg"
                  value={this.state.groupagg}
                  onChange={this.onChange}
                  placeholder="Aggregation Operator (MAX, MIN)"
                />
                <InputGroupAddon addonType="append">
                  <Button outline color="primary" onClick={this.handleGroup}>
                    {' '}
                    Find{' '}
                  </Button>{' '}
                </InputGroupAddon>{' '}
              </InputGroup>{' '}
            </Col>{' '}
          </Row>{' '}
          <br />
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                type="text"
                name="sidfilter"
                id="sidfilter"
                placeholder="sender id"
                onChange={this.onChange}
              />{' '}
            </FormGroup>{' '}
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                type="text"
                name="ridfilter"
                id="ridfilter"
                placeholder="receiver id"
                onChange={this.onChange}
              />{' '}
            </FormGroup>{' '}
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <ButtonDropdown
                isOpen={this.state.dropdown1Open}
                toggle={this.toggle1}
              >
                <DropdownToggle caret>Signature </DropdownToggle>{' '}
                <DropdownMenu>
                  <DropdownItem
                    name="signaturefilter"
                    value={null}
                    onClick={this.onChange}
                  >
                    {' '}
                    Any{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="signaturefilter"
                    value={true}
                    onClick={this.onChange}
                  >
                    {' '}
                    Required{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="signaturefilter"
                    value={false}
                    onClick={this.onChange}
                  >
                    {' '}
                    Not Required{' '}
                  </DropdownItem>{' '}
                </DropdownMenu>{' '}
              </ButtonDropdown>{' '}
            </FormGroup>{' '}
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <ButtonDropdown
                isOpen={this.state.dropdown2Open}
                toggle={this.toggle2}
              >
                <DropdownToggle caret>Sort By </DropdownToggle>{' '}
                <DropdownMenu>
                  <DropdownItem
                    name="sortby"
                    value={'weight'}
                    onClick={this.onChange}
                  >
                    {' '}
                    Weight{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="sortby"
                    value={'type'}
                    onClick={this.onChange}
                  >
                    {' '}
                    Type{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="sortby"
                    value={'senderId'}
                    onClick={this.onChange}
                  >
                    {' '}
                    Sender{' '}
                  </DropdownItem>{' '}
                </DropdownMenu>{' '}
              </ButtonDropdown>{' '}
            </FormGroup>{' '}
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <ButtonDropdown
                isOpen={this.state.dropdown3Open}
                toggle={this.toggle3}
              >
                <DropdownToggle caret>Order </DropdownToggle>{' '}
                <DropdownMenu>
                  <DropdownItem
                    name="sortorder"
                    value={'ASC'}
                    onClick={this.onChange}
                  >
                    {' '}
                    ⬆{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="sortorder"
                    value={'DESC'}
                    onClick={this.onChange}
                  >
                    {' '}
                    ⬇{' '}
                  </DropdownItem>{' '}
                </DropdownMenu>{' '}
              </ButtonDropdown>{' '}
            </FormGroup>{' '}
            <Button onClick={this.handleFilter}> Filter </Button>{' '}
          </Form>{' '}
          <br />
        </Container>{' '}
        <Container fluid>
          <Table hover>
            <thead>
              <tr>
                <th> Tracking Number </th> <th> Weight </th> <th> Type </th>{' '}
                <th> Signature </th> <th> Sender </th> <th> Receiver</th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody>
              {' '}
              {this.state.packages.map(p => (
                <tr
                  key={p.trackingnumber}
                  onClick={e => this.showPackage(p.trackingnumber)}
                >
                  <td> {p.trackingnumber} </td> <td> {p.weight} </td>{' '}
                  <td> {p.type} </td>{' '}
                  <td> {p.signaturerequired.toString()} </td>{' '}
                  <td> {p.senderid} </td> <td> {p.receiverid} </td>{' '}
                </tr>
              ))}{' '}
            </tbody>{' '}
          </Table>{' '}
        </Container>{' '}
        <br />
      </div>
    );
  }
}
