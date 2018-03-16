import {request} from './BaseService.js'

export function createPlant(data, success){
  request(`user/${data.uid}/plant/${data.pid}`, 'POST', {}, success)
}

export function getOrSave(data, success){
  request(`user/${data.user_id}`, 'POST', data, success)
}

export function createdPlantList(data, success){
  request(`records/${data.uid}`, 'GET', data, success)
}