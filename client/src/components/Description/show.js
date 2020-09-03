import React from 'react';
import { Button, Container, Table, Row, Col } from 'reactstrap';
import '../../stylesheets/main.css';

class Show extends React.Component {
  state = {
    description: []
  };

  constructor(props, context) {
    super(props, context);

    this.deleteDescription = this.deleteDescription.bind(this);
  }

  deleteDescription() {
    const { match: { params } } = this.props;

    fetch('/api/description/' + params.id, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(id => {
        if (id.error) alert(id.error);
        this.props.history.push('/description/');
      });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch('/api/description/' + params.id)
      .then(res => res.json())
      .then(description => {
        if (description.error) {
          alert(description.error);
          this.props.history.push('/description/');
        } else
          this.setState({
            description: description
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
                <th> Description ID </th> <th> Text </th>{' '}
              </tr>{' '}
            </thead>
            <tbody>
              {' '}
              {this.state.description.map(d => (
                <tr key={d.id}>
                  <td> {d.id} </td> <td> {d.text} </td>{' '}
                </tr>
              ))}{' '}
            </tbody>{' '}
          </Table>{' '}
        </Container>{' '}
        <Container fluid>
          <Row>
            <Col>
              <Button color="primary" onClick={this.deleteDescription}>
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
