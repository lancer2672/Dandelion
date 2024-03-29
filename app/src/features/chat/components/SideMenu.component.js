import { Feather } from "@expo/vector-icons";
import Avatar from "@src/components/Avatar";
import textStyle from "@src/components/typography/text.style";
import { navigate } from "@src/infrastructure/navigation/navigator.navigation";
import { AUTH_ROUTE } from "@src/infrastructure/navigation/route";
import { userSelector } from "@src/store/selector";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Divider, TouchableRipple } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components/native";

const SideMenu = ({ isVisible, onClose }) => {
  const [isHideScreen, setHideMusicScreen] = useState(false);
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const menu = [
    {
      leftIcon: (
        <Ionicons
          name="chatbubble-ellipses-sharp"
          size={24}
          color={theme.colors.text.primary}
        />
      ),
      text: "Tin nhắn chờ",
      onClick: () => {},
    },

    {
      leftIcon: (
        <Feather name="bell" size={24} color={theme.colors.text.primary} />
      ),
      text: "Thông báo",
      onClick: () => {},
    },
    {
      leftIcon: (
        <Feather name="settings" size={24} color={theme.colors.text.primary} />
      ),
      text: "Cài đặt",
      onClick: () => {},
    },
  ];
  const otherMenu = [
    {
      leftIcon: (
        <MaterialCommunityIcons
          name="movie-open-settings-outline"
          size={24}
          color={theme.colors.text.primary}
        />
        // <Feather name="settings" size={24} color={theme.colors.text.primary} />
      ),
      text: "Xem phim",
      onClick: () => {
        navigate(AUTH_ROUTE.MOVIE);
      },
    },
  ];

  useEffect(() => {}, []);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      useNativeDriver={true}
      animationOut="slideOutRight"
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View
        style={[
          styles.menuContainer,
          {
            backgroundColor: theme.colors.bg.secondary,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.header}>
            <Avatar
              style={{ width: 60, height: 60 }}
              source={{ uri: user.avatar }}
            ></Avatar>
            <View style={{ marginLeft: 8 }}>
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.colors.text.primary,
                  },
                ]}
              >
                {user.nickname}
              </Text>
              <Text
                style={[
                  styles.email,
                  {
                    color: theme.colors.text.primary,
                  },
                ]}
              >
                {user.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose}>
            <AntDesign
              name="close"
              size={30}
              color={theme.colors.text.primary}
            ></AntDesign>
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            width: "100%",
            alignSelf: "center",
            marginVertical: 8,
            borderColor: "red",
            height: 4,
            borderRadius: 12,
          }}
        />
        {menu.map((m, index) => {
          return <SideBarItem key={index} {...m}></SideBarItem>;
        })}
        <Text style={[textStyle.h[1]]}>Khác</Text>
        <Divider
          style={{
            width: "100%",
            alignSelf: "center",
            marginVertical: 8,
            borderColor: "red",
            height: 4,
            borderRadius: 12,
          }}
        />
        {otherMenu.map((m, index) => {
          return <SideBarItem key={`other-${index}`} {...m}></SideBarItem>;
        })}
      </View>
    </Modal>
  );
};

const SideBarItem = ({ text, onClick, leftIcon }) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onClick} rippleColor="rgba(0, 0, 0, .32)">
      <View
        style={[
          itemStyles.container,
          { backgroundColor: theme.colors.bg.primary },
        ]}
      >
        {leftIcon}
        <Text style={[itemStyles.text, { color: theme.colors.text.primary }]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};
const itemStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingLeft: 10,
  },
  text: {
    marginLeft: 4,
    fontSize: 18,
    fontWeight: "500",
  },
});

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "flex-end",
  },
  name: { fontWeight: "500", fontSize: 16 },
  email: { fontSize: 14 },
  menuContainer: {
    backgroundColor: "white",
    width: "80%",
    padding: 8,
    height: "100%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  setting: {
    fontSize: 32,
    fontWeight: "bold",
  },
  category: {
    fontSize: 24,
    borderTopColor: "gray",
    borderTopWidth: 1,
    marginTop: 8,
    fontWeight: "bold",
    color: "gray",
  },

  //setting item
  settingItemWrapper: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  settingName: {
    fontSize: 16,
  },
  settingValue: (theme) => ({
    fontSize: 16,
    fontWeight: "bold",
    color: theme.accent,
  }),
  btn: {
    padding: 4,
  },
});

export default SideMenu;
