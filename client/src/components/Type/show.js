import React from 'react';
import { Button, Container, Table, Row, Col } from 'reactstrap';
import '../../stylesheets/main.css';

class Show extends React.Component {
  state = {
    type: []
  };

  constructor(props, context) {
    super(props, context);

    this.deletetype = this.deletetype.bind(this);
  }

  deletetype() {
    const { match: { params } } = this.props;

    fetch('/api/type/' + params.id, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(id => {
        if (id.error) alert(id.error);
        this.props.history.push('/type/');
      });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch('/api/type/' + params.id)
      .then(res => res.json())
      .then(type => {
        if (type.error) {
          alert(type.error);
          this.props.history.push('/type/');
        } else
          this.setState({
            type: type
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
                <th> Type ID </th> <th> Service Type </th> <th> Category </th>{' '}
              </tr>{' '}
            </thead>
            <tbody>
              {' '}
              {this.state.type.map(t => (
                <tr key={t.id}>
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
              <Button color="primary" onClick={this.deletetype}>
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
