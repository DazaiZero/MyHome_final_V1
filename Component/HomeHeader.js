import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');

function HomeHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect4}>
        <View style={styles.rect1Stack}>
          <View style={styles.rect1}></View>
          <View style={styles.rect2}></View>
          <View style={styles.rect3}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    height:height,
    width:width,
  },
  rect4: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    position:'absolute',
    height:height*.2,
    width:width*1,
    left:-width*.118,
    top:height*.01
  },
  rect1: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    position:'absolute',
    backgroundColor: "rgba(202,158,241,1)",
    transform: [
      {
        rotate: "-77.00deg"
      }
    ],
    borderRadius: 55,
    opacity: 0.63,
    height:height*.95,
    width:width*.45,
    top:-height*.52,
    left:-width*.56,
  },
  rect2: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    position:'absolute',
    backgroundColor: "rgba(247,175,158,1)",
    transform: [
      {
        rotate: "124.00deg"
      }
    ],
    borderRadius: 69,
    opacity: 0.92,
    height:height*.5,
    width:width*.5,
    top:-height*.4,
    left:-width*.6
  },
  rect3: {
    flex:1,
    backgroundColor:'red',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    position:'absolute',
    transform: [
      {
        rotate: "-238.00deg"
      }
    ],
    borderRadius: 63,
    opacity: 0.56,
    backgroundColor: "rgba(135,233,233,1)",
    height:height*.55,
    width:width*.5,
    top:-height*.39,
    left:-width*.27
  },
  rect1Stack: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    position:'absolute',
    height:height*1,
    width:width*1,
    top:height*.1,
    left:width*.5
  }
});

export default HomeHeader;
