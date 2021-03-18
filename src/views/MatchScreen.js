import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { s_w } from "../helpers/dimens";

const Item = ({ logo_A, logo_B, title, status, score_A, score_B }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>
        <Image source={{ uri: logo_A }} style={{ height: 30, width: 30 }} />
        <Text>{score_A}</Text>
      </View>
      <Text style={styles.volume}>{title}</Text>
      <View>
        <Image source={{ uri: logo_B }} style={{ height: 30, width: 30 }} />
        <Text>{score_B}</Text>
      </View>
    </View>
  </View>
);
export default class MatchScreen extends Component {
  state = {
    tableData: [],
  };
  getMatches = () => {
    fetch(
      `https://rest.entitysport.com/v2/matches/?status=3&commentary=1&token=f572f4d3cde3b0af35f4f2bdba081043`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json.response.items });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    // Call this function so that it fetch first time right after mounting the component
    this.getMatches();
    // set Interval
    // this.interval = setInterval(this.getMatches, 1000);
  }

  // componentWillUnmount() {
  //   // Clear the interval right before component unmount
  //   clearInterval(this.interval);
  // }
  renderItem = ({ item }) => (
    <Item
      logo_A={item.teama.logo_url}
      logo_B={item.teamb.logo_url}
      title={item.title}
      status={item.competition.status}
      score_A={item.teama.scores_full}
      score_B={item.teamb.scores_full}
    />
  );
  render() {
    const state = this.state;
    console.log(this.props.route.params.itemId);
    {
      if (typeof this.props.route.params.itemId === "number") {
        return (
          <FlatList
            data={state.tableData}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.symbol}
            contentContainerStyle={{
              flex: 1,
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          />
        );
      } else {
        return <View></View>;
      }
    }
  }
}
const styles = StyleSheet.create({
  item: {
    padding: 2,
    marginVertical: 1,
    borderBottomColor: "#777",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  volume: {
    fontSize: 12,
    fontWeight: "bold",
  },
  column: {
    width: s_w / 2.5,
  },
});
