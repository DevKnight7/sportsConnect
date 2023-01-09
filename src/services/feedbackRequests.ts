import axiosInstance from '../utils/axios';


class FeedBackRequests {
    
    static getFeedbackRequestsList = () => {
        let apiPath = '/api/feedback_requests';
        return axiosInstance.get(apiPath)
    };

    static ignoreFeedbackRequest = (status: String, request_id:number) => {
        let apiPath = '/api/feedback_requests/' + request_id;
        return axiosInstance.put(apiPath, {
            status
        })
    };

    static createFeedbackRequest = (form: any) => {
        let apiPath = '/api/feedback_requests';
        return axiosInstance.post(apiPath, {
            ...form
        })
    };

}
export default FeedBackRequests;

