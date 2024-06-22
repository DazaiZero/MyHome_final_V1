import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
const { height, width } = Dimensions.get('screen');

export const SubmitButton = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity 
        style={styles.button}
        onPress={()=>{
            Auth.signIn(username, password)
            .then(() => {
              getUser();
            })
            .catch((err) => alert(JSON.stringify(err)))
          }
        }
      >
        <Icon name="arrow-right" style={styles.submitIcon}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: width*.2,
    height: height*.09,
    backgroundColor: "rgba(113,192,230,1)",
    borderRadius: 100
  },
  submitIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    top:height*.02,
    left:width*.04,
  }
});
