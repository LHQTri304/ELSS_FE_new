import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";

function TabDiscussionItems(props) {
  let { name } = props.topic;
  const { onPress } = props;

  let fontSizeName = fontSizes.h5;
  if (name.length > 22) {
    fontSizeName = fontSizes.h6;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Image /** Avatar */
          style={styles.blogIcon}
          source={images.blogSearchIcon}
        />
      </View>

      <View style={styles.textView}>
        <Text /** Name */
          style={{
            color: "black",
            fontSize: fontSizeName,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default TabDiscussionItems;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 20,
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  blogIcon: {
    width: 55,
    height: 55,
    resizeMode: "cover",
    borderRadius: 90,
    marginRight: 15,
    alignSelf: "center",
    tintColor: colors.blogIcon,
  },
  textView: {
    flexDirection: "column",
    flex: 4,
    marginRight: 10,
  },
});
