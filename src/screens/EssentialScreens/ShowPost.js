import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, FlexIconButton, EnterMessageBar } from "../../components";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";
//import { FloatingAction } from "react-native-floating-action";
import { blog_likeBlog } from "../../api";

import Comment from "../Comments/Comment";

const floatingActions = [
  {
    text: "Chỉnh sửa thảo luận",
    icon: icons.pencilIcon,
    name: "bt_edit",
    position: 1,
  },
  {
    text: "Xóa thảo luận",
    icon: icons.trashCanIcon,
    name: "bt_delete",
    position: 2,
  },
];

export default ShowPost = (props) => {
  let { blogID, content, dateCreated, comments, subject, files, likes } =
    props.route.params.topic;
  let { nameSubject, subjectID } = props.route.params;
  let { userName } = props.route.params.topic.userCreated;
  let { fulName, image: avatar } =
    props.route.params.topic.userCreated.information;

  //
  const [header, setHeader] = useState("props.route.params.topic.header");
  //

  const parts = files.length > 0 ? files[0].url : null;

  //navigation
  const { navigate, goBack, push } = props.navigation;

  const [likeStatus, setLikeStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [leaderOfGroup, setLeaderOfGroup] = useState("");
  const [groupID, setGroupID] = useState("");

  const [shouldReload, setShouldReload] = useState(false);

  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const extractToken = await axios.get(
        API_BASE_URL + "/api/v1/information/ExtractBearerToken",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );
      setUsername(extractToken.data);

      const responseGroup = await axios.get(
        API_BASE_URL +
          "/api/v1/groupStudying/findGroupbyId?groupID=" +
          (await AsyncStorage.getItem("groupID")),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      setLeaderOfGroup(responseGroup.data.leaderOfGroup.userName);

      setGroupID(responseGroup.data.groupID);

      const checkLike = await axios.get(
        API_BASE_URL + "/api/v1/blog/checkLikeBlog?blogID=" + blogID,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      setLikeStatus(checkLike.data === true);
    };

    if (shouldReload) {
      // Perform actions to reload the screen
      setShouldReload(false); // Reset the flag
    }

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [shouldReload]);

  const date = new Date(dateCreated);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const sendingTime = `${hour}:${minute} ${day}/${month}`;

  const deletePost = () => {
    if (username != leaderOfGroup && username != userName) {
      alert("Bạn không phải nhóm trưởng hoặc người tạo");
    } else {
      Alert.alert(
        "Xác nhận xoá",
        "Bạn có chắc chắn muốn xoá?",
        [
          {
            text: "Huỷ",
            style: "cancel",
          },
          {
            text: "Xoá",
            style: "destructive",
            onPress: async () => {
              const response = await axios.delete(
                API_BASE_URL + "/api/v1/blog/deleteBlog?blogID=" + blogID,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer " + (await AsyncStorage.getItem("username")),
                  },
                }
              );

              if (response.status == 200) {
                goBack();
              } else {
                alert("Kiểm tra lại mạng, xoá không thành công");
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  //Xu li like
  const handleLike = async () => {
    const likeBlog = await axios.post(
      API_BASE_URL + `/api/v1/blog/likeBlog?blogID=${blogID}`,
      null,
      {
        headers: {
          Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
        },
      }
    );
    if (likeBlog.status === 200) {
      setShouldReload(true);
    }
  };

  const updatePost = async () => {
    if (username != leaderOfGroup && username != userName) {
      alert("Bạn không phải nhóm trưởng hoặc người tạo");
    } else {
      navigate("EditPost", {
        blogID: blogID,
        content: content,
        files: files,
        nameSubject: subject.nameSubject,
        subjectID: subject.subjectID,
      });
    }
  };

  const ShowPicture = () => {
    console.log(parts);

    if (parts == null) {
      alert("Nội dung này không có ảnh");
      return;
    }

    navigate("ShowPicture", { files: files });
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thảo luận"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />

      <ScrollView style={styles.mainView}>
        <View style={styles.topView}>
          <Image style={styles.avatarContainer} source={{ uri: avatar }} />
          <Text style={styles.username}>{fulName}</Text>
        </View>
        {/* <Text style={styles.title}>{header}</Text> */}
        <Text style={styles.content}>{content}</Text>
        <View style={styles.bottomView}>
          <FlexIconButton
            onPress={() => {
              handleLike();
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

        {/* <TouchableOpacity onPress={ShowPicture}>
          {<Image
            source={{ uri: parts }}
            style={styles.image}
          />}
          {files.map((eachFile, index) => (
            <View key={index} style={styles.imgView}>
              <Image
                source={{ uri: eachFile.url }}
                style={[
                  styles.image, { width: imageWidth, height: imageHeight, maxWidth: MAXWidth, },
                ]}
              />
              {files.length == 0 ? (
                <View />
              ) : (
                <TouchableOpacity
                  style={styles.redRemoveImg}
                  onPress={() => handleRemoveImageFromList(index)}
                ></TouchableOpacity>
              )}
            </View>
          ))}
        </TouchableOpacity> */}
        <Comment blogID={blogID} navigation={props.navigation} isReplying={isReplying} setIsReplying={setIsReplying} />
      </ScrollView>

      {isReplying ? (
        <View />
      ) : (
        <EnterMessageBar blogID={blogID} actionType={"comment"} />
      )}

      {/* <FloatingAction
        actions={floatingActions}
        position="right"
        onPressItem={(name) => {
          name == "bt_edit" ? updatePost() : deletePost();
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  mainView: {
    padding: 15,
  },
  /*commentBar: {
    height: "auto",
    minHeight: 50,
    //position: "absolute",
    //bottom: 0,
    //left: 0,
    //right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.SecondaryBackground,
    //
    borderRadius: 30,
    marginTop: 10,
  },
  commentBarText: {
    fontWeight: "bold",
    fontSize: fontSizes.h5,
    textAlign: "center",
    alignSelf: "center",
    color: colors.PrimaryObjects,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 5,
    alignSelf: "center",
  }, */
  //
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
    width: 33,
    height: 33,
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
    fontSize: fontSizes.h4,
    fontWeight: "bold",
  },
  content: {
    marginVertical: 10,
    marginRight: 10,
    color: "black",
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
});
