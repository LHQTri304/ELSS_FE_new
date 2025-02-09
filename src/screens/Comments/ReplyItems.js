import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";

export default function ReplyItems(props) {
  const { navigate } = props;
  const { userReplied, dateReplied, content, files } = props.reply;
  const { fulName, image: avatar } = userReplied.information;

  //
  const [img, setI] = useState(props.reply.img);
  const [name, setN] = useState(props.reply.userName);
  //

  const MAXWidth = 245;
  const getWidth = (baseWidth) => {
    return baseWidth > MAXWidth ? MAXWidth : baseWidth;
  };
  const getHeight = (baseWidth, baseHeight) => {
    return baseWidth > MAXWidth
      ? baseHeight / (baseWidth / MAXWidth)
      : baseHeight;
  };

  const getTime = () => {
    const date = new Date(dateReplied);
    return `${date.getHours()}:${date.getMinutes()} \n ${date.getDate()}/${
      date.getMonth() + 1
    }`;
  };

  /* const ShowProfile = async () => {
    navigate("ShowProfile", { userReplied: userReplied });
  };

  const handleShowPicture = () => {
    navigate("ShowPicture", { files: files });
  }; */

  return (
      <View style={styles.container}>
        {/* replyImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        )) */}
        <TouchableOpacity /* onPress={ShowProfile} */>
          <Image
            style={styles.avatarContainer}
            source={{
              uri: avatar,
            }}
          />
        </TouchableOpacity>
      <View style={styles.leftViewContainer}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.username]}>
            {fulName}
          </Text>
          <Text style={[styles.text, styles.content]}>{content}</Text>
        </View>
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
  /* image: {
    maxWidth: 245,
    resizeMode: "contain",
    marginVertical: 2,
    borderRadius: 5,
    //borderWidth: 3,
    //borderColor: colors.GrayBackground,
  }, */
});
