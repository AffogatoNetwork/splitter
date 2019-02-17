import React, { Component } from "react";
import { Nav, NavItem } from "reactstrap";
import Blockies from "react-blockies";
import { Link, Icon } from "rimble-ui";

class Header extends Component {
  constructor(props) {
    super(props);
    const { drizzle, drizzleState } = this.props;
    this.state = {
      account: drizzleState.accounts[0]
    };
  }

  componentDidMount() {
    const { drizzle } = this.props;
  }

  render() {
    return (
      <Nav className="mt-4 justify-content-end">
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Link href="/">
            <Icon name="CallSplit" size="20" className="mr-1" />
            Splitters
          </Link>
        </NavItem>
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Link href="/newSplitter">
            <Icon name="Add" size="18" className="" />
            <Icon name="CallSplit" size="20" className="mr-1 ml-0" />
            New Splitter
          </Link>
        </NavItem>
        <NavItem className="ml-2 mt-1 text-right ">
          <b>Current Account:</b> <br />
          <label>{this.state.account}</label>
        </NavItem>
        <NavItem className="ml-2 mr-4">
          <Blockies seed={this.state.account} size={10} scale={5} />
        </NavItem>
      </Nav>
    );
  }
}

export default Header;
