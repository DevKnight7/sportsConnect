import { DashboardData } from '../shared/customTypes'
 
import { baseApi } from './baseApi';

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        
        getDashBoardData: builder.query<DashboardData, void>({
            query: () => ({
                url: `/users/dashboard`,
                method: 'GET',
            }),
            providesTags: ['DashboardData']
        })

    }),
});

export const {  useGetDashBoardDataQuery} = dashboardApi;
