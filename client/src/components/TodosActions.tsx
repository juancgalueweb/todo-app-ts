import { Popconfirm, Space, Tooltip } from 'antd'
import {
  SDeleteFilledIcon,
  SEditTwoToneIcon,
  SLockFilledIcon,
  SUnlockFilledIcon
} from '../styled-components/CustomAntDesignComponents'
import type { TodosActionsProps } from '../interfaces/todo.interface'

function TodosActions({
  row,
  record,
  updateCompletedStatus,
  completeTodoMsg,
  showModal,
  getTags,
  removeTodo,
  deleteMsg
}: TodosActionsProps): JSX.Element {
  return (
    <Space size='small'>
      {row.completed ? (
        <Tooltip title='Cambiar a pendiente'>
          <SLockFilledIcon
            onClick={() => {
              const toggleStatus = !record.completed
              updateCompletedStatus({
                _id: record._id,
                completed: toggleStatus
              })
              completeTodoMsg(toggleStatus)
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title='Cambiar a completado'>
          <SUnlockFilledIcon
            onClick={() => {
              const toggleStatus = !record.completed
              updateCompletedStatus({
                _id: record._id,
                completed: toggleStatus
              })
              completeTodoMsg(toggleStatus)
            }}
          />
        </Tooltip>
      )}
      {record.completed !== undefined && !record.completed ? (
        <Tooltip title='Editar tarea'>
          <SEditTwoToneIcon
            rev={''}
            onClick={() => {
              showModal(record)
              getTags()
            }}
          />
        </Tooltip>
      ) : null}
      <Popconfirm
        title='¿Desea eliminar la tarea?'
        onConfirm={() => {
          removeTodo({ _id: record._id })
          deleteMsg()
        }}
      >
        <Tooltip title='Borrar tarea'>
          <SDeleteFilledIcon rev={''} />
        </Tooltip>
      </Popconfirm>
    </Space>
  )
}
export default TodosActions
