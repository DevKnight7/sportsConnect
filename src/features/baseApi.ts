import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "sportsConnectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    headers: { content_type: "application/json" },
    credentials: "include",
  }),
  tagTypes: [
    "Sports",
    "UserSports",
    "FeedbackRequests",
    "SportRoles",
    "UserProfile",
    "Media",
    "SportAttributes",
    "DashboardData",
    "UserSportsAvailability",
    "FriendRequests",
    "Friends",
    "PublicProfile",
    "MatchTeams",
    "Matches",
    "timelinePosts",
    "postComments",
    "postLikes",
  ],
  endpoints: () => ({}),
});
