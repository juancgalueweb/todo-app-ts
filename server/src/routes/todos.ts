/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  addTodo,
  deleteTodo,
  getTodosByUser,
  updateTodo
} from '../controllers/todos'

const router: Router = Router()

router.get('/todos', getTodosByUser)
router.post('/add-todo', addTodo)
router.put('/edit-todo/:id', updateTodo)
router.delete('/delete-todo/:id', deleteTodo)

export default router
