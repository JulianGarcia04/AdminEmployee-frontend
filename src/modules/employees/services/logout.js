import Http from "../../library/Http";
import config from "../../config";

const logout = async()=>{
    try {
        const request = await Http.post(`${config.BASE_URL}/employee/logout`);
        return request.data
    } catch (error) {
        throw error.response
    }
}

export default logout