import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, QuickBackGround } from "../../components";

export default SharedLayout = ({ navigation, renderContent }) => {
  const { navigate, goBack } = navigation;
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <QuickBackGround/>
      <View>{renderContent()}</View>

      <UIHeader
        //title={"Đuổi Hình Xếp Chữ"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={styles.UIHeaderMainStyle}
        iconStyle={styles.UIHeaderIconStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GrayContainer,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
  },
  //
  UIHeaderMainStyle: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: null,
  },
  UIHeaderIconStyle: { tintColor: colors.inactive },
});
