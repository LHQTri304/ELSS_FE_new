import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { FlexButton } from "../../../components";
import SharedLayout from "../SharedLayout";

function getRandomColor() {
  const randomR = Math.floor(Math.random() * 256); // Giá trị từ 0 đến 255
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function getSimilarRgbColors(baseColor, variation = 50) {
  const randomOffset = () =>
    Math.floor(Math.random() * (2 * variation + 1)) - variation;
  const clamp = (value) => Math.max(0, Math.min(255, value)); // Đảm bảo giá trị từ 0 đến 255

  // Dùng regex để tách giá trị r, g, b từ chuỗi
  const [r, g, b] = baseColor.match(/\d+/g).map(Number);
  const newR = clamp(r + randomOffset());
  const newG = clamp(g + randomOffset());
  const newB = clamp(b + randomOffset());
  return `rgb(${newR}, ${newG}, ${newB})`;
}

export default GameFindDifferentColors6x6 = (props) => {
  const { width, height } = Dimensions.get("window");

  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState(6);
  const [variation, setVariation] = useState(50);

  const generateOptions = (cols, rows) => {
    const color1 = getRandomColor();
    const color2 = getSimilarRgbColors(color1, variation);

    let totalCells = cols * rows;
    let randomIndex = Math.floor(Math.random() * totalCells); // Chỉ số ô ngẫu nhiên sẽ có màu color2
    setCorrectAnswer(randomIndex);

    options.length = 0  //làm trống trước khi push
    for (let i = 0; i < totalCells; i++) {
      // Nếu ô là ô ngẫu nhiên thì chọn màu color2, còn lại là color1
      const color = i === randomIndex ? color2 : color1;
      options.push(color);
    }
  };

  const fetchData = async () => {
    try {
      generateOptions(difficulty, difficulty);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle option press
  const handleOptionPress = async (index) => {
    if (index === correctAnswer) {
      alert("Correct!\nYou chose the right answer.");
      variation > 10
        ? setVariation((prevVariation) => prevVariation - 2)
        : setVariation(50);
      console.log(variation);
      fetchData();
    } else {
      alert("Wrong!\nTry again.");
    }
  };

  const renderContentGame = () => {
    return (
      <View style={[styles.mainView]}>
        <Text style={styles.questionText}>Find the different color:</Text>
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            renderItem={({ item, index }) => (
              <FlexButton
                onPress={() => handleOptionPress(index)}
                title={""}
                styleContainer={{ backgroundColor: item }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={difficulty}
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>
    );
  };

  return (
    <SharedLayout navigation={props.navigation} renderContent={renderContentGame} />
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: colors.GrayOnContainerAndFixed,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    width: "80%",
    justifyContent: "space-evenly",
    //alignItems: "center",
  },
  row: {
    justifyContent: "space-between", // Khoảng cách giữa các cột
    marginBottom: 10, // Khoảng cách giữa các dòng
  },
});
