import {
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import { Avatar } from "@src/components/Avatar";
import { userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import {
  useGetLastMessageQuery,
  useLoadChatRoomMessagesQuery,
} from "@src/store/slices/api/chatApiSlice";

const Channel = ({ navigation, channel }) => {
  const { _id: channelId, memberIds } = channel;
  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const [chatFriend, setChatFriend] = useState(null);
  const [chatFriendId, setChatFriendId] = useState(null);
  const [lastMessage, setLastMessage] = useState({});
  const [unseenMessageIds, setUnseenMessageIds] = useState([]);
  const { data: lastMsgData, isLoading: isLoadLastMsg } =
    useGetLastMessageQuery(channelId, {
      refetchOnMountOrArgChange: true,
    });
  const { data: dataChannelMsg } = useLoadChatRoomMessagesQuery(channelId);
  const { isLoading, isSuccess, data, error } = useGetUserByIdQuery(
    chatFriendId,
    {
      skip: !chatFriendId,
    }
  );
  const handleNavigateToGuest = () => {
    if (chatFriendId) {
      navigation.navigate("Guest", { guestId: chatFriendId });
    }
  };
  useEffect(() => {
    if (dataChannelMsg && chatFriend) {
      let countUnseenMsg = [];
      let index = 0;
      while (
        index < dataChannelMsg.length &&
        dataChannelMsg[index].userId == chatFriend._id &&
        dataChannelMsg[index].isSeen == false
      ) {
        countUnseenMsg.push(dataChannelMsg[index]._id);
        index++;
      }
      setUnseenMessageIds(countUnseenMsg);
    }
  }, [dataChannelMsg, chatFriend]);
  useEffect(() => {
    const friendId = memberIds.filter((id) => id != user._id);
    setChatFriendId(() => friendId[0]);
  }, []);

  useEffect(() => {
    if (lastMsgData) {
      setLastMessage(lastMsgData.lastMessage);
    }
  }, [isLoadLastMsg, lastMsgData]);
  useEffect(() => {
    if (isSuccess) {
      setChatFriend(() => data.user);
    } else console.log("error", error);
  }, [isLoading, data]);
  return (
    <Container
      onPress={() => {
        navigation.navigate("ChatRoom", {
          channelId,
          memberIds,
        });
        if (lastMessage) {
          setLastMessage((prev) => ({ ...prev, isSeen: true }));
        }

        setUnseenMessageIds([]);
      }}
    >
      <TouchableOpacity onPress={handleNavigateToGuest}>
        <Avatar
          width={60}
          height={60}
          source={
            chatFriend
              ? chatFriend.avatar
                ? { uri: chatFriend.avatar }
                : undefined //use default source
              : undefined
          }
        ></Avatar>
        {chatFriend?.isOnline == 1 && (
          <Entypo
            style={{
              position: "absolute",
              right: "-24%",
              bottom: "-24%",
            }}
            name="dot-single"
            size={52}
            color="green"
          />
        )}
      </TouchableOpacity>
      <View style={{ flex: 1, marginVertical: 8, marginHorizontal: 8 }}>
        <Name>{chatFriend ? chatFriend.nickname : ""}</Name>

        {lastMessage ? (
          <Text
            style={{
              opacity:
                lastMessage.userId == user._id
                  ? 0.5
                  : lastMessage.isSeen
                  ? 0.5
                  : 1,
              fontWeight:
                lastMessage.userId == user._id
                  ? "400"
                  : lastMessage.isSeen
                  ? "400"
                  : "bold",
              fontSize: 16,
            }}
          >
            {lastMessage.message}
          </Text>
        ) : (
          <Text
            style={{
              opacity: 0.5,
              fontWeight: "400",
              fontStyle: "italic",
              fontSize: 16,
            }}
          >
            {t("emptyMessage")}
          </Text>
        )}
      </View>
      {lastMessage && (
        <View
          style={{
            height: "100%",
            justifyContent: "flex-end",
            marginBottom: 12,
          }}
        >
          {unseenMessageIds.length > 0 && (
            <Text
              style={{
                fontSize: 16,

                paddingVertical: 4,
                marginBottom: 12,
                color: "tomato",
                textAlign: "center",
              }}
            >
              {unseenMessageIds.length}
            </Text>
          )}

          <Text
            style={{
              opacity:
                lastMessage.userId == user._id
                  ? 0.5
                  : lastMessage.isSeen
                  ? 0.5
                  : 1,
              fontWeight:
                lastMessage.userId == user._id
                  ? "400"
                  : lastMessage.isSeen
                  ? "400"
                  : "bold",
              fontSize: 16,
            }}
          >
            {commentCreatedTimeFormater(lastMessage.createdAt)}
          </Text>
        </View>
      )}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 80px;
  justify-content: flex-start;
  align-items: center;
  border-color: ${(props) => props.theme.colors.bg.secondary}
  flex-direction: row;
  marginVertical: 8px;
`;
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  flex: 1;
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export default Channel;

const styles = StyleSheet.create({});
