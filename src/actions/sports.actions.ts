import Sport from '../services/sports';
import {createSportAttrs } from '../shared/customTypes';

export const getSportsList = () => {

    return Sport.getSportsList().then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data , data: []};
    })

};

export const createUserSport = (sport_id:Number, role_id: Number) => {

    return Sport.createUserSport(sport_id, role_id).then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data};
    })

};


export const getUserSports = () => {

    return Sport.getUserSports().then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data , data: []};
    })

};

export const updateUserSport = (is_available: boolean , user_sport_id:number) => {

    return Sport.updateUserSport(is_available , user_sport_id).then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data , data: []};
    })

};

export const deleteUserSport = (sport_id:number) => {

    return Sport.deleteUserSport(sport_id).then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data };
    })

};

export const getSportsAttribute = (sport_id:number) => {

    return Sport.getSportsAttribute(sport_id).then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data , data: []};
    })

};


export const createSportStats = (form: createSportAttrs) => {

    return Sport.createSportStats(form).then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data};
    })

};


export const getSportRoles = (sport_id:number) => {

    return Sport.getSportRoles(sport_id).then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data , data: []};
    })

};

