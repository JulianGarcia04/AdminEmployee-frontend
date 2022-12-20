import Http from "../../library/Http";
import config from "../../config";

const update = async (data) =>{
    try {
        const request = await Http.put(`${config.BASE_URL}/employee/edit/${data.id}`, data.body);
        return request;
    } catch (error) {
        throw error
    }
}

export default update;