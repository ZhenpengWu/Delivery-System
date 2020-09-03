import React from 'react';
import { Button, Container, Table, Row, Col } from 'reactstrap';
import '../../stylesheets/main.css';

class Show extends React.Component {
  state = {
    cities: []
  };

  constructor(props, context) {
    super(props, context);

    this.deleteCity = this.deleteCity.bind(this);
  }

  deleteCity() {
    const { match: { params } } = this.props;

    fetch('/api/city/' + params.id, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(cityid => {
        if (cityid.error) alert(cityid.error);
        this.props.history.push('/city/');
      });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch('/api/city/' + params.id)
      .then(res => res.json())
      .then(cities => {
        if (cities.error) {
          alert(cities.error);
          this.props.history.push('/city/');
        } else
          this.setState({
            cities: cities
          });
      });
  }

  render() {
    return (
      <div>
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
                <tr key={c.cityid}>
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
              <Button color="primary" onClick={this.deleteCity}>
                Delete{' '}
              </Button>{' '}
            </Col>{' '}
          </Row>{' '}
        </Container>{' '}
      </div>
    );
  }
}

export default Show;
