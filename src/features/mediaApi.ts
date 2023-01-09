// import { UserProfileType, updateProfileForm } from '../shared/customTypes'

import { baseApi } from './baseApi';

export const mediaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfilePic: builder.mutation<{ message: string }, { mediaObject: any }>({
            query: (mediaObject) => {
                return {
                    url: `/users/profile_pic`,
                    method: 'POST',
                    body: { ...mediaObject.mediaObject }
                }
            },
            invalidatesTags: ['Media']
        })

    }),
});

export const { useUpdateProfilePicMutation } = mediaApi;
