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
import axios from "axios";
import { images, colors, icons, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../DomainAPI";

function TabTypePostItems(props) {
  let { nameSubject, subjectID } = props.type;

  const { onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
      <Image source={images.activeChatMessageIcon} style={styles.icon} />
        <Text style={styles.text}>{nameSubject}</Text>
      </View>
      <Text style={styles.content} numberOfLines={5} >Số bài đăng: 1</Text>
    </TouchableOpacity>
  );
}
export default TabTypePostItems;

const styles = StyleSheet.create({
  container: {
    height: 60,
    margin: 10,
    paddingStart: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderRadius: 10,
    elevation: 8,
    backgroundColor: colors.ShadowedItems,
  },
  topView: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
    resizeMode: "stretch",
    tintColor: colors.postIcon,
  },
  text: {
    marginTop: 5,
    marginLeft: 5,
    color: "black",
    fontSize: fontSizes.h5,
  },
  content: {
    marginLeft: 7,
    marginRight: 10,
    color: "black",
    fontSize: fontSizes.h7,
  }
});