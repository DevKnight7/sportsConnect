import { Sport, SportRoles, MatchTeams } from '../shared/sportsTypes'

import { baseApi } from './baseApi';

export const sportsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSports: builder.query<Sport[], void>({
            query: () => ({
                url: `/sports`,
                method: 'GET',
            }),
            providesTags: ['Sports']
        }),
        getSportRoles: builder.query<SportRoles[], number>({
            query: (sport_id) => ({
                url: `/sports/roles/${sport_id}`,
                method: 'GET',
            }),
            providesTags: ['SportRoles'],
        }),
        // Sports Matches
        getMatchTeams: builder.query<MatchTeams, number>({
            query: (id) => ({
                url: `/sports/matches/${id}`,
                method: 'GET',
            }),
            providesTags: ['MatchTeams']
        }),
        
        getMatches: builder.query<any, void>({
            query: () => ({
                url: `/sports/matches`,
                method: 'GET',
            }),
            providesTags: ['Matches']
        }),
        createEndMatchFeedback: builder.mutation<{ message: string, winner_team: string }, { createEndMatchFeedbackRequestPayload: any }>({
            query: ({createEndMatchFeedbackRequestPayload}) => {
                return {
                    url: `/sports/matches/feedback`,
                    method: 'POST',
                    body: { ...createEndMatchFeedbackRequestPayload }
                }
            },
            invalidatesTags: ['Matches', 'MatchTeams']
        }),
        getFilteredMatches: builder.query<any, number>({
            query: (sport_id) => ({
                url: `/sports/${sport_id}/matches`,
                method: 'GET',
            }),
            // providesTags: ['Matches']
        })

        
    }),
   
});

export const { useGetSportsQuery, useGetSportRolesQuery, useGetMatchTeamsQuery, useGetMatchesQuery, useCreateEndMatchFeedbackMutation, useGetFilteredMatchesQuery } = sportsApi;
