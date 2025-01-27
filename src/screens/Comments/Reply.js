import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import ReplyItems from "./ReplyItems";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, EnterMessageBar } from "../../components";
import { blog_getAllReplyInComment } from "../../api";

const Reply = (props) => {
  //const [replies, setReplies] = useState([]);

  //const { commentID, userComment, content, files } = props.route.params.comment;
  const { navigate, goBack } = props.navigation;

  //
  const [img, setI] = useState(props.route.params.comment.img);
  const [name, setN] = useState(props.route.params.comment.userName);
  const [content, setCD] = useState(props.route.params.comment.content);
  const [replies, setReplies] = useState(props.route.params.comment.replies);
  const [files, setFF] = useState([]);
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

  /* useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [props.userName]);

  const ShowProfile = async () => {
    navigate("ShowProfile", { userReplied: userComment });
  };

  const fetchData = async () => {
    try {
      const responseData = await blog_getAllReplyInComment(commentID);
      setReplies(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowPicture = () => {
    navigate("ShowPicture", { files: files });
  }; */

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Phản hồi bình luận"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        textStyle={{ fontSize: fontSizes.h4 * 0.96 }}
      />

      <ScrollView style={styles.listContainer}>
        <TouchableOpacity
          style={styles.mainCommentContainer}
          /* onPress={ShowProfile} */
        >
          <Image
            style={styles.img}
            source={{
              uri: /* userComment.information.image */img,
            }}
          />
          <View style={styles.textView}>
            <Text style={styles.titleText} numberOfLines={1}>
              {/* userComment.information.fulName */name}
            </Text>
            <Text style={styles.contentText}>{content}</Text>
            <View>
              {files.map((eachImage, index) => (
                <TouchableOpacity key={index} onPress={() => handleShowPicture()}>
                  <Image
                    source={{ uri: eachImage.url }}
                    style={[
                      styles.image,
                      {
                        width: getWidth(eachImage.width),
                        height: getHeight(eachImage.width, eachImage.height),
                      }
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>

        {replies.map((eachReply, index) => (
          <ReplyItems
            reply={eachReply}
            key={index}
            navigate={navigate}
          />
        ))}
      </ScrollView>

      <EnterMessageBar /* commentID={commentID} actionType={"reply"} */ />
    </View>
  );
};
export default Reply;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  mainCommentContainer: {
    minHeight: 65,
    marginBottom: 15,
    flexDirection: "row",
  },
  img: {
    width: 55,
    height: 55,
    resizeMode: "stretch",
    borderRadius: 15,
    marginTop: 11,
    marginHorizontal: 10,
  },
  textView: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: colors.active,
    fontSize: fontSizes.h6,
    fontWeight: "800",
  },
  contentText: {
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: "600",
  },
  image: {
    maxWidth: 245,
    resizeMode: "contain",
    marginVertical: 2,
    borderRadius: 5,
    //borderWidth: 3,
    //borderColor: colors.PrimaryBackground,
  },
});
