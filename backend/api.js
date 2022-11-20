const BASE_URL = "http://localhost:8000";
//const BASE_URL = null;
const API_KEY = "NMO3VDi4.O6VrAcSBZl8BztJ3TTzeFhhQEx72NYQR";

const axios = require("axios");

async function _getDefaultAxios(headers) {
  const temp = headers ?? {};

  const header = {
    ...temp,

    //"Dustrin-Api-Key": API_KEY,
    "Content-Type": "application/json",
    "Accept-Language": "hu",
  };

  return axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: header,
  });
}

const API = {
  test() {
    return new Promise(async (resolve, reject) => {
      const asd = await _getDefaultAxios();
      asd
        .get("test/")
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  get_free_slot_count() {
    return new Promise(async (resolve, reject) => {
      const asd = await _getDefaultAxios();
      asd
        .get("free/")
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  register(data) {
    return new Promise(async (resolve, reject) => {
      const asd = await _getDefaultAxios();
      asd
        .post("register/", data)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  login(data) {
    return new Promise(async (resolve, reject) => {
      const asd = await _getDefaultAxios();
      asd
        .post("login/", data)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default API;
