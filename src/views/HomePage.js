import React, { Component } from "react";
import OtherBanner from "../components/OtherBanner";
import Complete from "./Complete";

export default class HomePage extends Component {
  componentDidMount() {
    // console.log(this.props);r
  }
  render() {
    return (
      <>
        <Complete navigation={this.props.navigation} />
        {/* <OtherBanner/> */}
      </>
    );
  }
}
