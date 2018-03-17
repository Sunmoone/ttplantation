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

export function listMsg(data, success){
  request(`msgs/${data.uid}`, 'GET', data, success)
}

export function listFriend(data, success) {
  request(`rank/${data.uid}`, 'GET', data, success)
}

export function inviteUser(data, success) {
  request(`user/${data.uid}/invite/${data.invite_uid}`, 'POST', data, success)
}

export function postAddress(data, success) {
  request(`address/${data.uid}`, 'POST', data, success)
}

export function getAddress(data, success) {
  request(`address/${data.uid}`, 'GET', data, success)
}

export function receiveEnergy(data, success) {
  request(`record/${data.rid}`, 'PUT', data, success)
}