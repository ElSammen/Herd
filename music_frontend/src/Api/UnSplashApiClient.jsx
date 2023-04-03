import AbstractApiClient from "./AbstractApiClient";
import axios from "axios";
import { getToken } from "../pages/_utils";
import jwt_decode from "jwt-decode";

class UnSplashApiClient extends AbstractApiClient {
    constructor() {
        super();
        this.baseURL = "http://localhost:3001/images";
    }

    async getImages(genre) {
        
    
        try {
            const response = await axios.get(`${this.baseURL}/${genre}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}
  

export default UnSplashApiClient;