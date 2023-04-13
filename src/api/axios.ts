import axios, { type AxiosResponse } from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL as string

export const axiosWithoutToken = async (
  endpoint: string,
  data: any,
  method: string = 'GET'
): Promise<AxiosResponse> => {
  const url = `${baseUrl}/${endpoint}`
  const response = await axios({ method, url, data })
  return response
}
