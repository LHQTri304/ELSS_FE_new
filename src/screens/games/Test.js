import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoQuizScreen = () => {
  // Dummy data for the quiz
  const question = 'What is the capital of France?';
  const options = [
    { id: 'A', text: 'Berlin' },
    { id: 'B', text: 'Madrid' },
    { id: 'C', text: 'Paris' },
    { id: 'D', text: 'Rome' },
  ];

  // Correct answer ID
  const correctAnswer = 'C';

  // Handle option press
  const handleOptionPress = (id) => {
    if (id === correctAnswer) {
      Alert.alert('Correct!', 'You chose the right answer.', [{ text: 'OK' }]);
    } else {
      Alert.alert('Wrong!', 'Try again.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://www.youtube.com/watch?v=f7KX1AwgZ3w' }} // Replace with your video URL
          style={styles.videoPlayer}
          allowsFullscreenVideo
        />
      </View>

      {/* Question Text */}
      <Text style={styles.questionText}>{question}</Text>

      {/* Answer Options */}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionButton}
            onPress={() => handleOptionPress(option.id)}
          >
            <Text style={styles.optionText}>{`${option.id}: ${option.text}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 16,
  },
  videoPlayer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#343a40',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  optionButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default VideoQuizScreen;


