import React from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import '../../stylesheets/main.css';

class New extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            servicetype: '',
            category: ''
        };
    }

    onChange = e => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = e => {
        const { servicetype, category } = this.state;

        e.preventDefault();

        fetch('/api/type/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                servicetype: servicetype,
                category: category
            })
        })
            .then(res => res.json())
            .then(type => {
                if (type.error) {
                    alert(type.error);
                    this.props.history.push('/type');
                } else this.props.history.push('/type/' + type.id);
            });
    };

    render() {
        const { servicetype, category } = this.state;

        return (
            <div>
                <Container fluid className="customer-header">
                    <Row>
                        <Col>
                            <h2> New type </h2> <p> Create a new type here. </p>{' '}
                        </Col>{' '}
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="servicetype"> Service Type </Label>{' '}
                                    <Input
                                        type="text"
                                        name="servicetype"
                                        id="servicetype"
                                        value={servicetype}
                                        onChange={this.onChange}
                                        placeholder="servicetype"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category"> Category </Label>{' '}
                                    <Input
                                        type="text"
                                        name="category"
                                        id="category"
                                        value={category}
                                        onChange={this.onChange}
                                        placeholder="category"
                                    />
                                </FormGroup>
                                <Button type="submit"> Submit </Button>{' '}
                            </Form>{' '}
                        </Col>{' '}
                    </Row>{' '}
                </Container>{' '}
            </div>
        );
    }
}

export default New;
