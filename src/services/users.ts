import axiosInstance from '../utils/axios';
import { updateProfileForm } from '../shared/customTypes';

class User {
   
    

    static getUserProfile = () => {
        let apiPath = '/api/users/profile';
        return axiosInstance.get(apiPath)
    };

    static updateUserProfile = (form: updateProfileForm) => {

        let apiPath =  '/api/users/profile';
        return axiosInstance.put(apiPath, {
            ...form
        })

    };

    static updateUserProfilePicture = (s3ob: any) => {

        let apiPath =  '/api/users/profile_pic';
        return axiosInstance.post(apiPath, {
            ...s3ob
        })

    };

    static searchUserByName = (us_name:string) => {
        let apiPath = `/api/users/${us_name}`;
        return axiosInstance.get(apiPath)
    };

    static getUserDashboard = () => {
        let apiPath = '/api/users/dashboard';
        return axiosInstance.get(apiPath)
    };




    
}


export default User;