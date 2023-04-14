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
  try {
    const response = await axios({ method, url, ...options })
    return response
  } catch (error) {
    throw new Error('Error en la petición en axiosWithoutToken')
  }
}

export const axiosWithToken = async (
  method: string = 'GET',
  endpoint: string,
  data: any
): Promise<AxiosResponse> => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(OTP_KEY) as string)?.token ?? ''
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: { 'Content-Type': 'application/json', 'x-token': token }
    })
    return response
  } catch (error) {
    throw new Error('Error en la petición en axiosWithToken')
  }
}
