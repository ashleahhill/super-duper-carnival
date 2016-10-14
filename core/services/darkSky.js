
const norfolk = {
  lat: 36.8950068,
  lng: -76.3256277
};

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

export function getCurrent(latLng) {
  latLng = latLng || norfolk;

  fetch(`/api/weather/${latLng.lat},${latLng.lng}`)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => {

    console.log(data);
  })
  .catch(function(error) {
    console.log('request failed', error)
  })
}
