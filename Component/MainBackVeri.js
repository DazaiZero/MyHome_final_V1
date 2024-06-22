import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
const { height, width } = Dimensions.get('screen');
export const MainBackVeri = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect1Stack}>
        <View style={styles.rect1}>
          <View style={styles.rect2}></View>
        </View>
        <View style={styles.rect3}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect1: {
    width: width*1,
    height: height*.45,
    top: height*.05,
    left:width*.15,
    position: "absolute",
    backgroundColor: "rgba(202,158,241,0.63)",
    transform: [
      {
        rotate: "-114.00deg"
      }
    ],
    borderRadius: 55,
  },
  rect2: {
    width: width*.8,
    height: height*.35,
    top:height*.01,
    left:width*.3,
    backgroundColor: "rgba(247,175,158,1)",
    transform: [
      {
        rotate: "-190.00deg"
      }
    ],
    borderRadius: 69,
    opacity: 0.92,
  },
  rect3: {
    top: height*.04,
    left: width*.67,
    width: width*.7,
    height: height*.4,
    position: "absolute",
    backgroundColor: "rgba(135,233,233,1)",
    transform: [
      {
        rotate: "-52.00deg"
      }
    ],
    borderRadius: 63,
    opacity: 0.56
  },
  rect1Stack: {
    top:height*.1
  }
});
