import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";

import InputBar from "../components/InputBar.component";
import ListUserMessages from "../components/ListMessage.component";
import ChatRoomHeader from "../components/ChatRoomHeader.component";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";

const ChatRoom = ({ navigation, route }) => {
  const { user } = useSelector(userSelector);
  const { channelId, memberIds } = route.params;
  const [chatFriendId, setChatFriendId] = useState(null);
  const [chatFriend, setChatFriend] = useState({});
  const { isLoading, isSuccess, data, error } = useGetUserByIdQuery(
    chatFriendId,
    {
      skip: !chatFriendId,
    }
  );
  useEffect(() => {
    const friendId = memberIds.filter((id) => id != user._id);
    setChatFriendId(friendId[0]);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setChatFriend(() => data.user);
    } else console.log("error", error);
  }, [isLoading, data]);

  return (
    <Container>
      <ChatRoomHeader
        chatFriend={chatFriend}
        navigation={navigation}
      ></ChatRoomHeader>
      <ListUserMessages
        chatFriend={chatFriend}
        channelId={channelId}
      ></ListUserMessages>
      <InputBar channelId={channelId}></InputBar>
    </Container>
  );
};
const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
`;
export default ChatRoom;
