import BaseModule from './base-module';
import verified from './validator';
import { baseUrl } from './config';

class Gis extends BaseModule {
  getAllStations (time) {
    return this.get(`${baseUrl}/map/allStations?datestr=${time}`)
      .then(res => {
        return verified(res);
      });
  }
  getSigleStationRealtime (id, start, end) {
    return this.get(`${baseUrl}/map/thisStation?startDate=${start}&endDate=${end}&staId=${id}`)
      .then(res => {
        return verified(res);
      });
  }
}

export default new Gis();
