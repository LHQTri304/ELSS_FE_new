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
import {
  FlexButton,
  TextInputTransparent,
  CommonButton,
} from "../../../components";
import SharedLayout from "../SharedLayout";

import { dataEnglishVocabulary } from "../../../testFE";

export default GameWordle = (props) => {
  const { width, height } = Dimensions.get("window");

  const [targetWord, setTargetWord] = useState("");
  const [targetWordLength, setTargetWordLength] = useState(1);
  const [targetWordMeaning, setTargetWordMeaning] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const checkGuess = (guess) => {
    let result = [];
    for (let i = 0; i < targetWord.length; i++) {
      if (guess[i] === targetWord[i]) {
        result.push("green"); // Correct letter in correct position
      } else if (targetWord.includes(guess[i])) {
        result.push("yellow"); // Correct letter in wrong position
      } else {
        result.push("gray"); // Incorrect letter
      }
    }
    return result;
  };

  const fetchData = async () => {
    try {
      const newTargetWord =
        dataEnglishVocabulary[
          Math.floor(Math.random() * dataEnglishVocabulary.length)
        ];
      const length = newTargetWord.word.length;
      const meaning = newTargetWord.meaning;
      setTargetWord(newTargetWord.word);
      setTargetWordMeaning(meaning);
      setTargetWordLength(length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle press guess
  const handleGuess = () => {
    if (currentGuess.length !== targetWordLength) {
      alert(`Error\nPlease enter a ${targetWordLength} letter word`);
      return;
    }

    const result = checkGuess(currentGuess);
    setGuesses([...guesses, { word: currentGuess, result }]);
    setCurrentGuess("");

    if (currentGuess.toLowerCase() === targetWord.toLowerCase()) {
      alert(
        `Congratulations!\nYou guessed the word!\n"${targetWord}" means: ${targetWordMeaning}`
      );
      fetchData();
      setGuesses([]);
    } else if (guesses.length === 4) {
      alert(`Game Over\nThe correct word was: ${targetWord}`);
      setGuesses([]);
    }
  };

  function getColor(color) {
    switch (color) {
      case "green":
        return "green";
      case "yellow":
        return "yellow";
      case "gray":
        return "gray";
      default:
        return "white";
    }
  }

  const renderRules = () => {
    return (
      <Text style={styles.rulesText}>
        Guess the {targetWordLength}-letter word.
        {"\n"}The color of each letter will give you a hint:
        {"\n"}- Green: Correct letter, correct position
        {"\n"}- Yellow: Correct letter, wrong position
        {"\n"}- Gray: Incorrect letter
        {"\n"}You have 5 chances to guess.
      </Text>
    );
  };

  const renderChances = () => {
    return (
      <Text style={styles.rulesText}>
        You have {5 - guesses.length} chances left
      </Text>
    );
  };

  const renderContent = () => {
    return (
      <View style={[styles.mainView]}>
        <Text style={styles.questionText}>Wordle Game</Text>
        {guesses.length === 0 ? renderRules() : renderChances()}
        <FlatList
          data={guesses}
          renderItem={({ item }) => (
            <View style={styles.guessRow}>
              {item.word.split("").map((letter, index) => (
                <Text
                  key={index}
                  style={[
                    styles.letter,
                    { backgroundColor: getColor(item.result[index]) },
                  ]}
                >
                  {letter.toUpperCase()}
                </Text>
              ))}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <TextInputTransparent
          inputMode={"text"}
          icon={null}
          placeholder={`Enter ${targetWordLength}-letter word`}
          value={currentGuess}
          onChangeText={setCurrentGuess}
          maxLength={targetWordLength}
        />

        <CommonButton onPress={() => handleGuess()} title={"Submit Guess"} />
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
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    color: colors.GrayOnContainerAndFixed,
  },
  rulesText: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 5,
    color: colors.GrayOnContainerAndFixed,
  },
  guessRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  letter: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 3,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    borderRadius: 8,
  },
});
