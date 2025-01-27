import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TabYourFriendsItems from "./TabYourFriendsItems";
import { images, icons, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_getAllFriendList } from "../../../api";

import { dataFriends } from "../../../testFE";

function TabYourFriends(props) {
  //const [friends, setFriends] = useState([]);
  const [friends, setFriends] = useState(dataFriends);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      /* try {
        const response = await friend_getAllFriendList();
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } */
    };

    fetchData();
    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 1000);
    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
  }, [props.userName]);

  const SelectedFriend = async (myUsername, friendUsername, state) => {
    await AsyncStorage.setItem("friend", "chat");
    navigate("Messenger", {
      myUsername: myUsername,
      friendUsername: friendUsername,
      state: state,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item, index }) => (
          <TabYourFriendsItems
            friend={item}
            onPress={() => {
              navigate("Messenger", {
                myUsername: "myUsername",
                friendUsername: "friendUsername",
              });
            }}
          />
        )}
      />
    </View>
  );
}
export default TabYourFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
