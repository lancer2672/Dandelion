import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";

import { Avatar } from "@src/components/Avatar";
import { userSelector } from "@src/store/selector";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

import CustomEditText from "@src/components/CustomEditText";
import { useState } from "react";

import userApi from "@src/api/user";
import withLoading from "@src/utils/withLoading";
import { useTheme } from "styled-components";
import GenderSelection from "../components/GenderSelection.component";

const dayjs = require("dayjs");

const EditProfile = ({ navigation }) => {
  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState(user.nickname);
  const [gender, setGender] = useState(user.gender);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(user.dateOfBirth));
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderSelection, setShowGenderSelection] = useState(false);

  const handleUpdateUserInfo = async () => {
    withLoading(
      dispatch,
      async () => {
        const newUserData = {
          nickname,
          gender,
          dateOfBirth,
          email,
          phoneNumber,
        };
        await userApi.updateUser(newUserData);
        showMessage({
          message: t("updateSucceeded"),
          type: "success",
        });
      },
      (error) => {
        showMessage({
          message: t("updateFailed"),
          type: "danger",
        });
      }
    );
  };
  const onGenderFieldClick = () => {
    setShowGenderSelection(true);
  };
  const onDateOfBirthFieldClick = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView
      style={{
        padding: 20,
        backgroundColor: theme.colors.bg.primary,
        flex: 1,
        // opacity: showGenderSelection || isLoading ? 0.6 : 1,
      }}
    >
      <Header>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color={theme.colors.text.primary}
          />
        </BackButton>
        <Heading>{t("editProfile")}</Heading>
      </Header>

      <Body>
        <Avatar
          style={{ width: 80, height: 80 }}
          source={{ uri: user.avatar }}
        ></Avatar>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: theme.colors.text.primary,
          }}
        >
          {user.nickname}
        </Text>
        <Text
          style={{ fontSize: 18, color: "gray", fontWeight: 400 }}
        >{`${user.email}`}</Text>

        <View
          style={{
            marginTop: 20,
            marginBottom: 8,
            width: "100%",
            borderColor: "gray",
            borderBottomWidth: 1,
          }}
        ></View>

        <CustomEditText
          label={t("nickname")}
          style={{ width: "100%" }}
          value={nickname}
          onChangeText={(newText) => setNickname(newText)}
        ></CustomEditText>
        <View style={{ flexDirection: "row" }}>
          <CustomEditText
            label={t("gender")}
            onPress={onGenderFieldClick}
            style={{ flex: 1, marginRight: 20 }}
            editable={false}
            value={gender == 0 ? t("male") : t("female")}
          ></CustomEditText>
          <CustomEditText
            label={t("dateOfBirth")}
            style={{ flex: 1 }}
            editable={false}
            value={dayjs(dateOfBirth).format("DD-MM-YYYY")}
            onPress={onDateOfBirthFieldClick}
          ></CustomEditText>
        </View>
        <CustomEditText
          label={"Email"}
          style={{ width: "100%" }}
          value={email}
          onChangeText={(newText) => setEmail(newText)}
        ></CustomEditText>
        <CustomEditText
          label={t("phoneNumber")}
          style={{ width: "100%" }}
          value={phoneNumber}
          onChangeText={(newText) => setPhoneNumber(newText)}
        ></CustomEditText>
      </Body>

      <SaveBtn onPress={handleUpdateUserInfo}>
        <SaveBtnText>{t("save")}</SaveBtnText>
      </SaveBtn>

      {showDatePicker && (
        <RNDateTimePicker
          maximumDate={new Date()}
          mode="date"
          onChange={(e, date) => {
            if (e.type == "set") {
              setDateOfBirth(date);
            }
            setShowDatePicker(false);
          }}
          value={dateOfBirth == null ? new Date() : dateOfBirth}
        ></RNDateTimePicker>
      )}
      <GenderSelection
        visible={showGenderSelection}
        onClose={() => {
          setShowGenderSelection(false);
        }}
        gender={gender}
        setGender={setGender}
      ></GenderSelection>
    </ScrollView>
  );
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Body = styled.View`
  padding-vertical: 20px;
  flex: 1;

  justify-content: center;
  align-items: center;
`;
const BackButton = styled.TouchableOpacity`
  padding-horizontal: 8px;
  padding-vertical: 4px;
`;
const SaveBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.bg.tertiary};
  padding: 8px;
  border-radius: 8px;
`;
const SaveBtnText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white[100]};
`;
const Heading = styled.Text`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.black[100]};
`;
export default EditProfile;
