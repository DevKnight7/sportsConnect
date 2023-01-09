import axiosInstance from '../utils/axios';
import {signInForm , signUpForm , resetPasswordForm } from '../shared/customTypes';

class Auth {
   
    static signUp = (form: signUpForm) => {
    
        let apiPath = '/api/auth/signup';
        return axiosInstance.post(apiPath , {
            ...form
        });
    
    };
    

    static activateUserAccount = (code:string) => {
    
        let apiPath = '/api/auth/activate';
        return axiosInstance.post(apiPath , {
            code
        });
    
    };
    

    static forgotUserPassword = (email:String) => {
        
        let apiPath = 'api/auth/forgot';
        return axiosInstance.post(apiPath , {email});
    
    };
    
    static resetUserPassword = (form:resetPasswordForm) => {
        
        let apiPath = '/api/auth/reset';
        return axiosInstance.post(apiPath , {
            ...form
        });
    
    };


    
    // static changePassword = (form:any ) => {
        
    //     let apiPath = '/api/auth/change-password';
    //     return axiosInstance.put(apiPath , {
    //         ...form
    //     });
    
    // };

    static signIn = (form: signInForm) => {

        let apiPath = '/api/auth/login';
        
        return axiosInstance.post(apiPath , {
            ...form
        })

    };

    static logout = () => {

        let apiPath = '/api/auth/logout';
        return axiosInstance.post(apiPath)
        .then(response => {return response})

    };

    


    
}
export default Auth;