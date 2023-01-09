import User from '../services/users';
import {updateProfileForm } from '../shared/customTypes';




export const getUserProfile = () => {

    return User.getUserProfile().then((response:any) => {
        return { status : response.status, data: response.data, message: "Success"};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data};
    })

};

export const updateUserProfile = (form: updateProfileForm) => {
   return User.updateUserProfile(form).then((response:any) => {
     return { status: response.status, data: response, message: "Success" };     
   }).catch((e:any) => {
      return { status: e.response.status, error: e.response.data , message: e.response.message || "Error" };
   });
}

export const updateUserProfilePicture = (s3ob:any) => {
    return User.updateUserProfilePicture(s3ob).then((response:any) => {
      return { status: response.status, data: response, message: "Success" };     
    }).catch((e:any) => {
       return { status: e.response.status, message: e.response.data};
    });
 }


 export const searchUserByName = (us_name:string) => {
  return User.searchUserByName(us_name).then((response:any) => {
    return { status: response.status, data: response.data, message: "Success" };     
  }).catch((e:any) => {
     return { status: e.response.status, data: e.response.data,message: e.response.data};
  });
}


export const getUserDashboard = () => {

   return User.getUserDashboard().then((response:any) => {
       return { status : response.status, data: response.data, message: "Success"};
   }).catch((e:any) => {
       return { status: e.response.status, message: e.response.data , data:{}};
   })

};

