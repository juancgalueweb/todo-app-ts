import axios, { type AxiosResponse } from 'axios'
import { APP_KEY, OTP_KEY } from '../constants/const'
import {
  type AxiosWithTokenValidateEmailOptions,
  type AxiosWithoutTokenOptions,
  type axiosWithTokenAndDataOptions
} from '../interfaces/axios.interface'
import { type ApiDataTodosByUser } from '../interfaces/todo.interface'

const baseUrl = import.meta.env.VITE_BASE_URL as string

export const axiosWithoutToken = async (
  method: string,
  endpoint: string,
  options: AxiosWithoutTokenOptions = {}
): Promise<AxiosResponse> => {
  const url = `${baseUrl}/${endpoint}`
  const response = await axios({ method, url, ...options })
  return response
}

export const axiosWithTokenValidateEmail = async (
  method: string,
  endpoint: string,
  options: AxiosWithTokenValidateEmailOptions = {}
): Promise<AxiosResponse> => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(OTP_KEY) as string)?.token ?? ''
  const response = await axios({
    method,
    url,
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-token': token }
  })
  return response
}

export const axiosWithToken = async (
  method: string,
  endpoint: string
): Promise<AxiosResponse<ApiDataTodosByUser>> => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(APP_KEY) as string)?.token ?? ''
  const response = await axios({
    method,
    url,
    headers: { 'Content-Type': 'application/json', 'x-token': token }
  })
  return response
}

export const axiosWithTokenAndData = async (
  method: string,
  endpoint: string,
  options: axiosWithTokenAndDataOptions = {}
): Promise<AxiosResponse<ApiDataTodosByUser>> => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(APP_KEY) as string)?.token ?? ''
  const response = await axios({
    method,
    url,
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-token': token }
  })
  return response
}

export const axiosWithTokenDeleteCompleted = async (
  method: string,
  endpoint: string,
  data: string[]
): Promise<AxiosResponse<ApiDataTodosByUser>> => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(APP_KEY) as string)?.token ?? ''
  const response = await axios({
    method,
    url,
    data,
    headers: { 'Content-Type': 'application/json', 'x-token': token }
  })
  return response
}
