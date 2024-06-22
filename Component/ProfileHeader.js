import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');
function ProfileHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect9Stack}>
        <View style={styles.rect9}></View>
        <View style={styles.rect10}></View>
        <View style={styles.rect11}></View>
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
    marginTop:height*.13,
    left: width*.465,  
  },
  rect9: {
    flex:1,
    top: height*.001,
    left: width*.12,
    width: width*.6,
    height: height*.55,
    position:'absolute',
    justifyContent:'center',
    alignContent:'center',
    backgroundColor: "rgba(202,158,241,1)",
    transform: [
      {
        rotate: "-101.00deg"
      }
    ],
    borderRadius: 55,
    opacity: 0.63
  },
  rect10: {
    top: height*.05,
    left: width*.01,
    width: width*.5,
    height: height*.35,
    position: "absolute",
    backgroundColor: "rgba(247,175,158,1)",
    transform: [
      {
        rotate: "201.00deg"
      }
    ],
    borderRadius: 69,
    opacity: 0.92
  },
  rect11: {
    left: width*.1,
    width: width*.55,
    height: height*.25,
    position: "absolute",
    transform: [
      {
        rotate: "-119.00deg"
      }
    ],
    borderRadius: 63,
    opacity: 0.56,
    backgroundColor: "rgba(135,233,233,1)",
    top: height*.09
  },
  rect9Stack: {
    width: width*1,
    height: height*.4,
    marginTop: -height*.15,
    marginLeft: -width*.04
  }
});

export default ProfileHeader;
