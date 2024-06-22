import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

export const RegistrationHeader = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect1Stack}>
        <View style={styles.rect1}></View>
        <View style={styles.rect2}></View>
        <View style={styles.rect3}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect1: {
    top: height*.021,
    left: width*.05,
    width: width*1,
    height: height*.4,
    position: "absolute",
    backgroundColor: "rgba(202,158,241,1)",
    transform: [
      {
        rotate: "-77.00deg"
      }
    ],
    borderRadius: 55,
    opacity: 0.63
  },
  rect2: {
    width: width*.7,
    height: height*.4,
    top:height*.01,
    left:width*.1,
    position: "absolute",
    backgroundColor: "rgba(247,175,158,1)",
    transform: [
      {
        rotate: "124.00deg"
      }
    ],
    borderRadius: 69,
    opacity: 0.92
  },
  rect3: {
    top: height*.2,
    left: width*.55,
    width: width*.65,
    height: height*.2,
    position: "absolute",
    backgroundColor: "rgba(135,233,233,1)",
    transform: [
      {
        rotate: "-238.00deg"
      }
    ],
    borderRadius: 63,
    opacity: 0.56
  },
  rect1Stack: {
    top:height*.00,
    left:width*.06
  }
});
