const ApiUtils = {
    BIRDS_JSON_API_URL: '/api/birds.json',

    checkStatus: function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    },

    fetchBirds: function () {
        return fetch(this.BIRDS_JSON_API_URL)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
    }
};

export { ApiUtils as default };