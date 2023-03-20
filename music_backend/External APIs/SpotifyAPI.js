const AbstractAPIClient = require("./AbstractApiClient");

module.exports = class GoogleBooksAPIClient extends AbstractAPIClient {
    constructor() {
        super();
        this.baseURL = "https://api.spotify.com";
        this.apiKey = process.env.SPTFY_CLIENTID;
    }

    async spotifyFunctionReplaceme(artist) {
        try {
            const params =
            {
                q: artist,
                maxResults: 5,
                key: this.apiKey
            };
            const url = `${this.baseURL}?${new URLSearchParams(params)}`;
            const data = await this.fetchData(url);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch songs like ${cityName}. Error: ${error.message}`);
        }
    }
}