import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon, FlexIconButton } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user_authenticate } from "../../../api";

function TabDiscussionItems(props) {
  //const {content, comments, likes} = props.topic;
  //const {fulName} = props.topic.userCreated.information;
  const { onPress } = props;

  //
  const [content, setContent] = useState(props.topic.content);
  const [comments, setComments] = useState(props.topic.comments);
  const [likes, setLikes] = useState(props.topic.likes);
  const [fulName, setName] = useState(props.topic.fulName);
  const [avatar, setAvatar] = useState(props.topic.img);
  const [header, setHeader] = useState(props.topic.header);
  //

  const [username, setUserName] = useState("");

  /* useEffect(() => {
    const fetchData = async () => {
      setUserName(await AsyncStorage.getItem('username'));
    };
    fetchData();
  }, [props.userName, username]); */

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
        <Image style={styles.avatarContainer} source={{ uri: avatar }} />
        <Text style={styles.username} numberOfLines={1}>
          {fulName}
        </Text>
      </View>
      <Text style={styles.title}>{header}</Text>
      <Text style={styles.content} numberOfLines={3}>
        {content}
      </Text>
      <View style={styles.bottomView}>
        <FlexIconButton
          onPress={() => {
            alert("Like");
          }}
          title={likes ? likes : "Like"}
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
