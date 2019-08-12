import BaseModule from './base-module';
import verified from './validator';

class Analysis extends BaseModule {
  getStationList (data) {
    return this.post('http://ngrok.91weather.com:15486/analy/image/all/station', data, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        return verified(res);
      });
  }
  getHistoryAvg (data) {
    return this.post('http://ngrok.91weather.com:15486/analy/image/county/avg', data, {
      timeout: 30000
    })
      .then(res => {
        return verified(res);
      });
  }
  getComprehensiveIndexData (start, end) {
    return this.get(`http://ngrok.91weather.com:15386/dz/loc/aqi/data/zh?begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getHistoryImage ({type, date}) {
    return this.get(`http://ngrok.91weather.com:15486/analy/image/param/avg/image/export?type=${type}&date=${date}`)
      .then(res => {
        return verified(res);
      });
  }
  getPointData (date) {
    return this.get(`http://ngrok.91weather.com:15386/dz/weather/data/all?type=rh,t&begin=${date}&end=${date}`)
      .then(res => {
        return verified(res);
      });
  }
  getImageData (type, start, end) {
    return this.get(`http://ngrok.91weather.com:15386/dz/weather/data/image?type=${type}&begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getPointDetailData (lon, lat) {
    return this.get(`http://ngrok.91weather.com:15386/dz/qxj/ec/level/time/all/one?lon=${lon}&lat=${lat}&vars=t,ws`)
      .then(res => {
        return verified(res);
      });
  }
  getDetailData (start, end, vars, codes) {
    let url = `http://ngrok.91weather.com:15386/dz/loc/aqi/all/data/his?vars=${vars}&begin=${start}&end=${end}`;
    if (codes) {
      url += `&codes=${codes}`;
    }
    return this.get(url)
      .then(res => {
        return verified(res);
      });
  }
  getDetailDataFile (type, codes, vars, start, end) {
    return this.get(`http://ngrok.91weather.com:15486/analy/image/aqi/word/import${type}?codes=${codes}&vars=${vars}&begin=${start}&end=${end}&stationName=1`)
      .then(res => {
        return verified(res);
      });
  }
  getStationDetail (lon, lat, start, end) {
    return this.get(`http://ngrok.91weather.com:15386/dz/qxj/ec/value?vars=ws,wd&level=1000&lon=${lon}&lat=${lat}&begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getStationPollutantData (code) {
    return this.get(`http://ngrok.91weather.com:15386/dz/loc/aqi/one/data/fact?code=${code}`)
      .then(res => {
        return verified(res);
      });
  }
  // 污染物浓度
  getConcentrationData (codes, vars, start, end) {
    return this.get(`http://ngrok.91weather.com:15486/analy/image/concentration?codes=${codes}&vars=${vars}&begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getConcentrationFile (codes, vars, start, end) {
    return this.get(`http://ngrok.91weather.com:15486/analy/image/concentration/export?codes=${codes}&vars=${vars}&begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getRankData (codes, vars, start, end) {
    return this.get(`http://ngrok.91weather.com:15486/analy/image/all/data/rank?codes=${codes}&vars=${vars}&begin=${start}&end=${end}`, {
      timeout: 30000
    })
      .then(res => {
        return verified(res);
      });
  }
  getRankFile (data) {
    return this.post('http://ngrok.91weather.com:15486/analy/report/wrw/export', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        return verified(res);
      });
  }
  getIndexData (codes, start, end) {
    return this.get(`http://ngrok.91weather.com:15386/dz/loc/aqi/data/zh?codes=${codes}&begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getPollutantData (lon, lat, type, start, end) {
    return this.get(`http://ngrok.91weather.com:15386/dz/data/network/all/one?lon=${lon}&lat=${lat}&type=${type}&start=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getRoseWindData (code, start, end) {
    return this.get(`http://ngrok.91weather.com:15386/analy/image/dz/wswd?stationcode=${code}&begin=${start}&end=${end}`, {
      timeout: 30000
    })
      .then(res => {
        return verified(res);
      });
  }
  getConcentrationByStation (code, vars) {
    return this.get(`http://ngrok.91weather.com:15386/dz/loc/aqi/one/data/his?code=${code}&vars=${vars}`, {
      timeout: 30000
    })
      .then(res => {
        return verified(res);
      });
  }
  getReport ({type, start, end, codes}) {
    return this.get(`http://ngrok.91weather.com:15486/analy/image/concentration/${type}?begin=${start || ''}&end=${end}&codes=${codes}`, {
      timeout: 30000
    })
      .then(res => {
        return verified(res);
      });
  }
  getReportFile ({type, start, end, codes}) {
    return this.get(`http://ngrok.91weather.com:15486/analy/image/concentration/${type}/export?begin=${start || ''}&end=${end}&codes=${codes}`)
      .then(res => {
        return verified(res);
      });
  }
  getHistoryData ({type, start, end}) {
    return this.get(`http://ngrok.91weather.com:15386/dz/other/dz/aqi?type=${type}&begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
  getHistoryWindData ({start, end}) {
    return this.get(`http://ngrok.91weather.com:15386/dz/weather/data/one?staId=54714&type=ws_10mi_avg,wd_10mi_avg,t&begin=${start}&end=${end}`)
      .then(res => {
        return verified(res);
      });
  }
}

export default new Analysis();
