import { baseApi } from './baseApi';
import {createFriendRequest, Friends} from '../shared/customTypes'

export const friendsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFriendRequests: builder.query<any, void>({
            query: () => ({
                url: `/users/friends/requests`,
                method: 'GET',
            }),
            providesTags: ['FriendRequests']
        }),
        FriendRequestAction: builder.mutation<{ message: string}, {action: string, request_id: number}>({
            query: ({action, request_id}) => {
                return {
                    url: `/users/friends/requests`,
                    method: 'PUT',
                    body: { request_id, action }
                }
            },
            invalidatesTags: ['FriendRequests', 'Friends', 'PublicProfile']   
        }),
        createFriendRequest: builder.mutation<{ message: string}, {sent_to: number }>({
            query: ({sent_to}) => {
                return {
                    url: `/users/friends/requests`,
                    method: 'POST',
                    body: { sent_to }
                }
            },
            invalidatesTags: ['FriendRequests', 'PublicProfile']
        }),
        getFriends: builder.query<Friends[], void>({
            query: () => ({
                url: `/users/friends`,
                method: 'GET',
            }),
            providesTags: ['Friends']
        }),
        unfriendUser: builder.mutation<{ message: string }, {user_id: number, action: string}>({
            query: ({user_id, action}) => ({
                url: `/users/friends/requests`,
                method: 'DELETE',
                body: {user_id, action}
            }),
            invalidatesTags: ['Friends', 'PublicProfile']
        })


    }),
});

export const { useFriendRequestActionMutation, useCreateFriendRequestMutation, useGetFriendRequestsQuery, useGetFriendsQuery, useUnfriendUserMutation } = friendsApi;
