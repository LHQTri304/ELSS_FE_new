import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import { MiddleSingleMediumButton } from "../components";
import { user_login } from "../api";
import axios from "axios";

export default ScreenTestAPI = (props) => {
  const { navigate, goBack, push } = props.navigation;

  const handleBtn = async () => {
    alert("go");
  };

  return (
    <View style={styles.container}>
      <MiddleSingleMediumButton
        onPress={handleBtn}
        title={"Đăng nhập".toUpperCase()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryContainer,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
