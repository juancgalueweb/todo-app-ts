import axios, { type AxiosResponse } from 'axios'
import { type AxiosWithoutTokenOptions } from '../interfaces/user.interface'

const baseUrl = import.meta.env.VITE_BASE_URL as string
const OTP_KEY = 'todos-info-to-verify-email'

export const axiosWithoutToken = async (
  method: string = 'GET',
  endpoint: string,
  options: AxiosWithoutTokenOptions = {}
): Promise<AxiosResponse> => {
  const url = `${baseUrl}/${endpoint}`
  const response = await axios({ method, url, ...options })
  return response
}

export const axiosWithToken = async (
  method: string = 'GET',
  endpoint: string,
  data: any
): Promise<AxiosResponse> => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(OTP_KEY) as string)?.token ?? ''
  const response = await axios({
    method,
    url,
    data,
    headers: { 'Content-Type': 'application/json', 'x-token': token }
  })
  return response
}
