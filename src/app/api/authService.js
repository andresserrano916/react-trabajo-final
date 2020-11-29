import baseApi from './baseApi';
import {LOGIN_ENDPOINT} from './../core/appConstants';
import {setToken, removeToken, getDecodedToken} from './../config/auth/credentials';

class AuthService{
    static login = async (credentials) => {
        try {
            const response = await baseApi.post(LOGIN_ENDPOINT, credentials);
            if(response){
                setToken(response.token);
            }
        } catch (error) {
            throw error;
        }
    }

    static getCurrentUser = () => getDecodedToken();

    static logout = () => removeToken();
}

export default AuthService;