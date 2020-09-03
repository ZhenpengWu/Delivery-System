import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"> Ship304 </NavbarBrand>{' '}
          <NavbarToggler onClick={this.toggle} />{' '}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/packages/" to="/packages">
                  Package{' '}
                </NavLink>{' '}
              </NavItem>{' '}
              <NavItem>
                <NavLink href="/customers/" to="/customer">
                  Customer{' '}
                </NavLink>{' '}
              </NavItem>{' '}
              <NavItem>
                <NavLink href="/city/" to="/city">
                  City{' '}
                </NavLink>{' '}
              </NavItem>{' '}
              <NavItem>
                <NavLink href="/description/" to="/description">
                  Description{' '}
                </NavLink>{' '}
              </NavItem>{' '}
              <NavItem>
                <NavLink href="/type/" to="/type">
                  Type{' '}
                </NavLink>{' '}
              </NavItem>{' '}
              <NavItem>
                <NavLink href="/status/" to="/status">
                  Status{' '}
                </NavLink>{' '}
              </NavItem>{' '}
            </Nav>{' '}
          </Collapse>{' '}
        </Navbar>{' '}
      </div>
    );
  }
}

export default Header;
