import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { FlexIconButton } from "../../components";

import ReplyItems from "./ReplyItems";

export default function CommentItems(props) {
  const { onPress } = props;
  /* const { commentID, dateComment, userComment, content, replies, files } =
    props.comment; */

  //
  const [dateComment, setD] = useState(props.comment.dateComment);
  const [img, setI] = useState(props.comment.img);
  const [name, setN] = useState(props.comment.userName);
  const [content, setCD] = useState(props.comment.content);
  const [replies, setRr] = useState(props.comment.replies);
  const [files, setFF] = useState([]);
  //
  //console.log(props.comment)

  const replyImages = [];

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      replyImages.push(files[i].url);
    }
  }

  /* const getTime = () => {
    const date = new Date(dateComment);
    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
      date.getMonth() + 1
    }`;
  }; */

  return (
    <View style={styles.container}>
      {/* replyImages.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.image} />
      )) */}
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.avatarContainer}
          source={{
            uri: /* userComment.information.image */ img,
          }}
        />
      </TouchableOpacity>
      <View style={styles.leftViewContainer}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.username]}>
            {/* userComment.information.fulName */ name}
          </Text>
          <Text style={[styles.text, styles.content]}>{content}</Text>
        </View>
        <View style={styles.bottomViewContainer}>
          {/* <Text style={styles.time}>{getTime() dateComment}</Text> */}
          <FlexIconButton
            onPress={() => {
              alert("Reply");
            }}
            title={"Phản Hồi"}
            icon={icons.activeChatMessageIcon}
            iconSize={20}
            iconColor={colors.GrayOnContainerAndFixed}
            styleContainer={styles.btnContainer}
            styleText={styles.btnText}
          />
        </View>
        {replies.map((eachReply, index) => (
          <ReplyItems
            reply={eachReply}
            key={index}
            navigate={props.navigation.navigate}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 65,
    marginBottom: 15,
    flexDirection: "row",
  },
  //
  leftViewContainer: {
    flex: 1,
    marginLeft: 5,
  },
  bottomViewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  contentContainer: {
    borderRadius: 12,
    backgroundColor: colors.transparentBlack15,
  },
  //
  avatarContainer: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 180,
    borderColor: colors.GrayBackground,
  },
  text: {
    marginHorizontal: 10,
    marginVertical: 5,
    color: "black",
    fontSize: fontSizes.h7,
  },
  username: {
    fontWeight: "bold",
  },
  content: {},
  time: {
    marginTop: 10,
    marginRight: 5,
    fontWeight: "bold",
    fontSize: fontSizes.h6,
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
  //
  /*
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 5,
    //borderWidth: 3,
    //borderColor: colors.PrimaryBackground,
  }, */
});
