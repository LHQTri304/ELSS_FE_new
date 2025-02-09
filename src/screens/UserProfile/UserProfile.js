import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import {
  UIHeader,
  RowSectionTitle,
  RowSectionDisplay,
  RowSectionNavigate,
  SubInfoVertical,
} from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  profile_getUser,
  profile_getAvatar,
  profile_uploadImage,
  user_getUser,
} from "../../api";

export default function UserProfile(props) {
  const notUpdate = "Chưa cập nhật"
  const [username, setUsername] = useState(null);
  const [fulname, setFulName] = useState(notUpdate);
  const [image, setImage] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState(notUpdate);
  const [email, setEmail] = useState(notUpdate);
  const [description, setDescription] = useState(notUpdate);
  const [yearOfBirth, setYearOfBirth] = useState(notUpdate);
  const [gender, setGender] = useState(notUpdate);

  const setEverything = (
    username,
    fulname,
    email,
    phoneNumber,
    description,
    yearOfBirth,
    gender
  ) => {
    setUsername(username);
    setFulName(fulname);
    setDescription(description);
    setPhoneNumber("0" + phoneNumber);
    setEmail(email);
    setYearOfBirth(yearOfBirth);
    setGender(gender);
  };

  const fetchData = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const responseUser = await user_getUser();
      //console.log(responseUser)

      setFulName(responseUser.information.fulName)
      setEverything(
        username,
        responseUser.information.fulName,
        responseUser.email,
        responseUser.information.phoneNumber,
        responseUser.information.description,
        responseUser.information.yearOfBirth,
        responseUser.information.gender,
      );

      const responseAvatar = await profile_getAvatar(username);
      if (responseAvatar.data != null) {
        setImage(responseAvatar.data.toString());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [props.userName]);

  /* useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []); */

  const Logout = async () => {
    try {
      //await AsyncStorage.removeItem("username");
      navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  /* const selectImage = async () => {    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      try {
        var imagePath = result.assets[0].uri.toString();
        await profile_uploadImage(imagePath, username);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }; */

  /* const ShowPicture = () => {
    navigate("ShowPicture", { file: image });
  }; */

  //function of navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader title={"Hồ sơ"} />

      <ScrollView>
        <View style={styles.profileView}>
          <Image source={{uri: image}} style={styles.profileImage} />
          <Text style={styles.profileUsername}>{fulname}</Text>
          <Text style={styles.profileDescription} numberOfLines={4}>
            {description}
          </Text>
        </View>

        {/* <View style={styles.profileSubInfo}>
          <SubInfoVertical icon={icons.personCircleIcon} text={"Bạn bè giao lưu"} />
          <SubInfoVertical icon={icons.groupIcon} text={"Tổng nhóm tham gia"} />
          <SubInfoVertical icon={icons.clockIcon} text={"Thời gian hoạt động"} />
        </View> */}

        <RowSectionTitle
          text={"Thông tin tài khoản"}
          styles={{ marginTop: 20 }}
        />

        <RowSectionDisplay icon={icons.phoneIcon} text={phoneNumber} />
        <RowSectionDisplay icon={icons.emailIcon} text={email} />
        <RowSectionDisplay icon={icons.genderEqualityIcon} text={gender} />
        <RowSectionDisplay icon={icons.birthdayCakeIcon} text={yearOfBirth} />

        <RowSectionTitle text={"Tùy chỉnh tài khoản"} />

        <RowSectionNavigate
          icon={icons.personIcon}
          text={"Đổi thông tin cá nhân"}
          onPress={() => navigate("SettingProfile")}
        />

        <RowSectionNavigate
          icon={icons.keyIcon}
          text={"Đổi mật khẩu"}
          onPress={() => navigate("ResetPasswordInProfile")}
        />
        <RowSectionNavigate
          icon={icons.exportIcon}
          text={"Đăng xuất"}
          onPress={Logout}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  profileView: {
    marginLeft: "5%",
    marginVertical: 15,
    alignItems: "center",
    //flexDirection: "row",
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 90,
    borderColor: colors.PrimaryBackground,
    borderWidth: 2,
  },
  profileUsername: {
    color: "black",
    fontSize: fontSizes.h5,
    fontWeight: "900",
  },
  profileDescription: {
    maxHeight: 75,
    maxWidth: 220,
    color: "gray",
    fontSize: fontSizes.h7,
  },
  profileSubInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 3,
  },
  button: {
    backgroundColor: colors.PrimaryBackground,
    padding: 3,
    borderRadius: 10,
    width: 90,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: fontSizes.h8,
  },
});
