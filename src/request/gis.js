import BaseModule from './base-module';
import verified from './validator';
import { baseUrl } from './config';
import { jxBorder } from 'config';

const border = `&maxLon=${jxBorder.maxLon}&minLon=${jxBorder.minLon}&maxLat=${jxBorder.maxLat}&minLat=${jxBorder.minLat}`;

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
  getSigleStationForecast (id, feature, start, end) {
    return this.get(`${baseUrl}/map/getStationMicaps2?element=${feature}&startDate=${start}&endDate=${end}&staId=${id}`)
      .then(res => {
        return verified(res);
      });
  }
  getWarning () {
    return this.get(`${baseUrl}/map/warning`)
      .then(res => {
        return verified(res);
      });
  }
  getRadar(start, end) {
    return this.get(`http://api.mlogcn.com/wcloudservice/v1/wcloud/radar/forecast/dbz/joint?token=69b798409f7443f99038e944e288e910${border}&start=${start}&end=${end}`)
    .then(res => {
      return res.data
    });
  }
  getCloud(type, start, end) {
    return this.get(`http://api.mlogcn.com/stltservice/v2/himawari8/layer/${type}/integral/tailor/bbox?token=69b798409f7443f99038e944e288e910${border}&start=${start}&end=${end}`)
    .then(res => {
      return res.data
    });
  }
  getShort(type, start, end) {
    return this.get(`http://api.mlogcn.com/stltservice/v2/himawari8/layer/${type}/integral/tailor/bbox?token=69b798409f7443f99038e944e288e910${border}&start=${start}&end=${end}`)
    .then(res => {
      return res.data
    });
  }
}

export default new Gis();
