/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  addTodo,
  deleteTodo,
  getTodosByUser,
  updateTodo
} from '../controllers/todos'

const router: Router = Router()

router.get('/todos/:userId', getTodosByUser)
router.post('/add-todo/:userId', addTodo)
router.put('/edit-todo/:userId/:id', updateTodo)
router.delete('/delete-todo/:userId/:id', deleteTodo)

export default router
