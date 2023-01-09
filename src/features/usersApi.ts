import { UserSportPayload, UserSportType } from '../shared/userSportsTypes'
import { UserProfileType, updateProfileForm, publicProfile } from '../shared/customTypes'

import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserSports: builder.query<UserSportType[], void>({
            query: () => ({
                url: `/users/sports`,
                method: 'GET',
            }),
            providesTags: ['UserSports']
        }),
        createUserSport: builder.mutation<{ message: string }, { userSport: UserSportPayload }>({
            query: (userSport) => {
                return {
                    url: `/users/sports`,
                    method: 'POST',
                    body: { ...userSport.userSport }
                }
            },
            invalidatesTags: ['UserSports']
        }),
        deleteUserSport: builder.mutation<{ message: string }, number>({
            query: (sport_id) => ({
                url: `/users/sports/${sport_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserSports']
        }),
        getUserProfile: builder.query<UserProfileType, void>({
            query: () => ({
                url: `/users/profile`,
                method: 'GET',
            }),
            providesTags: ['UserProfile']
        }),
        updateProfile: builder.mutation<{ message: string }, { userprofile: updateProfileForm }>({
            query: (userprofile) => {
                return {
                    url: `/users/profile`,
                    method: 'PUT',
                    body: { ...userprofile.userprofile }
                }
            },
            invalidatesTags: ['UserProfile']
        }),
        updateSportsAvailibility: builder.mutation<{ message: string }, boolean>({
            query: (is_available) => {
                return {
                    url: `/users/sports/availability`,
                    method: 'PUT',
                    body: { is_available }
                }
            },
            invalidatesTags: ['UserSports']
        }),
        getPublicProfile: builder.query<publicProfile, void>({
            query: (id) =>  {
                return {
                url: `/users/${id}/public_profile`,
                method: 'GET',
            }},
            providesTags: ['PublicProfile']
        })


    }),
});

export const { useGetUserSportsQuery, useCreateUserSportMutation , useDeleteUserSportMutation, useGetUserProfileQuery, useUpdateProfileMutation, useUpdateSportsAvailibilityMutation, useGetPublicProfileQuery } = userApi;
