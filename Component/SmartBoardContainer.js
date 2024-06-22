import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export const SmartBoardContainer = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.SmartBoardContainer}>
        <Text style={styles.loremIpsum}>Smart Board{"\n"}Virsion 1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  SmartBoardContainer: {
    width: 278,
    height: 151,
    backgroundColor: "rgba(185,216,225,1)",
    borderRadius: 24,
    shadowColor: "rgba(155,155,155,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 46,
    marginLeft: 24
  }
});