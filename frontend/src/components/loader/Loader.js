import React, { Component } from "react";
import "./Loader.css";
import { loaderStatus } from "./../../utils/utilities";

const LoadingContainer = props => {
  return (
      <div className="lds-spinner fadeIn">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
  );
};

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: true
    };
  }

  componentWillMount() {
    loaderStatus.subscribe(result => {
      this.setState({ loadingStatus: result ? true : false });
    });
  }

  render() {
    const { loadingStatus } = this.state;
    return loadingStatus ? <LoadingContainer /> : null;
  }
}

export default Loader;
