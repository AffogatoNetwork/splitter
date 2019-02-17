import React, { Component } from "react";
import "./App.css";
import { ThemeProvider } from "rimble-ui";
import Header from "./Header";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import NewSplitter from "./NewSplitter";
import NewActor from "./NewActor";
import Splitters from "./Splitters";

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;
    console.log(drizzle);
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Application...";
    return (
      <ThemeProvider>
        <Header
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Splitters
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          )}
        />
        <Route
          exact
          path="/newSplitter"
          render={() => (
            <NewSplitter
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          )}
        />
        <Route
          exact
          path="/newActor/:splitterAddress"
          render={() => (
            <NewActor
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          )}
        />
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
