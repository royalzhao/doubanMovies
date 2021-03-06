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

export function getMovieDetail(id){
    const url = `/v2/movie/subject/${id}`;
    const data = Object.assign({}, commonParams);
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
export function getMovieReview(id){
    const url = `/v2/movie/review/${id}`;
    const data = Object.assign({}, commonParams);
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
export function getAllReviews(id, start, count){
    const url = `/v2/movie/subject/${id}/reviews`;
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
export function getAllComments(id, start, count){
    const url = `/v2/movie/subject/${id}/comments`;
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

// 搜索
export function movieSearch(query, start, count) { // top250
    const url = '/v2/movie/search';
    const data = Object.assign({}, commonParams, {
      q: query,
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
  

  export function tagSearch(tag, start, count) { // top250
    const url = '/v2/movie/search';
    const data = Object.assign({}, commonParams, {
      tag,
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

//   排行榜
  export function top250Rank(start, count) { // top250
    const url = '/v2/movie/top250';
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
  
  export function usBoxRank() { // 北美票房
    const url = '/v2/movie/us_box';
    const data = Object.assign({}, commonParams);
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
  
  export function weeklyRank() { // 口碑榜
    const url = '/v2/movie/weekly';
    const data = Object.assign({}, commonParams);
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
  
  export function newMoviesRank() { // 新片榜
    const url = '/v2/movie/new_movies';
    const data = Object.assign({}, commonParams);
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