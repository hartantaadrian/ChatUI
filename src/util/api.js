import axios from "axios";

let instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://localhost:6002"
      : "http://localhost:5000",
});

// request header
instance.interceptors.request.use(
  (config) => {
    let url = config.url;

    let auth = localStorage.getItem("token");
    if (!url.includes("auth")) {
      if (auth === null) {
        return config;
      }
      config.headers = { Authorization: "Bearer " + auth };
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
