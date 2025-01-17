import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Registration,
  ForgetPassword,
  Verification,
  ResetPassword,
  UserProfile,
  ResetPasswordInProfile,
  SettingProfile,
  Friends,
  GroupChat,
  AllNotification,
  Messenger,
  MessengerGroup,
  ShowPost,
  Comment,
  Reply,
  //
  GameTab,
  GamePicWord,
  GameWordSort,
  GameListening,
  GamePicWord2,
  GameColors1,
  GameColors2,
  GameFindDifferentColors2x2,
  GameFindDifferentColors3x3,
  GameFindDifferentColors4x4,
  GameFindDifferentColors5x5,
  GameFindDifferentColors6x6,
  GameFindDifferentColors7x7,
  GameWordle,
} from "../screens";
import MainBottomTab from "./MainBottomTab";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainBottomTab" component={MainBottomTab} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          name="ResetPasswordInProfile"
          component={ResetPasswordInProfile}
        />
        <Stack.Screen name="SettingProfile" component={SettingProfile} />

        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="AllNotification" component={AllNotification} />
        <Stack.Screen name="Messenger" component={Messenger} />

        <Stack.Screen name="MessengerGroup" component={MessengerGroup} />
        <Stack.Screen name="ShowPost" component={ShowPost} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Reply" component={Reply} />

        <Stack.Screen name="GameTab" component={GameTab} />
        <Stack.Screen name="GamePicWord" component={GamePicWord} />
        <Stack.Screen name="GameWordSort" component={GameWordSort} />
        <Stack.Screen name="GameListening" component={GameListening} />
        <Stack.Screen name="GamePicWord2" component={GamePicWord2} />
        <Stack.Screen name="GameColors1" component={GameColors1} />
        <Stack.Screen name="GameColors2" component={GameColors2} />
        <Stack.Screen
          name="GameFindDifferentColors2x2"
          component={GameFindDifferentColors2x2}
        />
        <Stack.Screen
          name="GameFindDifferentColors3x3"
          component={GameFindDifferentColors3x3}
        />
        <Stack.Screen
          name="GameFindDifferentColors4x4"
          component={GameFindDifferentColors4x4}
        />
        <Stack.Screen
          name="GameFindDifferentColors5x5"
          component={GameFindDifferentColors5x5}
        />
        <Stack.Screen
          name="GameFindDifferentColors6x6"
          component={GameFindDifferentColors6x6}
        />
        <Stack.Screen
          name="GameFindDifferentColors7x7"
          component={GameFindDifferentColors7x7}
        />
        <Stack.Screen name="GameWordle" component={GameWordle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
