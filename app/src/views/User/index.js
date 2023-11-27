import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { userSelector } from "@src/store/selector";
import FeatureTabs from "@src/features/user/components/FeatureTabs.component";
import {
  UserDescription,
  Name,
  HeaderContent,
  BottomHeader,
  ItemValue,
  ItemLabel,
  ItemContainer,
} from "../sharedStyledComponents";
import Settings from "@src/features/user/screens/Settings.screen";
import { useGetPostByUserIdQuery } from "@src/store/slices/api/postApiSlice";
import { useTheme } from "styled-components";
import { getSignedUrl, uploadFile } from "@src/api/upload";
import { setIsLoading } from "@src/store/slices/appSlice";
import userApi from "@src/api/user";
import withLoading from "@src/utils/withLoading";

const User = ({ props, navigation }) => {
  const { user = {} } = useSelector(userSelector);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data: postData } = useGetPostByUserIdQuery(user._id);
  const [avatarUri, setAvatarUri] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const navigateToFriendListScreen = () => {
    navigation.navigate("FriendList", { userId: user._id });
  };
  useEffect(() => {
    setAvatarUri(user.avatar);
  }, []);
  const updateUserImage = async (isWallpaper, setUri) => {
    withLoading(
      dispatch,
      async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
          setSelectedImageUri(result.uri);
          console.log("result.uri", result.uri);
          const newUserData = new FormData();
          newUserData.append("image", {
            uri: result.uri,
            name: new Date() + "_profile",
            type: "image/jpg",
          });
          const { fileIds } = await uploadFile({
            type: "image",
            data: newUserData,
          });
          const { fileUrls } = await getSignedUrl({ fileIds });
          userApi.updateUser({
            avatar: {
              name: fileIds[0],
              url: fileUrls[0],
            },
          });
        }
      },
      (error) => {
        showMessage({
          message: t("updateFailed"),
          type: "danger",
        });
      }
    );
  };
  const handleUpdateAvatar = () => updateUserImage(false, setAvatarUri);
  return (
    <Container>
      <HeaderContainer>
        <Header>
          <HeaderContent>
            <TouchableOpacity>
              {/* <AntDesign name="arrowleft" size={32} color="black" /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <AntDesign
                name="setting"
                size={32}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          </HeaderContent>
          <Avatar avatarUri={avatarUri}>
            <TouchableOpacity onPress={handleUpdateAvatar}>
              <CameraIcon>
                <AntDesign
                  style={{ opacity: 1 }}
                  name="camera"
                  size={24}
                  color={theme.colors.text.primary}
                />
              </CameraIcon>
            </TouchableOpacity>
          </Avatar>
          <UserDescription>
            <Name>{user.nickname}</Name>
            {/* <Text>User description "ICON"</Text> */}
          </UserDescription>
        </Header>
        <BottomHeader>
          <ItemContainer>
            <ItemValue>{postData ? postData.length : 0}</ItemValue>
            <ItemLabel>{t("post")}</ItemLabel>
          </ItemContainer>
          <ItemContainer onPress={navigateToFriendListScreen}>
            <ItemValue>{user.friends.length}</ItemValue>
            <ItemLabel>{t("friend")}</ItemLabel>
          </ItemContainer>
        </BottomHeader>
      </HeaderContainer>

      <FeatureTabs userId={user._id}></FeatureTabs>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const HeaderContainer = styled.View`
  height: 300px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 100%;
  background-color: #9971ee;
  elevation: 5;
`;
const Header = styled.View`
  width: 100%;
  height: 80%;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.primary};
  elevation: 5;
  padding-bottom: 24px;
  padding-top: 12px;
`;
const Avatar = styled.ImageBackground.attrs((props) => {
  return {
    source:
      props.avatarUri == null
        ? require("@assets/imgs/DefaultAvatar.png")
        : { uri: props.avatarUri },
  };
})`
  border-width: 0px;
  border-radius: 60px;
  border-color: #555;
  width: 110px;
  height: 110px;
  overflow: hidden;
  justify-content: flex-end;
`;

const CameraIcon = styled.View`
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.4);
  padding-bottom: 10px;
`;

export default User;

const styles = StyleSheet.create({});
