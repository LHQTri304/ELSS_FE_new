import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const game_getAllImageQuestions = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/game/getAllImageQuestions`,
  );
  return response;
};

export const game_getSingleImageQuestion = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/game/getAllImageQuestions`,
  );
  return response.data[Math.floor(Math.random() * response.data.length)];
};

export const game_getAllListeningQuestions = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/game/getAllListeningQuestions`,
  );
  return response;
};

export const game_getSingleListeningQuestion = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/game/getAllListeningQuestions`,
  );
  return response.data[Math.floor(Math.random() * response.data.length)];
};