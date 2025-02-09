import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import { Icon } from "../components";
import {
  UserProfile,
  Friends,
  GroupChat,
  AllNotification,
  GameTab,
} from "../screens";

const TabArr = [
  {
    route: "Groups",
    label: "Nhóm",
    icon: icons.groupIcon,
    component: GroupChat,
  },
  {
    route: "Chat",
    label: "Bạn bè",
    icon: icons.activeChatMessageIcon,
    component: Friends,
  },
  {
    route: "Game",
    label: "Game",
    icon: icons.review5,
    component: GameTab,
  },
  {
    route: "AllNotification",
    label: "Thông Báo",
    icon: icons.activeBellAlarm,
    component: AllNotification,
  },
  {
    route: "Account",
    label: "Hồ Sơ",
    icon: icons.personIcon,
    component: UserProfile,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.btnContainer}
    >
      <View style={[styles.btn, focused ? styles.btnFocused : null]}>
        <Icon
          name={item.icon}
          size={focused ? 22 : 20}
          color={
            focused
              ? colors.PrimaryContainer
              : colors.PrimaryOnContainerAndFixed
          }
        />
        {focused ? <View /> : <Text style={styles.label}>{item.label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default function MainBottomTab(props) {
  const { tabName } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName={!tabName ? "Chat" : tabName}
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.barContainer,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    height: 60,
    position: "absolute",
    margin: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.backgroundWhite,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
  },
  btnFocused: {
    top: -20,
    borderColor: colors.backgroundWhite,
    borderWidth: 8,
    backgroundColor: colors.PrimaryBackground,
  },
  label: {
    textAlign: "center",
    fontSize: fontSizes.h8,
  },
});
