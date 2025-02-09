import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_checkNewMessage } from "../../../api";

export default TabYourFriendsItems = (props) => {
  let { fulName, image } = props.friend.information;
  let { userName } = props.friend;
  const { onPress } = props;

  const avatar = image;
  const name = fulName;
  const message = "latestMessage";
  const timestamp = "timeSend";

  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(() => {
    checkNewNotification();
    const intervalId = setInterval(checkNewNotification, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const checkNewNotification = async () => {
    const response = await friend_checkNewMessage(userName);
    setIsNewNotification(response.data === true);
  };

  const ToMessage = async () => {
    try {
      setIsNewNotification(false);
      onPress(
        await AsyncStorage.getItem("username"),
        userName,
        setIsNewNotification()
      );
    } catch (exception) {
      console.error(exception.message);
    }
  };

  return (
    <TouchableOpacity onPress={ToMessage} style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "2%",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  messageText: {
    color: colors.GrayBackground,
    fontSize: 14,
  },
  timestamp: {
    color: colors.GrayBackground,
    fontSize: 12,
  },
});
