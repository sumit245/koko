import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import KeyTableStat from "../components/KeyTableStat";
import { s_w, s_h, f_s, scale } from "../helpers/dimens";
import TradingHeader from "../components/TradingHeader";
import CardLayout from "../components/CardLayout";
import ShowMatchComponent from "../components/ShowMatchComponent";

function Complete({ navigation }) {
  return (
    <SafeAreaView>
      <StatusBar />
      <TradingHeader />
      <View contentContainerStyle={styles.scrollArea}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>MARKETS TODAY</Text>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("Tradings");
          // }}
          >
            <Text style={styles.moreBtn}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <CardLayout />
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>TRENDING STOCKS</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tradings");
            }}
          >
            <Text style={styles.moreBtn}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect6}>
          <KeyTableStat />
        </View>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>MATCHES</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Matches");
            }}
          >
            <Text style={styles.moreBtn}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect6}>
          <ShowMatchComponent navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    width: s_w,
    height: s_h,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
    marginHorizontal: 4,
  },

  sectionTitle: {
    color: "#121212",
    fontSize: 16,
    textAlign: "justify",
  },
  moreBtn: {
    color: "rgba(239,57,57,1)",
    fontSize: 16,
    textAlign: "justify",
  },
  rect6: {
    width: s_w,
    height: 170,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 5,
    marginLeft: 2,
  },
  searchbar: {
    padding: 0,
    borderWidth: 0,
    height: 10,
    width: s_w / 1.2,
    marginLeft: 5,
  },
  searchview: {
    flexDirection: "row",
  },
});

export default Complete;
