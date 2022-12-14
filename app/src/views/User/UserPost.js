import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { useSelector } from "react-redux";

import PostItem from "../../features/post/components/post-item";

const SCREEN_WIDTH = Dimensions.get("window").width;

const UserPost = () => {
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.posts);
  const [isLoading, setLoading] = useState(false);

  const userPosts = posts.filter((post, index) => {
    return post.user == user._id;
  });
  const items = userPosts.map((post, index) => {
    return {
      type: "NORMAL",
      item: {
        id: index,
        ...post,
      },
    };
  });
  const dataProvider = new DataProvider((r1, r2) => r1 != r2).cloneWithRows(
    items
  );
  const layoutProvider = new LayoutProvider(
    (i) => {
      return dataProvider.getDataForIndex(i).type;
    },
    (type, dim) => {
      switch (type) {
        case "NORMAL":
          dim.width = SCREEN_WIDTH;
          //Tuỳ thuộc vào độ dài của phần text mà set độ cao cho thẻ
          dim.height = 600;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  /*#endregion*/
  const rowRenderer = (type, data) => {
    return <PostItem {...data.item} postId={data.item._id}></PostItem>;
  };
  return (
    // <>
    //   {isLoading == true ? (
    //     <Text>LOading...</Text>
    //   ) : userPosts.length < 0 ? (
    //     <></>
    //   ) : (
    <RecyclerListView
      style={{ width: SCREEN_WIDTH, height: 540 }}
      rowRenderer={rowRenderer}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
    ></RecyclerListView>
    //   )}
    // </>
  );
};

export default UserPost;

const styles = StyleSheet.create({});
