import {request} from './BaseService.js'

export function createPlant(data, success){
  request(`user/${data.uid}/plant/${data.pid}`, 'POST', {}, success)
}