import { getSocket } from "@src/utils/socket";

const postMiddleware = () => (store) => {
  return (next) => (action) => {
    const socket = getSocket();
    switch (action.type) {
      case "post/reactPost": {
        socket.emit("react-post", action.payload);
        break;
      }
      case "post/commentPost": {
        socket.emit("comment-post", action.payload);
        break;
      }
    }
    next(action);
  };
};

export default postMiddleware;
