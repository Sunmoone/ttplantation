import { request } from './BaseService.js'

export function recordDetail(data, success) {
  request(`record/${data.rid}`, 'GET', data, success)
}