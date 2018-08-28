import { ajax } from '@/utils/index'
import { commonParams } from './config';

export function getMovie(start, count){
    const url = '/v2/movie/in_theaters';
    const data = Object.assign({}, commonParams, {
        start,
        count
    });
    return new Promise((resolve,reject)=>{
        ajax.get(url,data)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
export function getComingMovie(start, count){
    const url = '/v2/movie/coming_soon';
    const data = Object.assign({}, commonParams, {
        start,
        count
    });
    return new Promise((resolve,reject)=>{
        ajax.get(url,data)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}