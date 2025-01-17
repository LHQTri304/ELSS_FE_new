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

export default GameColors2 = (props) => {
  const { width, height } = Dimensions.get("window");

  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const fetchData = async () => {
    try {
      const shuffledOptions = colors.listStringColors
        .sort(() => 0.5 - Math.random())
        .slice(0, 4); // Trích 4 màu ngẫu nhiên
      setOptions(shuffledOptions);

      const newCorrectAnswer =
        shuffledOptions[Math.floor(Math.random() * shuffledOptions.length)];
      setCorrectAnswer(newCorrectAnswer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle option press
  const handleOptionPress = async (index) => {
    if (options[index] === correctAnswer) {
      alert("Correct!\nYou chose the right answer.");
      fetchData();
    } else {
      alert("Wrong!\nTry again.");
    }
  };

  const renderContent = () => {
    return (
      <View
        style={[
          styles.mainView,
          {
            maxHeight: height * 0.8,
          },
        ]}
      >
        <Text style={styles.questionText}>Find the color: {correctAnswer}</Text>

        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            renderItem={({ item, index }) => (
              <FlexButton
                onPress={() => handleOptionPress(index)}
                title={''}
                styleContainer={{backgroundColor: item,}}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Hiển thị 2 cột
            columnWrapperStyle={styles.row} // Cách dòng (tuỳ chọn)
          />
        </View>
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
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: colors.GrayOnContainerAndFixed,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  row: {
    justifyContent: "space-between", // Khoảng cách giữa các cột
    marginBottom: 10, // Khoảng cách giữa các dòng
  },
});
