/* eslint-disable prettier/prettier */
import { UrlAPI } from "../../constants";
import axios from "axios";

export const GetAllPosts = () => {
  return axios.get(`${UrlAPI}/post/`, {});
};

export const DeletePost = (postId) => {
  return axios.delete(`${UrlAPI}/post/${postId}`);
};

export const CreatePost = (newPostData) => {
  return axios.post(`${UrlAPI}/post/create`, newPostData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const ReactPost = (postId) => {
  return axios.put(`${UrlAPI}/post/react/${postId}`, {
    react: true,
  });
};

export const CommentPost = (postId, content) => {
  return axios.put(`${UrlAPI}/post/comment/${postId}`, {
    content,
  });
};

export const DeleteComment = (postId, commentId) => {
  return axios.delete(`${UrlAPI}/post/comment/${postId}`, {
    data: {
      commentId,
    },
  });
};

export const UpdatePost = (postId, newPostData) => {
  return axios.put(`${UrlAPI}/post/${postId}`, newPostData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
