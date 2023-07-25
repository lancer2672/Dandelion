import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Fontisto,
  AntDesign,
  FontAwesome5,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import styled from "styled-components/native";
import { useReactPostMutation } from "@src/store/services/postService";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { colors } from "@src/infrastructure/theme/colors";
import { Spacer } from "@src/components/spacer/spacer.component";
const ReactionBar = ({ post }) => {
  const { likes } = post;
  const [heart, setHeart] = useState(false);
  const userState = useSelector(userSelector);
  const [reactionNumber, setReactionNumber] = useState(0);
  const [reactPost, {}] = useReactPostMutation();
  const handleReact = () => {
    reactPost(post._id);
  };
  useEffect(() => {
    //check if user reacted this post
    const res = post.likes.find((object) => {
      return object.userId == userState.user._id;
    });
    if (res) {
      setHeart(true);
    } else {
      setHeart(false);
    }
    setReactionNumber(post.likes.length);
  }, [post.likes]);
  return (
    <ReactSectionContainer>
      <ButtonWrapper style={{ flexDirection: "row" }} onPress={handleReact}>
        {heart == true ? (
          <Ionicons name="heart" size={24} color="red" />
        ) : (
          <Ionicons name="heart-outline" size={24} color={colors.black} />
        )}
      </ButtonWrapper>
      <Number>{reactionNumber}</Number>
      <ButtonWrapper onPress={null}>
        <FontAwesome5 name="comment-dots" size={24} color={colors.white} />
      </ButtonWrapper>

      <Number>{post.comments.length}</Number>
      <ButtonWrapper onPress={null}>
        <Entypo name="dots-three-horizontal" size={24} color={colors.white} />
      </ButtonWrapper>
    </ReactSectionContainer>
  );
};
const ReactSectionContainer = styled(View)`
  position: absolute;
  top: 12%;
  right: 20px;
  align-items: center;
  justify-content: space-evenly;
`;
const Number = styled(Text)`
  margin-bottom: 12px;
  margin-top: 4px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
`;
const ButtonWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 12px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.3);
`;
export default ReactionBar;

const styles = StyleSheet.create({});
