import React from 'react';
import { Button, Container, Table } from 'reactstrap';
import '../../stylesheets/main.css';

class Show extends React.Component {
  state = {
    customers: []
  };

  constructor(props, context) {
    super(props, context);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  deleteCustomer() {
    const { match: { params } } = this.props;

    fetch('/api/customer/' + params.id, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(id => {
        if (id.error) alert(id.error);
        this.props.history.push('/customers/');
      });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch('/api/customer/' + params.id)
      .then(res => res.json())
      .then(customers => {
        if (customers.error) {
          alert(customers.error);
          this.props.history.push('/customers/');
        } else
          this.setState({
            customers: customers
          });
      });
  }

  render() {
    const { match: { params } } = this.props;
    return (
      <Container fluid>
        <Table>
          <thead>
            <tr>
              <th> User ID </th> <th> Name </th> <th> Address </th>{' '}
              <th> Phone# </th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {' '}
            {this.state.customers.map(c => (
              <tr key={c.customerid}>
                <td> {c.customerid} </td> <td> {c.name} </td>{' '}
                <td> {c.address} </td> <td> {c.phone} </td>{' '}
              </tr>
            ))}{' '}
          </tbody>{' '}
        </Table>{' '}
        <Button color="primary" onClick={this.deleteCustomer}>
          {' '}
          Delete{' '}
        </Button>{' '}
        <Button
          color="primary"
          href={'/customers/edit/' + params.id}
          to={'/customers/edit/' + params.id}
        >
          {' '}
          Edit{' '}
        </Button>{' '}
      </Container>
    );
  }
}
export default Show;
