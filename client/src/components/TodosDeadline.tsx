import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import { Tag } from 'antd'
import dayjs from 'dayjs'
import type { TodosDeadlineProps } from '../interfaces/todo.interface'

const TodosDeadline = ({
  record,
  completed
}: TodosDeadlineProps): JSX.Element => {
  const now = dayjs(new Date())
  const deadline = dayjs(record)
  const daysDifference = deadline.diff(now, 'd', true)
  let tagColor = ''
  let tagIcon = null
  if (daysDifference < 2) {
    tagColor = 'error'
    tagIcon = <ClockCircleOutlined rev={''} />
  } else if (daysDifference < 5) {
    tagColor = 'warning'
    tagIcon = <ExclamationCircleOutlined rev={''} />
  } else {
    tagColor = 'success'
    tagIcon = <CheckCircleOutlined rev={''} />
  }

  if (completed) {
    tagColor = '#D4D4D4'
    tagIcon = <MinusCircleOutlined rev={''} />
  }
  return (
    <Tag icon={tagIcon} color={tagColor}>
      {deadline.format('DD-MM-YYYY')}
    </Tag>
  )
}

export default TodosDeadline
