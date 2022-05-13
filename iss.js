const request = require("request");


const fetchMyIP = function (callback) {
  request("https://api.ipify.org/?format=json", function (error, response, body) {
    if (error) {
      return callback(error, null);

    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const value = JSON.parse(body).ip;
    if (!typeof value === "string") {
      callback(error, null);
      return;
    }
    return callback(null, value);
  });

};

const fetchCoordsByIp = function (ip, callback) {
  request(`https://api.ipbase.com/v2/info/?ip=${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const result = JSON.parse(body);
    callback(null, result);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const { latitude, longitude } = coords.data.location;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const receiving = JSON.parse(body);
    callback(null, receiving.response);
  });
}

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    }
    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyover) => {
        if (error) {
          callback(error, null);
        }
        callback(null, flyover);
      })
    });
  });
}

module.exports = { nextISSTimesForMyLocation };