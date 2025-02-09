import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import CommentItems from "./CommentItems";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, EnterMessageBar } from "../../components";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";

export default Comment = (props) => {
  const { blogID, isReplying, setIsReplying } = props;

  const [comments, setComments] = useState([]);

  //navigation
  const { navigate, goBack } = props.navigation;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + "/api/v1/blog/getAllCommentInBlog?blogID=" + blogID,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      w;
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [props.userName]);

  return (
    <View style={styles.container}>
      {comments.map((eachComment, index) => (
        <CommentItems
          comment={eachComment}
          key={index}
          onPress={() => {
            /* navigate("Reply", { comment: eachComment }); */
          }}
          navigation={props.navigation}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
