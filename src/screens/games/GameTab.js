import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, Icon } from "../../components";

const GameTabItem = ({ name, imageURL, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Icon name={{ uri: imageURL }} size={125} style={styles.avatarImage} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default GameTab = (props) => {
  const { navigate, goBack } = props.navigation;
  const [games] = useState([
    {
      id: 1,
      name: "Spell The Word",
      imageURL:
        "https://m.media-amazon.com/images/I/61Tv03J8WcL.png",
      gameScreen: "GamePicWord",
    },
    {
      id: 2,
      name: "Xếp Chữ Cái Trùng Lặp",
      imageURL:
        "https://play-lh.googleusercontent.com/1VE6HgXUnF6rnvK-45r7robWnz7bAZ_IiY9-KGwrmxwK-3A93neMk4LPykKQx_vvGFw",
      gameScreen: "GameWordSort",
    },
    {
      id: 3,
      name: "Luyện Nghe Listening",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyZVUbn-mA57CU1kuamnmpB99Eq-unWdonSA&s",
      gameScreen: "GameListening",
    },
    {
      id: 4,
      name: "Đuổi Hình Bắt Chữ 2",
      imageURL:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2024_4_21_638493174114055954_dap-an-duoi-hinh-bat-chu-zalo.png",
      gameScreen: "GamePicWord2",
    },
    {
      id: 5,
      name: "Wordle",
      imageURL:
        "https://sm.ign.com/ign_nordic/cover/w/wordle/wordle_rtdv.jpg",
      gameScreen: "GameWordle",
    },
    {
      id: 6,
      name: "Chọn Màu Sắc 1",
      imageURL:
        "https://isfdn.org/core/files/isfdn/uploads/images/Primary%20and%20Secondary%20Colors.png",
      gameScreen: "GameColors1",
    },
    {
      id: 7,
      name: "Chọn Màu Sắc 2",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Color_circle_%28hue-sat%29.png/310px-Color_circle_%28hue-sat%29.png",
      gameScreen: "GameColors2",
    },
    {
      id: 8,
      name: "Tìm Màu Sắc 2x2",
      imageURL:
        "https://i.pinimg.com/236x/19/24/78/19247860d0f28241904f81c842a7902b.jpg",
      gameScreen: "GameFindDifferentColors2x2",
    },
    {
      id: 9,
      name: "Tìm Màu Sắc 3x3",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4PrNOjYjVQZt1ARR9DJ1GNtA5eLEwQRZIVw&s",
      gameScreen: "GameFindDifferentColors3x3",
    },
    {
      id: 10,
      name: "Tìm Màu Sắc 4x4",
      imageURL:
        "https://i.pinimg.com/736x/cf/a3/04/cfa30440ae125b300723161f20f6899a.jpg",
      gameScreen: "GameFindDifferentColors4x4",
    },
    {
      id: 11,
      name: "Tìm Màu Sắc 5x5",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjsTBnH0CKxxSMTgSAHNEWUXaq1yT32SFGw&s",
      gameScreen: "GameFindDifferentColors5x5",
    },
    {
      id: 12,
      name: "Tìm Màu Sắc 6x6",
      imageURL:
        "https://hips.hearstapps.com/hmg-prod/images/pantone-colour-of-the-year-coty-6751d69547950.jpg?crop=0.502xw:1.00xh;0,0&resize=640:*",
      gameScreen: "GameFindDifferentColors6x6",
    },
    {
      id: 13,
      name: "Tìm Màu Sắc 7x7",
      imageURL:
        "https://i.pinimg.com/474x/c4/d8/a7/c4d8a71be0a1ebfa21237f39b30541eb.jpg",
      gameScreen: "GameFindDifferentColors7x7",
    },
  ]);

  return (
    <View style={styles.container}>
      <UIHeader title={"Mini Games"} />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameTabItem
            name={item.name}
            imageURL={item.imageURL}
            onPress={() => navigate(`${item.gameScreen}`)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 65,
  },
  flatlistContent: {
    padding: 10,
  },
  //
  itemContainer: {
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 3,
  },
  name: {
    color: "black",
    fontSize: fontSizes.h5,
    marginTop: 5,
    textAlign: "center",
  },
});
