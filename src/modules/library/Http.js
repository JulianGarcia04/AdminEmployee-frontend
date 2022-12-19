import axios from 'axios';

class Http {
    async get(uri, config={}){
        try {
            const request = await axios.get(uri, config);
            return request;
        } catch (error) {
            throw error
        }
    }

    async post(uri, body, config={}){
        try {
            const request = await axios.post(uri, body, config);
            return request;
        } catch (error) {
            throw error
        }
    }

    async put(uri, body, config={}){
        try {
            const request = await axios.put(uri, body, config);
            return request;
        } catch (error) {
            throw error;
        }
    }
}

export default new Http();