import {request} from './BaseService.js'

export function createPlant(data, success){
  request('record/create', data, success)
}