import Http from "../../library/Http";
import config from "../../config";

const create = async(data, token)=>{
    try {
        const request = await Http.post(`${config.BASE_URL}/employee/create`, data);
        return request;
    } catch (error) {
        throw error
    }
}

export default create;