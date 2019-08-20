import BaseModule from './base-module';
import verified from './validator';
const baseUrl = ''
class Analysis extends BaseModule {
    // 添加用户
    addUser(data) {
            return this.post(`${baseUrl}/user/add`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 用户列表获取分页
    getUserList(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/user/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 删除用户
    deleteUser(id) {
        return this.delete(`${baseUrl}/user/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(res => {
                return verified(res);
            });
    }

    // 获取角色
    getAllRole() {
            return this.get(`${baseUrl}/role/findAll`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 获取地区
    getAllErea() {
            return this.get(`${baseUrl}/area/findAll`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        //修改用户
    updata(data) {
            return this.put(`${baseUrl}/user/update`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 查询用户单个信息
    getAlignData(id) {
        return this.get(`${baseUrl}/user/findById/${id}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(res => {
                return verified(res);
            });
    }

    // 用户表格导出
    exportExcel() {
            return this.get(`${baseUrl}/user/exportExcel`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 权限查询module
    findModule() {
            return this.get(`${baseUrl}/module/findAll`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 权限查询列表全部
    findAllPremiss(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/role/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 权限新增方法
    addPremiss(data) {
            return this.post(`${baseUrl}/role/add`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 权限删除方法
    deletePremiss(id) {
            return this.delete(`${baseUrl}/role/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 权限修改
    updatePremiss(data) {
            return this.put(`${baseUrl}/role/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 权限查看单个信息
    findDataPremiss(id) {
            return this.get(`${baseUrl}/role/findById/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 权限表格导出
    exportRoleExcel() {
            return this.get(`${baseUrl}/role/exportExcel`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 专题展示管理全部展示
    getShowFile(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/showFile/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        }
        // 专题管理置顶
    fileTop(data) {
            return this.put(`${baseUrl}/showFile/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 专题管理删除
    deleteFiles(id) {
            return this.delete(`${baseUrl}/showFile/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送对象管理列表获取
    getPushObjList(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/receiver/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送对象表格导出
    exportPushObjExcel() {
            return this.get(`${baseUrl}/message/exportExcel`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送对象管理新增数据
    addPushObj(data) {
            return this.post(`${baseUrl}/receiver/add`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送对象管理删除数据
    deletePushObj(id) {
            return this.delete(`${baseUrl}/receiver/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送对象查询单个信息
    findDataPushObj(id) {
            return this.get(`${baseUrl}/receiver/findById/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送对象修改
    updatePushObj(data) {
            return this.put(`${baseUrl}/receiver/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送模板列表获取
    getPushtempList(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/messageTemplate/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送模板新增数据
    addPushtemp(data) {
            return this.post(`${baseUrl}/messageTemplate/add`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送模板删除数据
    deletePushTemp(id) {
            return this.delete(`${baseUrl}/messageTemplate/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送模板修改
    updatePushTemp(data) {
            return this.put(`${baseUrl}/messageTemplate/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送模板查询单个信息
    findDataPushTemp(id) {
            return this.get(`${baseUrl}/messageTemplate/findById/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送模板表格导出
    exportPushTempExcel() {
            return this.get(`${baseUrl}/messageTemplate/exportExcel`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 推送历史列表获取
    getPushhisList(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/message/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 历史推送模板删除数据
    deletePushlist(id) {
            return this.delete(`${baseUrl}/message/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 历史模板表格导出
    exportPushlishExcel() {
            return this.get(`${baseUrl}/message/exportExcel`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 阈值管理列表查询
    getBorderList(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/border/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 阈值管理新增数据
    addBorderp(data) {
            return this.post(`${baseUrl}/border/add`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 阈值管理修改
    updateBorder(data) {
            return this.put(`${baseUrl}/border/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 阈值管理删除数据
    deleteBorder(id) {
            return this.delete(`${baseUrl}/border/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 阈值管理查询单个信息
    findDataBorder(id) {
            return this.get(`${baseUrl}/border/findById/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 指数管理列表查询
    getIndexList(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/farmNumber/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 指数管理新增数据
    addIndex(data) {
            return this.post(`${baseUrl}/farmNumber/add`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 指数管理删除数据
    deleteIndex(id) {
            return this.delete(`${baseUrl}/farmNumber/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 指数管理数据修改
    updateIndex(data) {
            return this.put(`${baseUrl}/farmNumber/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 指数管理查询单个信息
    findDataIndex(id) {
            return this.get(`${baseUrl}/farmNumber/findById/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 指数管理表格导出
    exportIndexExcel() {
            return this.get(`${baseUrl}/farmNumber/exportExcel`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 受灾情况列表查询
    getRiskList(str, pageSize, currentPage) {
            return this.get(`${baseUrl}/riskState/search?str=${str}&pageSize=${pageSize}&currentPage=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 受灾情况新增数据
    addRisk(data) {
            return this.post(`${baseUrl}/riskState/add`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 受灾情况删除数据
    deleteRisk(id) {
            return this.delete(`${baseUrl}/riskState/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 受灾情况查询单个信息
    findDataRisk(id) {
            return this.get(`${baseUrl}/riskState/findById/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 受灾情况修改
    updateRisk(data) {
            return this.put(`${baseUrl}/riskState/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    return verified(res);
                });
        }
        // 受灾情况表格导出
    exportRiskExcel() {
        return this.get(`${baseUrl}/riskState/exportExcel`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(res => {
                return verified(res);
            });
    }

}

export default new Analysis();