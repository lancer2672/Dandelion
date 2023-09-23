import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { transformUserData } from "@src/utils/transformHelper";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";

const userRoute = "/user";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User", "SearchHistory"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `${userRoute}/${userId}`,
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
      },
      providesTags: ["User"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("online-users", (onlineUserIds) => {
            updateCachedData((draft) => {
              const userId = draft.user._id;
              if (onlineUserIds[userId] != null) {
                draft.user.isOnline = 1;
              }
            });
          });
          socket.on("offline-users", (offlineUserId) => {
            updateCachedData((draft) => {
              const userId = draft.user._id;
              if (offlineUserId == userId) {
                draft.user.isOnline = 0;
                draft.user.lastOnline = new Date().toISOString();
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
    getListUser: builder.mutation({
      query: (listIds) => ({
        url: `${userRoute}/list`,
        method: "POST",
        body: { listIds },
      }),
      transformResponse: (response, meta, arg) => {
        response.data.users = response.data.users.map((user) => {
          return transformUserData(user);
        });
        return response.data.users;
      },
    }),
    updateUser: builder.mutation({
      query: ({ newUserData }) => ({
        url: `${userRoute}/update`,
        method: "PUT",
        body: newUserData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
      },
      invalidatesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `/api/auth/register`,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data.message,
    }),
    saveFCMtoken: builder.mutation({
      query: (token) => ({
        url: `${userRoute}/save-token`,
        method: "PUT",
        body: { token },
      }),
    }),
    searchUser: builder.query({
      query: (keyword) => `${userRoute}/search/?q=${keyword}`,
      transformResponse: (response, meta, arg) => {
        return response.data.map((user) => transformUserData(user));
      },
    }),
    getSearchHistory: builder.query({
      query: () => `${userRoute}/search-history/recent`,
      transformResponse: (response, meta, arg) => {
        return response.data.map((user) => transformUserData(user));
      },
      providesTags: ["SearchHistory"],
    }),
    addUserToSearchHistory: builder.mutation({
      query: (userId) => ({
        url: `${userRoute}/search-history/add`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["SearchHistory"],
    }),
    removeUserFromSearchHistory: builder.mutation({
      query: (userId) => ({
        url: `${userRoute}/search-history/remove/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SearchHistory"],
    }),
  }),
});

export const {
  useCreateUserMutation,

  useGetUserByIdQuery,
  useGetListUserMutation,
  useUpdateUserMutation,
  useSaveFCMtokenMutation,
  useSearchUserQuery,

  useGetSearchHistoryQuery,
  useAddUserToSearchHistoryMutation,
  useRemoveUserFromSearchHistoryMutation,
} = userApi;
