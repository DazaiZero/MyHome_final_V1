import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
const { height, width } = Dimensions.get('screen');
export const HeaderBackStyle = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect2Stack}>
        <View style={styles.rect2}></View>
        <View style={styles.rect}></View>
        <View style={styles.rect3}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect2: {
    top: height*.04,
    left: width*.15,
    width: width*.9,
    height: height*.45,
    position: "absolute",
    backgroundColor: "rgba(202,158,241,1)",
    transform: [
      {
        rotate: "-75.00deg"
      }
    ],
    borderRadius: 55,
    opacity: 0.63,
  },
  rect: {
    width: width*.7,
    height: height*.4,
    position: "absolute",
    backgroundColor: "rgba(247,175,158,1)",
    transform: [
      {
        rotate: "124.00deg"
      }
    ],
    borderRadius: 69,
    opacity: 0.92,
  },
  rect3: {
    top: height*.05,
    left: width*.5,
    width: width*.6,
    height: height*.25,
    position: "absolute",
    backgroundColor: "rgba(135,233,233,1)",
    transform: [
      {
        rotate: "-58.00deg"
      }
    ],
    borderRadius: 63,
    opacity: 0.56,
  },
  rect2Stack: {
    top:height*.1,
    left:width*.01
  }
});
