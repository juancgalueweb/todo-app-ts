import axios, { type AxiosResponse } from 'axios'
import { type ApiDataTodosByUser } from '../interfaces/todo.interface'

const baseUrl = 'http://localhost:4000'

export const getTodos = async (): Promise<
  AxiosResponse<ApiDataTodosByUser> | undefined
> => {
  try {
    //! Recuerda cambiar el userId por uno válido mientras pruebas
    //! Cuando funcione, tengo que sacer ese userId del contexto o del localStorage
    const todos: AxiosResponse<ApiDataTodosByUser> = await axios.get(
      baseUrl + '/todos/642f75d194d22e23963e7e45'
    )
    return todos
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data)
    }
  }
}
