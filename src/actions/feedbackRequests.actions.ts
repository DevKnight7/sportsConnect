import FeedBackRequests from "../services/feedbackRequests";


export const getFeedbackRequestsList = () => {

    return FeedBackRequests.getFeedbackRequestsList().then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data , data: []};
    })

};

export const ignoreFeedbackRequest = (status: String , request_id:number) => {

    return FeedBackRequests.ignoreFeedbackRequest(status , request_id).then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data , data: []};
    })

};

export const createFeedbackRequest = (form : any) => {

    return FeedBackRequests.createFeedbackRequest(form).then((response:any) => {
        return { status: response.status, data: response.data, message: "Request Created Successfully." , error:"" };
    }).catch((e:any) => {
        return { status: e.response.status, error: e.response.data , message: e.response.message ||  "An error occurred"};  
    })

};




