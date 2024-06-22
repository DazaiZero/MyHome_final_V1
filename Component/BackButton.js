import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export const BackButton = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.backButtonOpacity}>
        <Icon name="arrow-left" style={styles.backButtonIcon}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  backButtonOpacity: {
    width: 78,
    height: 76,
    backgroundColor: "rgba(138,149,236,1)",
    borderRadius: 100
  },
  backButtonIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 40,
    width: 40,
    marginTop: 18,
    marginLeft: 19
  }
});

