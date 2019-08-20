import BaseModule from './base-module';
import verified from './validator';
const baseUrl = ''


class Subject extends BaseModule {
    // 获取专题展示所有文件
    getShowFile() {
        return this.get(`${baseUrl}/showFile/findAll`)
            .then(res => {
                return verified(res);
            });
    }
    // pdf单个展示
    getdataFile(id){
        return this.get(`${baseUrl}/showFile/findById/${id}`)
            .then(res => {
                return verified(res);
            });
    }
    
}

export default new Subject();