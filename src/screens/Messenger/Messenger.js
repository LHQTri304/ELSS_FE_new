import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import {
  UIHeader,
  EnterMessageBar,
  MessengerItems,
  LoadingFullScreen,
} from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { messenger_getFriendID, messenger_loadMessageforUser } from "../../api";

export default function Messenger(props) {
  const { navigate, goBack } = props.navigation;
  const { myUsername, friendUsername } = props.route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [friendID, setFriendID] = useState(null);
  const stompClientRef = useRef(null); // Dùng useRef để giữ STOMP client

  useEffect(() => {
    // Tạo STOMP Client một lần duy nhất
    if (!stompClientRef.current) {
      stompClientRef.current = new Client({
        webSocketFactory: () => new SockJS(API_BASE_URL + "/ws"), // Sửa lại WebSocket
        connectHeaders: {},
        debug: (str) => console.log(str),
        reconnectDelay: 5000, // Tự động reconnect
        onConnect: onConnected,
        onStompError: onError,
      });
      stompClientRef.current.activate(); // Kích hoạt client
    }

    // Gọi fetchData() và xử lý lỗi nếu có
    fetchData().catch((error) => console.error("Error fetching data:", error));

    /* return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    }; */
  }, [friendUsername]);

  const fetchData = async () => {
    try {
      const response = await messenger_loadMessageforUser(friendUsername);
      setChatHistory(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Hàm cập nhật chatHistory
  const updateChatHistory = async () => {
    let response = await messenger_loadMessageforUser(friendUsername);
    let newestMessage = response.data[0];
    setChatHistory((prevChat) => [newestMessage, ...prevChat]);
  };

  const onConnected = async () => {
    const getFriendIDResponse = await messenger_getFriendID(friendUsername);
    setFriendID(getFriendIDResponse.data);
    // Subscribe tin nhắn mới
    stompClientRef.current.subscribe(
      `/user/private/queue/chat/${getFriendIDResponse.data}`,
      (message) => onReceivedMessage(message)
    );
  };

  const onError = (frame) => {
    console.error("STOMP Error:", frame);
  };

  const onReceivedMessage = async (message) => {
    const newMessage = JSON.parse(message.body);
    setChatHistory((prevChat) => [newMessage, ...prevChat]); // Cập nhật tin nhắn mới ngay lập tức
  };

  function LoadUserInformation() {
    navigate("ShowProfileFriend", { friendUsername: friendUsername });
  }

  const goBackToFriendList = async () => {
    await AsyncStorage.setItem("friend", "list");
    goBack();
  };

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={friendUsername}
        leftIconName={"backIcon"}
        onPressLeftIcon={goBackToFriendList}
      />
      <View style={styles.displayView}>
        <FlatList
          data={chatHistory}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => <MessengerItems item={item} />}
        />
        <EnterMessageBar
          myUsername={myUsername}
          friendUsername={friendUsername}
          stompClient={stompClientRef.current}
          friendID={friendID}
          actionType={"friend"}
          updateChatHistory={updateChatHistory} // Truyền hàm xuống
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  displayView: { flex: 1 },
});
