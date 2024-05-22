import axios from "axios";

const BASE_URL = "https://api.coincap.io/v2";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    switch (status) {
      case 400:
        console.log(error.response);
        break;
      case 401:
        console.log("Unauthorized");
        break;
      case 404:
        console.log(error.response?.status);
        break;
      case 500:
        console.log("server error");
        break;
      default:
        console.log("an unknown error occurred");
        break;
    }
    return Promise.reject(error);
  }
);

class Axios {
  static get = (path) => {
    return instance.get(`${BASE_URL}${path}`);
  };
}

export default Axios;
