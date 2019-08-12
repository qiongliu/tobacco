import BaseModule from './base-module';
import verified from './validator';
import { baseUrl } from './config';
class Gis extends BaseModule {
  getAllThreshold () {
    return this.get(`${baseUrl}/border/findAll`)
      .then(res => {
        console.log(res)
        return verified(res);
      });
  }
}

export default new Gis();
