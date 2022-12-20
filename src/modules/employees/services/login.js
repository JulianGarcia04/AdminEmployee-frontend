import Http from "../../library/Http";
import config from "../../config";

const login = async (data)=>{
    try {
        const request = await Http.post(`${config.BASE_URL}/employee/login`, data);
        return request;
    } catch (error) {
        throw error;
    }
}

export default login;