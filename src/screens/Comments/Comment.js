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

import { dataBlogs } from "../../testFE";

export default Comment = (props) => {
  const { blogID } = props; /* .route.params */

  const [comments, setComments] = useState(
    dataBlogs.filter((blog) => blog.ID === blogID)[0].comments
  );

  //navigation
  const { navigate, goBack } = props.navigation;

  /* useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/blog/getAllCommentInBlog?blogID=" + blogID, {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
        setComments(response.data)
                
      } catch (error) {
        console.error('Error fetching data:', error);w
      }
    };

    fetchData();

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 1000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);
  }, [props.userName]); */

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
