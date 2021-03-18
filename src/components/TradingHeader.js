import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { s_w, s_h, f_s, scale } from "../helpers/dimens";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class TradingHeader extends Component {
  state = {
    stocks: [],
  };
  componentDidMount() {
    fetch(`https://latest-stock-price.p.rapidapi.com/any`, {
      headers: {
        "x-rapidapi-key": "c68988b5d5msh5aeb7662f070019p1d530ajsnd9b993c6dda3",
        "x-rapidapi-host": "latest-stock-price.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ stocks: json });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const stocks = this.state;
    {
      return stocks.length > 1 ? (
        <View style={styles.header}>
          <View style={styles.container}>
            <Text style={styles.title_header}>{stocks[0].symbol}</Text>
            <Text style={styles.incdectext}>{stocks[0].open}</Text>
            <Icon name="keyboard-arrow-up" style={styles.incdecicon}></Icon>
            <Text style={styles.subtitle_header}>{stocks[0]}</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.title_header}>{stocks[0]}</Text>
            <Text style={styles.incdectext}>{stocks[0]}</Text>
            <Icon name="keyboard-arrow-down" style={styles.incdecicon} />
            <Text style={styles.subtitle_header}>{stocks[0]}</Text>
          </View>
        </View>
      ) : (
        <View />
      );
    }
  }
}
const styles = StyleSheet.create({
  header: {
    width: s_w,
    height: s_h / 18,
    backgroundColor: "rgba(230,230,230,0.62)",
    shadowColor: "rgba(113,98,98,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
    shadowOpacity: 1,
    shadowRadius: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    width: s_w / 2.4,
    height: s_h / 18,
    backgroundColor: "#E6E6E6",
  },
  title_header: {
    color: "rgba(6,19,255,1)",
    fontSize: 16,
    marginTop: 1,
    marginLeft: 10,
  },
  incdectext: {
    color: "rgba(32,243,4,1)",
    marginTop: -5,
    marginLeft: 115,
    fontSize: 12,
  },
  incdecicon: {
    top: 0,
    left: 108,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  subtitle_header: {
    top: 18,
    left: 10,
    position: "absolute",
    color: "#121212",
    fontSize: 12,
  },
});
