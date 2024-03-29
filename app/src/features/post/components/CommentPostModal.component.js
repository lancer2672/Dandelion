import { memo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

import { AntDesign } from "@expo/vector-icons";
import { postSelector } from "@src/store/selector";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import CommentItemComponent from "./CommentItem.component";
import InputBar from "./PostInputbar.component";

const CommentPostModal = ({ isVisible, onClose, isFocusInput }) => {
  const { selectedPost } = useSelector(postSelector);
  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={isVisible}
    //   onRequestClose={onClose}
    // >

    // <PanGestureHandler
    //   onGestureEvent={gestureHandler}
    //   // onHandlerStateChange={onHandlerStateChange}
    // >
    //   <Animated.View
    //     style={{ position: "absolute", flex: 1, backgroundColor: "red" }}
    //   >
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 12,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Comment</Text>
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", right: 12 }}
        >
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>
      {/* <View style={{ flex: 1 }}> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 12,
        }}
      >
        <CommentContainer>
          {selectedPost.comments.map((comment) => {
            return (
              <CommentItemComponent
                key={`${selectedPost._id + comment._id}`}
                comment={comment}
              ></CommentItemComponent>
            );
          })}
        </CommentContainer>
      </ScrollView>
      {/* </View> */}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "gray",
          marginBottom: 0,
        }}
      ></View>
      <InputBar autoFocus={isFocusInput} postId={selectedPost._id} />
    </View>
  );
};

const Container = styled(View)`
  justify-content: flex-end;
  flex: 1;
  margin-top: auto;
  background-color: black;
`;

const CommentContainer = styled(View)`
  flex: 1;
`;

export default memo(CommentPostModal);

const styles = StyleSheet.create({});
