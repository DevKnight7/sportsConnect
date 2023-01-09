import { Post, Comment } from "../shared/postTypes";

import { baseApi } from "./baseApi";

export const TimelineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimelinePosts: builder.query<Post[], void>({
      query: () => ({
        method: "GET",
        url: `/posts`,
      }),
      providesTags: ["timelinePosts"],
    }),

    getPostComments: builder.query<Comment[], number>({
      query: (post_id) => ({
        url: `/posts/${post_id}/comments?page=1&per_page=100`,
        method: "GET",
      }),
      providesTags: ["postComments"],
    }),

    createTimelinePost: builder.mutation<{ message: string; id: number }, { createTimelinePostPayload: any }>({
      query: ({ createTimelinePostPayload }) => {
        return {
          url: `/posts`,
          method: "POST",
          body: { ...createTimelinePostPayload },
        };
      },
      invalidatesTags: ["timelinePosts"],
    }),

    createPostComment: builder.mutation<{ message: string; id: number }, { createPostCommentPayload: any }>({
      query: ({ createPostCommentPayload }) => {
        return {
          url: "/posts/comments",
          method: "POST",
          body: createPostCommentPayload,
        };
      },
      invalidatesTags: ["postComments"],
    }),

    likePost: builder.mutation<{ message: string }, number>({
      query: (post_id) => {
        return {
          url: "/posts/likes",
          method: "POST",
          body: { post_id },
        };
      },
      invalidatesTags: ["postLikes"],
    }),

    updatePostComment: builder.mutation<{ message: string }, { comment_id: number; text: string; post_id: number }>({
      query: ({ comment_id, text, post_id }) => {
        return {
          url: `/posts/${post_id}/comments/${comment_id}`,
          method: "PUT",
          body: { text },
        };
      },
      invalidatesTags: ["postComments"],
    }),

    deletePostComment: builder.mutation<{ message: string }, { comment_id: number; text: string; post_id: number }>({
        query: ({ comment_id, text, post_id }) => {
          return {
            url: `/posts/${post_id}/comments/${comment_id}`,
            method: "DELETE",
            body: {},
          };
        },
        invalidatesTags: ["postComments"],
      }),

  }),
});

export const {
  useGetTimelinePostsQuery,
  useGetPostCommentsQuery,
  useCreateTimelinePostMutation,
  useCreatePostCommentMutation,
  useLikePostMutation,
  useUpdatePostCommentMutation,
  useDeletePostCommentMutation
} = TimelineApi;
