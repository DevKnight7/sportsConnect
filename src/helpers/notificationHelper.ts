import { toast, TypeOptions } from 'react-toastify';

const showNotification = (message:string, type:TypeOptions | undefined) => {
    toast(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type,
        progress: undefined,
    });
};

export const showAllNotifications = (notifications:string[], type:TypeOptions | undefined) => {
    notifications.forEach((notification) => showNotification(notification, type));
};


export default showNotification;


//Custom Parsing Functions



export const parseResponseErrors = (responseError:any) => {
    const { response: { data: { errors = {} } = {} } = {} } = responseError || {};

    if (errors?.length > 0) {
        return errors.map((error:any) => error.message);
    }

    return ['Something went wrong!'];
};

export const parseRTKErrors = (responseError:any) => {
    const { data: { errors = {} } = {} } = responseError || {};

    if (errors?.length > 0) {
        return errors.map((error:any) => error.message);
    }

    return ['Something went wrong!'];
};
