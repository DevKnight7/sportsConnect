import axiosInstance from '../utils/axios';
import {createSportAttrs} from '../shared/customTypes';

class Sports {



    
    static getSportsList = () => {
        let apiPath = '/api/sports';
        return axiosInstance.get(apiPath)
    };

    static createUserSport = (sport_id: Number, role_id: Number) => {
        let apiPath = '/api/users/sports';
        return axiosInstance.post(apiPath, {
            sport_id, role_id
        })
    };

    static getUserSports = () => {
        let apiPath = '/api/users/sports';
        return axiosInstance.get(apiPath)
    };

    static updateUserSport = (is_available: boolean , sport_id:number) => {
        let apiPath = '/api/users/sports/' + sport_id;
        return axiosInstance.put(apiPath, {
            is_available
        })
    };


    static deleteUserSport = (sport_id:number) => {
        let apiPath = `/api/users/sports/${sport_id}`;
        return axiosInstance.delete(apiPath)
    };
    
    static getSportsAttribute = (sport_id:number) => {
        let apiPath = `/api/sports/${sport_id}/attributes`;
        return axiosInstance.get(apiPath)
    };
    
    static createSportStats = (form: createSportAttrs) => {
        let apiPath = '/api/sports/attrs/ratings';
        return axiosInstance.post(apiPath, {
            ...form
        })
    };

    static getSportRoles = (sport_id:number) => {
        let apiPath = `/api/sports/roles/${sport_id}`;
        return axiosInstance.get(apiPath)
    }
    
    // static updateUserProfile = (form: updateProfileForm) => {

    //     let apiPath =  '/api/user/profile';
    //     return axiosInstance.put(apiPath, {
    //         ...form
    //     })

    // };




}
export default Sports;