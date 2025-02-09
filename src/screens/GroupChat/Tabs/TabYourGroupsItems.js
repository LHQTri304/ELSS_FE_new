import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon } from "../../../components";
import { group_checkNewMessage } from "../../../api";
import { group_getLastMessageOfGroup } from "../../../api/GroupChatScreens/group_tab_yourGroups";

export default function TabYourGroupsItems(props) {
  let { nameGroup, imageGroup, groupID } = props.group;
  const { onPress } = props;

  const [isNewNotification, setIsNewNotification] = useState(false);
  const [newestMessage, setNewestMessage] = useState(null)

  const checkNewNotification = async () => {
    /* const response = await group_checkNewMessage(groupID);
    setIsNewNotification(response.data === true);

    const responseNewestMessage = await group_getLastMessageOfGroup(groupID);
    setNewestMessage(responseNewestMessage.data); */
  };

  useEffect(() => {
    checkNewNotification();
  }, [groupID]);

  const handlePress = () => {
    setIsNewNotification(false);
    onPress();
  };

  return (    
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={{uri: imageGroup}} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{nameGroup}</Text>
        {/* <Text style={styles.messageText}>{message}</Text> */}
      </View>
      {/* <Text style={styles.timestamp}>{timestamp}</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '2%',
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
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
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
