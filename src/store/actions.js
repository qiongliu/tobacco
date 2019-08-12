// import * as req from 'request'
// import * as types from './mutations-types'
// const variable = require('../common/css/variable')

// const airportColor = {
//     "0": variable['color-main'],
//     "1": variable['color-warning'],
//     "2": variable['color-subWarning']
// }

// export const getWindFluid = ({
//     commit
// }, obj) => {
//     req.getFluid().then(res => {
//         commit(types.SET_WIND_FLUID, res.detail)
//     })
// }

// export const getMessage = ({
//     commit
// }, {
//     code,
//     cb = () => {}
// }) => {
//     req.getMessage(code).then(data => {
//         if (data.length) {
//             // data.sort((item) => {
//             //     return item.isWarning ? -1 : 1
//             // })
//             let tempArr = data.map(item => {
//                 return {
//                     message: item.content
//                 }
//             })
//             commit(types.SET_MESSAGE, tempArr)
//             cb()
//         }
//     })
// }

// export function getAirport({
//     commit
// }) {
//     req.getAirport().then(data => {
//         if (data.length) {
//             data.sort((a, b) => {
//                 // console.log(a.code[i], b.code[i])
//                 return a.code[1] > b.code[1] ? 1 : -1
//             })
//             // let tempArr = []
//             data.forEach(item => {
//                 item['bgColor'] = airportColor[item.warning]
//             })
//             // tempArr = data.map(item => {
//             //     return {
//             //         lon: item.lon,
//             //         lat: item.lat,
//             //         cityName: item.cityName,
//             //         code: item.code,
//             //         alarm: item.alarm,
//             //         bgColor: variable['color-main']
//             //     }
//             // })
//             commit(types.SET_AIRPORT, data)
//         }
//     })
// }