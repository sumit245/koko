import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  ImageEditor,
} from "react-native";
import { colors } from "../helpers/colors";
import { s_w } from "../helpers/dimens";
import filter from "lodash/filter";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
const Item = ({ symbol, opening, volume, ltp, change, perchange }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={styles.column}>
        <Text style={[styles.title, { color: colors.primary_color }]}>
          {symbol}
        </Text>
        <Text style={[styles.title, { fontSize: 10, color: "#777" }]}>
          {volume}
        </Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.volume}>BID</Text>
        <Text style={styles.volume}>{ltp.toFixed(2)}</Text>
        <Text
          style={[
            styles.title,
            { color: perchange >= 0 ? "green" : "red", fontSize: 10 },
          ]}
        >
          {(ltp + change).toFixed(2)}
        </Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.volume}>ASK</Text>
        <Text style={styles.volume}>{opening}</Text>
        <Text
          style={[
            styles.title,
            { color: perchange >= 0 ? "red" : "green", fontSize: 10 },
          ]}
        >
          {(opening + perchange).toFixed(2)}
        </Text>
      </View>
    </View>
  </View>
);

export default class KeyTableStat extends Component {
  state = {
    tableData: [],
    query: "",
    data: [],
  };
  handleSearch = (text) => {
    const formattedQuery = text.toUpperCase();
    const filteredData = filter(this.state.tableData, (symbol) => {
      return this.contains(symbol, formattedQuery);
    });
    this.setState({ data: filteredData, query: formattedQuery });
  };
  contains = ({ symbol }, query) => {
    // console.log(symbol);
    if (symbol.includes(query)) {
      return true;
    }

    return false;
  };

  getStock = () => {
    fetch(`https://latest-stock-price.p.rapidapi.com/any`, {
      headers: {
        "x-rapidapi-key": "c68988b5d5msh5aeb7662f070019p1d530ajsnd9b993c6dda3",
        "x-rapidapi-host": "latest-stock-price.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    // Call this function so that it fetch first time right after mounting the component
    this.getStock();
    // set Interval
    // this.interval = setInterval(this.getStock, 10000);
  }

  renderItem = ({ item }) => (
    <Item
      key={item.symbol}
      symbol={item.symbol}
      opening={item.open}
      change={item.change}
      ltp={item.lastPrice}
      volume={item.totalTradedVolume}
      perchange={item.pChange}
    />
  );
  renderHeader = () => {
    const data = this.state.data;
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 1,
          marginVertical: 1,
          borderRadius: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={this.state.query}
          onChangeText={(queryText) => this.handleSearch(queryText)}
          placeholder="Search"
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 2,
            width: s_w / 1.3,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ tableData: data });
          }}
        >
          <Icon
            name="add"
            size={26}
            color={colors.error_color}
            style={{ elevation: 2, borderRadius: 1, fontWeight: "bold" }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const state = this.state;
    return (
      <FlatList
        data={state.tableData}
        ListHeaderComponent={this.renderHeader}
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
