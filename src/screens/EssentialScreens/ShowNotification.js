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
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SubjectBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.SubjectBoxView}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.SubjectBoxContent}>{content}</Text>
    </View>
  );
}

function ContentBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.ContentBoxView}>
      <View style={styles.ContentBoxTopView}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title} onPress={props.OnPressContent}>{title}: </Text>
      </View>
      <Text style={styles.ContentBoxContent}>{content}</Text>
    </View>
  );
}

const ShowNotification = (props) => {
  let { header, content, notifycationType, dateSent, notifycationID } =
    props.route.params.notification;

  const date = new Date(dateSent);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const sendingTime = `${hour}:${minute} ${day}/${month}`;
  
  const [groupName, setGroupName] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL +
            "/api/v1/groupStudying/getNameGroupByNotificationID?notificationID=" +
            notifycationID
        );
        setGroupName(response.data);

        const responseItem = await axios.get(
          API_BASE_URL +
            "/api/v1/notifycation/loadNotifycation?notifycationID=" +
            notifycationID + "&myUserName=" + await AsyncStorage.getItem('username')
        );

        setItem(responseItem.data)

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  //navigation
  const { navigate, goBack } = props.navigation;

  const LoadItem = async () => {

    if (item.documentID == -1)
    {

      const response = await axios.get(API_BASE_URL + "/api/v1/blog/getBlogById?blogID=" + item.blogID)

      if (response.status == 200)
      {
        navigate('ShowPost', {topic: response.data})
      }
      else
      {
        alert('Đã có lỗi xảy ra, vui lòng xem trong nhóm')
      }

    }
    else if (item.blogID == -1)
    {

      const response = await axios.get(API_BASE_URL + "/api/v1/document/getDocumentById?documentID=" + item.documentID)

      if (response.status == 200)
      {
        navigate('ShowDocument', {notification: response.data})
      }
      else
      {
        alert('Đã có lỗi xảy ra, vui lòng xem trong nhóm')
      }
    }
    else
    {

    }

  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thông báo"}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={{
          paddingBottom: 20,
        }}
      />

      <ScrollView style={{ marginTop: 20 }}>
        <SubjectBox icon={images.groupIcon} title="Nhóm" content={groupName} />

        <SubjectBox
          icon={images.clockIcon}
          title="Thời gian gửi"
          content={sendingTime}
        />

        <SubjectBox
          icon={images.menuIcon}
          title="Loại thông báo"
          content={item.notifycationType == "user" ? "Trưởng nhóm" : "Hệ thống"}
        />

        <SubjectBox icon={images.priceTagIcon} title="Tiêu đề" content={item.header} />

        <ContentBox
          icon={images.documentBlackIcon}
          title="Nội dung"
          content={item.content}
          OnPressContent={() => {LoadItem()}}
        />
      </ScrollView>
    </View>
  );
};
export default ShowNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginRight: 10,
  },
  title: {
    color: "black",
    fontSize: fontSizes.h5,
    fontWeight: "500",
  },
  SubjectBoxView: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
  },
  SubjectBoxContent: {
    marginTop: 2,
    color: colors.noImportantText,
    fontSize: fontSizes.h5 * 0.9,
    fontWeight: "700",
  },
  ContentBoxView: {
    flexDirection: "column",
    paddingStart: 15,
    padding: 10,
  },
  ContentBoxTopView: {
    flexDirection: "row",
    alignItems: "center",
  },
  ContentBoxContent: {
    padding: 15,
    marginTop: 5,
    color: "black",
    fontSize: fontSizes.h6,
  },
});
