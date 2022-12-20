import Http from "../../library/Http";
import config from "../../config";

const getCurrent = async (token)=>{
    try {
       const request = await Http.get(`${config.BASE_URL}/employee/current`);
       return request.data 
    } catch (error) {
        throw error.response
    }
}

export default getCurrent;