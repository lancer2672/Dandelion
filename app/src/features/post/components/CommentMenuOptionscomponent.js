import { MaterialIcons } from "@expo/vector-icons";
import {} from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

import { useDeleteCommentMutation } from "@src/store/slices/api/postApiSlice";
export const CommentMenu = ({ postId, commentId }) => {
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteComment = () => {
    deleteComment({ postId, commentId });
  };
  return (
    <Menu render={renderers.SlideInMenu}>
      <MenuTrigger>
        <MaterialIcons name="expand-more" size={24} color="black" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionTouchable: {
            underlayColor: "red",
          },
          optionWrapper: {
            backgroundColor: "pink",
            margin: 5,
          },
          optionText: {
            color: "black",
          },
        }}
      >
        <MenuOption onSelect={() => null} text={"Chỉnh sửa bình luận"} />
        <MenuOption onSelect={handleDeleteComment} text="Xóa bình luận" />
        <MenuOption>
          <Text>Hủy</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
