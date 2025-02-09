import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon, TextInputTransparent, CommonButton } from "../../../components";
import { game_getSingleImageQuestion } from "../../../api";
import SharedLayout from "../SharedLayout";

export default GamePicWord2 = (props) => {
  const { width, height } = Dimensions.get("window");

  const [targetWord, setTargetWord] = useState(""); // Từ cần xếp
  const [images, setImages] = useState([]); // 2 hình gợi ý
  const [answer, setAnswer] = useState("");
  const [selectedLetters, setSelectedLetters] = useState(
    Array(targetWord.length).fill(null)
  ); // Dòng trên

  const fetchData = async () => {
    try {
      const response = await game_getSingleImageQuestion();
      setTargetWord(response.answer);
      setImages([response.image1, response.image2]);
      setAnswer("")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkWin = () => {
    answer.toLowerCase() === targetWord.toLowerCase()
      ? (alert(`You Win!`), fetchData())
      : alert(`Not Yet!`);
  };

  const renderContent = () => {
    return (
      <View style={styles.mainView}>
        <View style={styles.images}>
          <Icon
            name={{
              uri: images[0]
                ? images[0]
                : "https://png.pngtree.com/element_our/sm/20180408/sm_5ac9b8967574d.jpg",
            }}
            size={width / 3}
            style={styles.img}
          />
          <Icon
            name={{
              uri: images[1]
                ? images[1]
                : "https://png.pngtree.com/element_our/sm/20180408/sm_5ac9b8967574d.jpg",
            }}
            size={width / 3}
            style={styles.img}
          />
        </View>

        <TextInputTransparent
          inputMode={"text"}
          icon={null}
          placeholder={"Enter your answer"}
          isPassword={false}
          onChangeText={(text) => {
            setAnswer(text);
          }}
          value={answer}
        />

        <CommonButton onPress={() => checkWin()} title={"Check Answer"} />
      </View>
    );
  };

  return (
    <SharedLayout navigation={props.navigation} renderContent={renderContent} />
  );
};

const styles = StyleSheet.create({
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
  images: { flexDirection: "row" },
  img: {
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 3,
    resizeMode: "stretch",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap", // Cho phép xuống dòng
    justifyContent: "center",
    marginTop: 20,
  },
  tile: {
    width: "16%", // Chiều rộng linh hoạt (16% đảm bảo 6 ô trên 1 dòng với khoảng cách)
    aspectRatio: 1, // Duy trì tỉ lệ vuông
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.TertiaryOnContainerAndFixed,
  },
  tileColorSelected: {
    backgroundColor: colors.TertiaryContainer,
  },
  tileColorAvailable: {
    backgroundColor: colors.TertiaryBackground,
  },
  tileText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textColorSelected: {
    color: colors.TertiaryOnContainerAndFixed,
  },
  textColorAvailable: {
    color: colors.TertiaryContainer,
  },
  //
  handleStepRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: "1%",
  },
  handleStepButtonText: {
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: colors.GrayBackground,
  },
  redText: {
    fontSize: fontSizes.h7,
    textAlign: "right",
    color: colors.RedLightBackground,
  },
});
