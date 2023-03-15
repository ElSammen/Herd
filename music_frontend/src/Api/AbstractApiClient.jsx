import axios from "axios";

class AbstractApiClient {
    constructor() {
        this.baseURL = "";
    }

    async setBaseURL(url) {
        this.baseURL = url;
    }

    async getBaseURL() {
        return this.baseURL;
    }

    async responseStatusCheck(resObj) {
        if (resObj.status >= 200 && resObj.status < 300) {
            return Promise.resolve(resObj);
        } else {
            throw new Error(resObj.status);
        }
    }
    
    async fetchData(url, config = {}) {
        const response = await this.getRequest(url, config);
        return response.data;
    }

    async getRequest(url, config = {}) {
        try {
            const req = await axios.get(url, config);
            const res = await this.responseStatusCheck(req);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async postRequest(url, data, config = {}) {
        try {
            const req = await axios.post(url, data, config);
            const res = await this.responseStatusCheck(req);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async patchRequest(url, data, config = {}) {
        try {
            const req = await axios.patch(url, data, config);
            const res = await this.responseStatusCheck(req);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async deleteRequest(url, config = {}) {
        try {
            const req = await axios.delete(url, config);
            const res = await this.responseStatusCheck(req);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

export default AbstractApiClient;