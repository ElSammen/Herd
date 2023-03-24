import AbstractApiClient from "./AbstractApiClient";
import axios from "axios";
import { getToken } from "../pages/_utils";
import jwt_decode from "jwt-decode";

class ProfileApiCalls extends AbstractApiClient {
    constructor() {
        super();
        this.baseURL = "http://localhost:3001/users";
    }

    async getProfile() {
        const token = getToken();
    
        if (!token) {
            throw new Error("No token found");
        }
        
        const decodedID = jwt_decode(token).userId;
    
        try {
            const response = await axios.get(`${this.baseURL}/${decodedID}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
  

export default ProfileApiCalls;