import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const group_findGroupbyName = async (nameGroup) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/findGroupbyName?nameGroup=${nameGroup}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );

  //alert(response.data)
  return response;
};
