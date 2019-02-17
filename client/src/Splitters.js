import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { withRouter } from "react-router";
import { Link, Icon, Heading, Button } from "rimble-ui";
import QRCode from "qrcode.react";

class Splitters extends Component {
  constructor(props) {
    super(props);
    const { drizzle, drizzleState } = this.props;
    this.state = {
      splitters: [],
      currentAccount: drizzleState.accounts[0],
      initialized: false
    };
  }

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const splitters = await drizzle.contracts.SplitterFactory.methods
      .getSplitters()
      .call();
    console.log(splitters);
    const initialized = true;
    this.setState({ splitters, initialized });
  }
  render() {
    const { drizzle, drizzleState } = this.props;
    return (
      <>
        <Container className="mt-4">
          <Row className="justify-content-center mt-4">
            <Col lg="12 mt-4">
              <Heading.h2>Splitters List</Heading.h2>
              <Row className="justify-content-center mt-4">
                {this.state.splitters.length == 0 && this.state.initialized && (
                  <Link href="/newSplitter">
                    <Heading.h3>
                      <Icon name="Portrait" size="100" className="mr-1" />
                      There are no splitters created yet, create one!
                    </Heading.h3>
                  </Link>
                )}
                {this.state.splitters.map(function(address, index) {
                  return (
                    <Col lg="4 mt-4" className="text-center" key={index}>
                      <QRCode
                        id=""
                        size={230}
                        value={address}
                        className="m-3"
                      />
                      <div className="text-center">
                        <a href={`/newActor/${address}`}>
                          <Button className="mx-auto">Add Actor</Button>
                        </a>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Splitters);
