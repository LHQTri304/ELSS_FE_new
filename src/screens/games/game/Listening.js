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
import YoutubePlayer from "react-native-youtube-iframe";
import { game_getSingleListeningQuestion } from "../../../api";
import SharedLayout from "../SharedLayout";

export default GameListening = (props) => {
  const { width, height } = Dimensions.get("window");
  const [listData, setListData] = useState([]);
  const [chosenData, setChosenData] = useState({
    id: 0,
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    correctAnswer: "",
    question: "",
    video:
      "https://support.heberjahiz.com/hc/article_attachments/21013076295570",
  });
  const [uriVideo, setUriVideo] = useState(
    "https://www.youtube.com/watch?v=Shl5cZ6L9F4"
  );
  const [videoID, setVideoID] = useState("Shl5cZ6L9F4");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: "A", text: "???", color: colors.transparentRed },
    { id: "B", text: "???", color: colors.transparentOrange },
    { id: "C", text: "???", color: colors.transparentLime },
    { id: "D", text: "???", color: colors.transparentBlue },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const fetchData = async () => {
    try {
      const response = await game_getSingleListeningQuestion();
      setUriVideo(response.video);
      setVideoID(response.video.split("v=")[1]);
      setQuestion(response.question);
      setOptions([
        { id: "A", text: response.answerA, color: colors.transparentRed },
        { id: "B", text: response.answerB, color: colors.transparentOrange },
        { id: "C", text: response.answerC, color: colors.transparentLime },
        { id: "D", text: response.answerD, color: colors.transparentBlue },
      ]);
      setCorrectAnswer(response.correctAnswer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle option press
  const handleOptionPress = async (id) => {
    if (id === correctAnswer) {
      alert("Correct!\nYou chose the right answer.");
      fetchData();
    } else {
      alert("Wrong!\nTry again.");
    }
  };

  // Handle video
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

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
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={videoID}
            onChangeState={onStateChange}
          />
        </View>

        <Text style={styles.questionText}>Question: {question}</Text>

        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <FlexButton
                onPress={() => handleOptionPress(item.id)}
                title={`${item.id}: ${item.text}`}
                styleContainer={{backgroundColor: item.color,}}
                styleText={{color: colors.GrayOnContainerAndFixed,}}
              />
            )}
            keyExtractor={(item) => item.id}
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
