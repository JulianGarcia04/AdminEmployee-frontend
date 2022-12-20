import Http from "../../library/Http";
import config from "../../config";

const deleteOne = async (id)=>{
    try {
        const request = await Http.put(`${config.BASE_URL}/employee/delete/${id}`);
        return request;
    } catch (error) {
        throw error.response
    }
}

export default deleteOne;