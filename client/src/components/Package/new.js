import React, { Component } from 'react';
import {
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonGroup
} from 'reactstrap';
class edit extends Component {
  constructor(props) {
    super(props);
    //alert(JSON.stringify(this.props));
    this.state = {
      weight: null,
      signaturerequired: false,
      typeid: null,
      sid: null,
      rid: null,
      category: null,
      type: null,
      dropdownOpen: false
    };

    //this.onRadioBtn1Click = this.onRadioBtn1Click.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSig = this.onSig.bind(this);
    this.submit = this.submit.bind(this);
    //this.figureType = this.figureType.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onChange(e) {
    const state = this.state;
    if (e.target.value === '') {
      state[e.target.name] = null;
    } else {
      state[e.target.name] = e.target.value;
    }
    this.setState(state);
    //alert(JSON.stringify(this.state));
  }

  onSig() {
    this.setState({
      signaturerequired: !this.state.signaturerequired
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  submit() {
    const { weight, sid, rid, signaturerequired, typeid } = this.state;
    const body = {
      weight,
      sid,
      rid,
      signaturerequired,
      typeid
    };
    fetch('/api/package/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(packages => {
        if (packages.error) {
          alert(JSON.stringify(packages.error));
          this.props.history.push('/packages/');
        } else {
          this.props.history.push('/packages/show/' + packages.trackingnumber);
        }
      });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Weight </InputGroupAddon>{' '}
            <Input
              placeholder="2.1"
              name="weight"
              value={this.state.weight}
              onChange={this.onChange}
            />{' '}
            <InputGroupAddon addonType="append"> kg </InputGroupAddon>{' '}
          </InputGroup>{' '}
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Sender ID </InputGroupAddon>{' '}
            <Input
              placeholder="adgE2aDFs14f..."
              name="sid"
              value={this.state.sid}
              onChange={this.onChange}
            />{' '}
          </InputGroup>{' '}
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Receiver ID </InputGroupAddon>{' '}
            <Input
              placeholder="bet5VCXfnsO2..."
              name="rid"
              value={this.state.rid}
              onChange={this.onChange}
            />{' '}
          </InputGroup>{' '}
          <br />
          <InputGroup>
            <ButtonGroup className="mb-2 mr-sm-2 mb-sm-0">
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                size="lg"
              >
                <DropdownToggle caret color="primary">
                  Package Type{' '}
                </DropdownToggle>{' '}
                <DropdownMenu>
                  <DropdownItem
                    name="typeid"
                    value={'6db2b70cb067067ecb87d80032c509f6'}
                    onClick={this.onChange}
                    active={
                      this.state.typeid === '6db2b70cb067067ecb87d80032c509f6'
                    }
                  >
                    Letter - Regular{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="typeid"
                    value={'fd96dc0fccd2f66d66d7f03592582dae'}
                    onClick={this.onChange}
                    active={
                      this.state.typeid === 'fd96dc0fccd2f66d66d7f03592582dae'
                    }
                  >
                    Letter - Priority{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="typeid"
                    value={'7a232a3d7ffb0dca961efc180dcfa9e9'}
                    onClick={this.onChange}
                    active={
                      this.state.typeid === '7a232a3d7ffb0dca961efc180dcfa9e9'
                    }
                  >
                    Letter - Expedited{' '}
                  </DropdownItem>{' '}
                  <DropdownItem divider />
                  <DropdownItem
                    name="typeid"
                    value={'1e2dd17e5e0e3e22dd831aea005ee784'}
                    onClick={this.onChange}
                    active={
                      this.state.typeid === '1e2dd17e5e0e3e22dd831aea005ee784'
                    }
                  >
                    Parcel - Regular{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="typeid"
                    value={'135db3f4df725eea87b13c612a8b09e9'}
                    onClick={this.onChange}
                    active={
                      this.state.typeid === '135db3f4df725eea87b13c612a8b09e9'
                    }
                  >
                    Parcel - Priority{' '}
                  </DropdownItem>{' '}
                  <DropdownItem
                    name="typeid"
                    value={'1710439893647ef3c0ee76c33dce8f7d'}
                    onClick={this.onChange}
                    active={
                      this.state.typeid === '1710439893647ef3c0ee76c33dce8f7d'
                    }
                  >
                    Parcel - Expedited{' '}
                  </DropdownItem>{' '}
                </DropdownMenu>{' '}
              </ButtonDropdown>{' '}
            </ButtonGroup>{' '}
            <ButtonGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Button
                outline
                color="primary"
                name="signaturerequired"
                value={this.state.signaturerequired}
                onClick={this.onSig}
                size="lg"
                active={this.state.signaturerequired === true}
              >
                Signature Required{' '}
              </Button>{' '}
            </ButtonGroup>{' '}
          </InputGroup>{' '}
          <br />
          <br />
          <Button color="success" onClick={this.submit} size="lg" block>
            Submit{' '}
          </Button>{' '}
        </Container>{' '}
      </div>
    );
  }
}

export default edit;
