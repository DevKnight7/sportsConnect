import jsCookie from 'js-cookie';

export const isAuthenticUser = () => {
    let cookie = jsCookie.get('login')
    if(cookie === undefined) {
        return false;
    }
    // console.log(cookie)
    // cookie = JSON.parse(cookie);
    return true;
}