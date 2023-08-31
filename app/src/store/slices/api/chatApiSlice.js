import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";
import { UrlAPI } from "@src/constants";
const chatRoute = "/chat";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loadChatRoomMessages: builder.query({
      query: (channelId) => `${chatRoute}/messages/${channelId}`,
      transformResponse: (response, meta, arg) => response.data.messages || [],
      transformErrorResponse: (response, meta, arg) => response.data.message,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("receive-message", (newMess, channelId) => {
            updateCachedData((draft) => {
              console.log("currentdraft", current(draft));
              draft.unshift(newMess);
            });
          });
          socket.on("receive-image", (newMess) => {
            console.log("new Message", newMess);
            updateCachedData((draft) => {
              draft.unshift(newMess);
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
    }),
    getChannels: builder.query({
      query: (userId) => ({ url: `${chatRoute}/channels`, params: userId }),
      transformResponse: (response, meta, arg) => response.data.channels || [],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();

          socket.on("new-channel", (newChannel) => {
            updateCachedData((draft) => {
              draft.unshift(newChannel);
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
    }),
    getLastMessage: builder.query({
      query: (channelId) => ({
        url: `${chatRoute}/last-message/${channelId}`,
      }),
      transformResponse: (response, meta, arg) => response.data,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("receive-message", (newMess, channelId) => {
            updateCachedData((draft) => {
              console.log("new Message", current(draft));
              if (draft.channelId === channelId) {
                draft.lastMessage = newMess;
              }
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const {
  useLoadChatRoomMessagesQuery,
  useGetChannelsQuery,
  useGetLastMessageQuery,
} = chatApi;
