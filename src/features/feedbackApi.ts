import { FeedbackRequest, ignoreFeedbackParams, createSportAttrs, createFeedbackRequest } from '../shared/customTypes'
import { SportAttributes } from '../shared/sportsTypes'
 
import { baseApi } from './baseApi';

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbackRequests: builder.query<FeedbackRequest[], any>({
            query: () => ({
                url: `/feedback_requests`,
                method: 'GET',
            }),
            providesTags: ['FeedbackRequests']
        }),
        createSportAttributes: builder.mutation<{ message: string }, { createSportsAttrPayload: createSportAttrs }>({
            query: ({createSportsAttrPayload}) => {
                console.log("the payload is ", createSportsAttrPayload)
                return {
                    url: `/sports/attrs/ratings`,
                    method: 'POST',
                    body: { ...createSportsAttrPayload }
                }
            },
            invalidatesTags: ['FeedbackRequests']
        }),
        getSportAttributes: builder.query<SportAttributes[], void>({
            query: (sport_id) => ({
                url: `/sports/${sport_id}/attributes`,
                method: 'GET',
            }),
            providesTags: ['SportAttributes']
        }),
        ignoreFeedbackRequest: builder.mutation<{ message: string, status: string }, {ignoreFeedbackPayload: ignoreFeedbackParams} >({
            query: ({ignoreFeedbackPayload}) => {
                return {
                    url: `/feedback_requests/${ignoreFeedbackPayload.request_id}`,
                    method: 'PUT',
                    body: { status: ignoreFeedbackPayload.status}
                }
            },
            invalidatesTags: ['FeedbackRequests']
        }),
        createFeedbackRequest: builder.mutation<{ message: string, status: string }, { createFeedbackRequestPayload: createFeedbackRequest }>({
            query: ({createFeedbackRequestPayload}) => {
                return {
                    url: `/feedback_requests`,
                    method: 'POST',
                    body: { ...createFeedbackRequestPayload }
                }
            },
            invalidatesTags: ['FeedbackRequests']
        }),

    }),
});

export const { useGetFeedbackRequestsQuery, useIgnoreFeedbackRequestMutation, useGetSportAttributesQuery, useCreateSportAttributesMutation, useCreateFeedbackRequestMutation } = feedbackApi;
