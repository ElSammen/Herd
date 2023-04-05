import AbstractApiClient from "./AbstractApiClient";
import Cookie from "js-cookie";
import axios from "axios";

class AuthApiCalls extends AbstractApiClient {
    constructor() {
        super();
        this.baseURL = "https://herd-backend.onrender.com";
    }

    async loginOrRegister(data, operation) {
        try {
            console.log("data ", data)
            console.log("operation ", operation)
            // const response = await axios.post("http://localhost:3001/auth/login"
            const response = await this.postRequest(
                `${this.baseURL}${operation}`,
                data
            );

            const token = response.data.token;
            Cookie.set("token", token, { expires: 1/24, secure: true, sameSite: "strict" });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthApiCalls;
