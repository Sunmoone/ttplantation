import {request} from './BaseService.js'

export function listPlant(data, success){
  request('plants', 'GET', data, success)
}

export function plantDetail(data, success){
  request(`plant/${data.pid}`, 'GET', {}, success)
}