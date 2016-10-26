
const norfolk = {
  lat: 36.8950068,
  lng: -76.3256277
};

const apiPath = '/api/weather/';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function handleError(error) {
  console.log('request failed', error);
  throw error;
}

function makeCall(url) {
  return fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
}

export function getCurrent(latLng = norfolk) {
  return makeCall(`${apiPath}${latLng.lat},${latLng.lng}?exclude=minutely,flags`);
}

export function getFuture(time, latLng = norfolk) {
  return makeCall(`${apiPath}${latLng.lat},${latLng.lng},${time}?exclude=minutely,flags`);
}
