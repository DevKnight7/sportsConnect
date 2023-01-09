

export interface signInForm {
    email: string
    password: string
    rememberMe: boolean
}

export interface signUpForm {
    email: string
    password: string
    first_name: string
    last_name: string
}

export interface resetPasswordForm {
    code: string
    new_password: string
}


export interface updateProfileForm {
    first_name: string
    last_name: string
    email?: string
    username: string
}

export interface createSportAttrs {
    request_id: number
    feedback: {
        [key: string]: number
    }
}


export interface feedbackFormParams {
    id: number
    sport_id: number
    sport_name: string
}




export interface AuthReducerStateRoot {
    isLoggedIn: boolean;
}


export interface AuthReducerState {
    authReducer: AuthReducerStateRoot;
}


export interface createSportAttrs {
    request_id: number
    feedback: {
        [key: string]: number
    }
}

export interface UserProfileType {
    email: string,
    first_name: string,
    last_name: string,
    profile_pic: string,
    username: string
}

export interface FeedbackRequest {
        id: number,
        requester_name: string,
        requester_username: string,
        sport_id: number,
        sport_name: string,
        status: string,
        user_id: number
}

export interface ignoreFeedbackParams {
    request_id: number,
    status: string
}

export interface SearchUserByParams {
    id: number,
    name: string
}

export interface DashboardData {
    average_rating: number,
    total_feedbacks: number,
    total_players: number
} 

export interface createFeedbackRequest {
    requested_to_id: number,
    sport_id: number
}

export interface createFriendRequest{
    from: {
        name: string,
        profile_pic: string,
        user_id: number,
        username: string
    },
    id: number
}

export interface Friends {
        name: string,
        profile_pic: string,
        user_id: number,
        username: string
}

export interface publicProfile {
    
        user_sports: {
            name: string,
            role: string
        }[],
        friend_status: string,
        profile: {
            email: string,
            name: string,
            profile_pic: string,
            username: string
        }
    
}


