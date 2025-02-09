import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SearchBarTransparent } from "../../../components";
import { images, icons, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_findAllFriendByInputName } from "../../../api";

import TabSuggestAndRequestItems from "./TabSuggestAndRequestItems";

function TabSuggestions(props) {
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");
  const [invitation, setInvitation] = useState([]);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  const fetchData = async () => {
    try {
      setUsername(await AsyncStorage.getItem("username"));
      if (searchText.length >= 1) {
        const response = await friend_findAllFriendByInputName(searchText);
        setInvitation(response.data);
      } else {
        setInvitation([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1);
    return () => clearTimeout(timeoutId);
  }, [searchText, username]);

  return (
    <View style={styles.container}>
      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
      />

      <FlatList
        data={invitation.filter((eachInvitation) =>
          eachInvitation.information.fulName
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <TabSuggestAndRequestItems
            invitation={item}
            kind={"suggest"}
            onPress={() => {
              navigate("ShowProfileStranger", {
                user: item,
              });
            }}
          />
        )}
      />
    </View>
  );
}

export default TabSuggestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
