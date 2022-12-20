import Http from "../../library/Http";
import config from "../../config";

const getOne = async (id)=>{
    try {
        const request = await Http.get(`${config.BASE_URL}/employee/${id}`);
        return request.data;
    } catch (error) {
        throw error;
    }
}

export default getOne;