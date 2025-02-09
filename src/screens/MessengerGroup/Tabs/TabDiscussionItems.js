import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon, FlexIconButton } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profile_getAvatar } from "../../../api";

function TabDiscussionItems(props) { //console.log(props.topic)
  const { content, comments, likes } = props.topic;
  const { fulName, image: avatar } = props.topic.userCreated.information;
  const { onPress } = props;

  //
  const [header, setHeader] = useState("props.topic.header");
  //

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
        <Image style={styles.avatarContainer} source={{ uri: avatar }} />
        <Text style={styles.username} numberOfLines={1}>
          {fulName}
        </Text>
      </View>
      {/* <Text style={styles.title}>{header}</Text> */}
      <Text style={styles.content} numberOfLines={4}>
        {content}
      </Text>
      <View style={styles.bottomView}>
        <FlexIconButton
          onPress={() => {
            alert("Like");
          }}
          title={likes ? likes.length : "Like"}
          icon={icons.inactiveLikeIcon}
          iconSize={20}
          iconColor={colors.GrayOnContainerAndFixed}
          styleContainer={styles.btnContainer}
          styleText={styles.btnText}
        />
        <FlexIconButton
          onPress={() => {
            alert("Comment");
          }}
          title={comments ? comments.length : "Bình Luận"}
          icon={icons.activeChatMessageIcon}
          iconSize={20}
          iconColor={colors.GrayOnContainerAndFixed}
          styleContainer={styles.btnContainer}
          styleText={styles.btnText}
        />
      </View>
    </TouchableOpacity>
  );
}
export default TabDiscussionItems;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingStart: 10,
    flexDirection: "column",
    borderColor: colors.transparentBlack15,
    borderBottomWidth: 3,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  //
  avatarContainer: {
    width: 22,
    height: 22,
    resizeMode: "cover",
    borderRadius: 180,
    borderWidth: 0.5,
    borderColor: colors.GrayBackground,
  },
  username: {
    maxWidth: "80%",
    marginLeft: 10,
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  title: {
    maxWidth: "95%",
    marginVertical: 10,
    color: "black",
    fontSize: fontSizes.h6,
    fontWeight: "bold",
  },
  content: {
    marginVertical: 10,
    marginRight: 10,
    color: "black",
    fontSize: fontSizes.h7,
  },
  //
  btnContainer: {
    backgroundColor: null,
    marginVertical: 10,
    marginLeft: 0,
  },
  btnText: {
    padding: 1,
    fontSize: fontSizes.h7,
    color: colors.GrayOnContainerAndFixed,
  },
});
