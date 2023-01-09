import Auth from '../services/auth';
import {signInForm , signUpForm, resetPasswordForm } from '../shared/customTypes';
import { Dispatch } from 'redux'
import {signOutSuccess} from "../redux/slices/authSlice"


export const signUp = (form : signUpForm) => {

    return Auth.signUp(form).then((response:any) => {
        return { status: response.status, data: response.data, message: "Request Success" };
    }).catch((e:any) => {
        return { status: e.response.status, error: e.response.data.errors  };
    })

};

export const activateAccount = (code:string) => {

    return Auth.activateUserAccount(code).then((response:any) => {
        return { status: response.status, data: response.data, message: "Account Activated Successfully" };
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data };
    })

};



export const forgotUserPassword = (email:string) => {

    return Auth.forgotUserPassword(email).then((response:any) => {
        return { status: response.status, data: response.data, message: "Email Sent.Check your Email to Reset Password" };
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data.message };
    })

};

export const resetUserPassword = (form:resetPasswordForm) => {

    return Auth.resetUserPassword(form).then<any>( (response:any) => {
        return { status: response.status, data: response.data, message: response.data.message};
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data.error };
    })

};

// export const changePassword = (form:any) => {

//     return Auth.changePassword(form).then((response:any) => {
//         return { status: response.status, data: response.data, message: response.data.message };
//     }).catch((e:any) => {
//         return { status: e.response.status, message: e.response.data };
//     })

// };

export const signIn = (form:signInForm) => {

    return Auth.signIn(form).then((response:any) => {
        return { status: response.status, data: response, message: "success" };
    }).catch((e:any) => {
        return { status: e.response.status, message: e.response.data };
    })
    

};


export const logout = (dispatch:Dispatch , onLogoutSuccess:()=>void) => {

    Auth.logout().then((response:any) => {
        dispatch(signOutSuccess())
        onLogoutSuccess()
        return { status: response.status, data: response, message: "success" };
    }).catch((e:any) => {
        
        return { status: e.response.status, message: e.response.data };
    })

};