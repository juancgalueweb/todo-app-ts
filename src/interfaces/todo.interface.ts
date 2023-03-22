export interface ITodo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<ITodo, 'id'>
export type TodoIdAndCompleted = Pick<ITodo, 'id' | 'completed'>
