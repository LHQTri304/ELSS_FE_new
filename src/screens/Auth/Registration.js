import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import {
  UIHeader,
  TextInputTransparent,
  QuickBackGround,
} from "../../components";
import {
  user_register,
  user_createAccountData,
  information_initialize,
  user_checkInfo,
} from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { API_BASE_URL } from "../../api/DomainAPI";

export default Registration = (props) => {
  const { navigate, goBack } = props.navigation;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");

  const [stepOTP, setStepOTP] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword)
      return alert("error");
    if (password !== confirmPassword) return alert("Passwords do not match");
    try {
      setStepOTP(true);
    } catch (error) {
      alert("Error during registration");
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        API_BASE_URL +
          "/api/v1/user/CreateAccount?userName=" +
          username +
          "&passWord=" +
          password +
          "&email=" +
          email +
          "&image=" +
          images.blankAvatarForRegistration
      );
      goBack();
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  const renderContentStep1 = () => {
    return (
      <View style={styles.mainView}>
        <TextInputTransparent
          inputMode={"text"}
          icon={icons.personIcon}
          placeholder={"Username"}
          onChangeText={setUsername}
          value={username}
        />
        <TextInputTransparent
          inputMode={"email"}
          icon={icons.emailIcon}
          placeholder={"Email"}
          onChangeText={setEmail}
          value={email}
        />
        <TextInputTransparent
          inputMode={"text"}
          icon={icons.keyIcon}
          placeholder={"Password"}
          isPassword={true}
          onChangeText={setPassword}
          value={password}
        />
        <TextInputTransparent
          inputMode={"text"}
          icon={icons.addKeyIcon}
          placeholder={"Re-enter Password"}
          isPassword={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <View style={styles.handleStepRow}>
          <View />
          <TouchableOpacity
            onPress={() => {
              handleRegister();
            }}
          >
            <Text style={[styles.handleStepButtonText, styles.redText]}>
              Đăng Ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContentStep2 = () => {
    return (
      <View style={styles.mainView}>
        <TextInputTransparent
          inputMode={"numeric"}
          icon={icons.addKeyIcon}
          placeholder={"Enter OTP"}
          isPassword={true}
          onChangeText={setOtp}
          value={otp}
        />
        <View style={styles.handleStepRow}>
          <View />
          <TouchableOpacity
            onPress={() => {
              handleVerifyOtp();
            }}
          >
            <Text style={[styles.handleStepButtonText, styles.redText]}>
              Xác thực OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContentStep3 = () => {
    return <View />;
  };

  return (
    <View style={styles.container}>
      <QuickBackGround />
      {!stepOTP ? renderContentStep1() : renderContentStep2()}

      <UIHeader
        title={null}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={styles.UIHeaderMainStyle}
        iconStyle={styles.UIHeaderIconStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryContainer,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
  },
  mainView: {
    width: "90%",
    padding: 15,
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  handleStepRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: "5%",
    paddingLeft: "10%",
  },
  handleStepButtonText: {
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: colors.PrimaryBackground,
  },
  redText: {
    color: colors.RedLightBackground,
  },
  //
  UIHeaderMainStyle: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: null,
  },
  UIHeaderIconStyle: { tintColor: colors.inactive },
});
