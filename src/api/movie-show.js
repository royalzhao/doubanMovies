import axios from 'axios';
import { commonParams } from './config';

const baseURL = 'http://api.douban.com'

export function getMovie(start, count) {
  const url = `${baseURL}/v2/movie/in_theaters`;
  const data = Object.assign({}, commonParams, {
    start,
    count
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

export function getComingMovie(start, count) {
  const url = `${baseURL}/v2/movie/coming_soon`;
  const data = Object.assign({}, commonParams, {
    start,
    count
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}
