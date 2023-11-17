import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { AuthNavigator } from "./auth.navigator";
import { AppNavigator } from "./app.navigator";
import { appSelector, userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { setUser } from "@src/store/slices/userSlice";
import { setIsLoading } from "@src/store/slices/appSlice";
import { getSocket, initSocket } from "@src/utils/socket";
import {
  loginVoximplant,
  loginWithTokenVoximplant,
} from "@src/voximplant/services/Client";
StatusBar.setBackgroundColor("black");
const Navigator = () => {
  const userState = useSelector(userSelector);
  const appState = useSelector(appSelector);
  const dispatch = useDispatch();
  const [userCredentials, setCredentials] = useState({});
  const socket = getSocket();
  const {
    data,
    isSuccess,
    refetch,
    isLoading: isFetching,
    error,
  } = useGetUserByIdQuery(userCredentials.userId, {
    skip: !userCredentials.userId,
  });
  useEffect(() => {
    if (socket) {
      socket.on("unfriend", () => {
        refetch();
      });
      socket.on(
        "response-friendRequest",
        ({ requestId, responseValue, userIds }) => {
          refetch();
        }
      );
    }
  }, [socket]);
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setUser({
          user: data.user,
          token: userCredentials.token,
        })
      );
      console.log("user", data.user);
      initSocket(data.user._id);
    }
    dispatch(setIsLoading(isFetching));
  }, [isFetching, data]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const keys = ["userId", "token", "username", "tokenVoximplant"];
        const [userId, token, username, tokenVoximplant] = await Promise.all(
          keys.map((key) => AsyncStorage.getItem(key))
        );
        console.log("userId", userId);
        console.log("token", token);
        console.log("tokenVoximplant", tokenVoximplant);
        if (userId) {
          setCredentials({
            userId: JSON.parse(userId),
            token: JSON.parse(token),
          });
        }

        await loginWithTokenVoximplant(username, tokenVoximplant);
      } catch (er) {
        console.log("er", er);
      }
    };
    getUser();
  }, []);
  return (
    <NavigationContainer>
      {userState.user ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "red",
          }}
        >
          <StatusBar></StatusBar>
          <AppNavigator></AppNavigator>
        </SafeAreaView>
      ) : (
        <AuthNavigator></AuthNavigator>
      )}
      {appState.isLoading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <ActivityIndicator size="large" color={"rgba(54, 100, 186,0.4)"} />
        </View>
      )}
    </NavigationContainer>
  );
};

export default Navigator;