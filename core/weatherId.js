export default class WeatherIdUtil {
  static makeId(lat, lng, time) {

    let idParts = [lat, lng, time].filter((val) => {
      return !(val===undefined || val === null || val === '');
    })
    return idParts.join('_');
  }

  static parseId(id) {
    let temp = id.split('_');
    let parsed = {
      latLng: {
        lat: temp[0],
        lng: temp[1]
      },
      time: temp[2]
    }

    return parsed;
  }
}
