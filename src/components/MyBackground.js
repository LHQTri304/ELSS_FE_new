import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../constants";

export default QuickBackGround = ({ style }) => (
  <View style={[styles.container, style]}>
    <View style={[styles.circle, styles.c1]}/>
    <View style={[styles.circle, styles.c2]}/>
    <View style={[styles.circle, styles.c3]}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.PrimaryContainer,
  },
  circle: {
    position: "absolute",
    backgroundColor: colors.transparentWhite25,
    borderRadius: 180,
  },
  c1: {
    top: -100,
    left: -100,
    width: 300,
    height: 300,
  },
  c2: {
    bottom: -100,
    right: -50,
    width: 250,
    height: 250,
  },
  c3: {
    bottom: -150,
    right: 100,
    width: 250,
    height: 230,
  },
});
