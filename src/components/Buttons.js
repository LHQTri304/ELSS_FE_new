import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

export const MiddleSingleMediumButton = (props) => {
  const { onPress, title, styleContainer, styleText } = props;

  let fontSizeTitle = fontSizes.h6;
  if (title.length > 10) {
    fontSizeTitle = fontSizes.h7;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.msmContainer, styleContainer]}
    >
      <Text
        style={[
          {
            fontSize: fontSizeTitle,
          },
          styles.defaultText,
          styleText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const FlexButton = ({ onPress, title, styleContainer, styleText }) => {
  let fontSizeTitle = fontSizes.h6;
  if (title.length > 40) {
    fontSizeTitle = fontSizes.h7 * 0.8;
  } else if (title.length > 15) {
    fontSizeTitle = fontSizes.h7;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.flexContainer, styleContainer]}
    >
      <Text
        style={[
          {
            fontSize: fontSizeTitle,
          },
          styles.defaultText,
          styleText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const FlexIconButton = ({
  onPress,
  title,
  icon = icons.errorIcon,
  iconSize = 20,
  iconColor = "black",
  styleContainer,
  styleText,
}) => {
  let fontSizeTitle = fontSizes.h6;
  if (title.length > 40) {
    fontSizeTitle = fontSizes.h7 * 0.8;
  } else if (title.length > 15) {
    fontSizeTitle = fontSizes.h7;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.flexIconContainer, styleContainer]}
    >
      <Icon name={icon} size={iconSize} color={iconColor} />
      <Text
        style={[
          {
            fontSize: fontSizeTitle,
          },
          styles.defaultText,
          styleText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    padding: 11,
    fontWeight: "bold",
    color: colors.PrimaryObjects,
  },
  msmContainer: {
    marginHorizontal: 55,
    marginTop: 20,
    marginBottom: 5,

    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 1,
    borderRadius: 10,

    backgroundColor: colors.PrimaryBackground,

    justifyContent: "center",
    alignItems: "center",
  },
  flexContainer: {
    flex: 1,
    maxWidth: 200,
    marginHorizontal: 5,
    marginVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 3,

    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 1,
    borderRadius: 10,

    backgroundColor: colors.PrimaryBackground,

    justifyContent: "center",
    alignItems: "center",
  },
  flexIconContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 2,
    paddingRight: 6,
    paddingVertical: 3,

    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 1,
    borderRadius: 10,

    backgroundColor: colors.PrimaryBackground,

    justifyContent: "center",
    alignItems: "center",
  },
});
