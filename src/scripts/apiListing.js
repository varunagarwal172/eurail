export function getAPI(url, params = {}) {
    let api = new URL(url),
        queryParams = Object.keys(params);

    if (queryParams.length) {
        queryParams.forEach(key => api.searchParams.append(key, params[key]));
    }

    return fetch(api)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                console.log("Error in getting the contact list");
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("Error in getting the contact list ", error);
        });
}
