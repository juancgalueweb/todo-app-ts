import {
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Col, Popconfirm, Row, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useContext, useState } from 'react'
import { FiltersContext } from '../contexts/FilterContext'
import { TodosContext } from '../contexts/TodoContext'
import { translateEngToSpaPriority } from '../helpers/translatePriorities'
import {
  EngPriority,
  SpaPriority,
  TaskStatus,
  type FiltersContextType,
  type ITodo,
  type TodoContextType
} from '../interfaces/todo.interface'
dayjs.locale('es')
dayjs.extend(relativeTime)

const Todos: React.FC = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [animationParent] = useAutoAnimate()
  const { removeTodo, updateCompletedStatus } = useContext(
    TodosContext
  ) as TodoContextType
  // Get the filtered todos from the FiltersContext
  const { filteredTodos } = useContext(FiltersContext) as FiltersContextType

  const columns: ColumnsType<ITodo> = [
    {
      title: 'Descripción de la tarea',
      dataIndex: 'title'
    },
    {
      title: 'Prioridad',
      dataIndex: 'priority',
      filters: [
        { text: SpaPriority.alta, value: EngPriority.high },
        { text: SpaPriority.media, value: EngPriority.medium },
        { text: SpaPriority.baja, value: EngPriority.low }
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.priority.indexOf(value.toString()) === 0,
      render: (record) => {
        return (
          <>
            {translateEngToSpaPriority(record) === SpaPriority.alta ? (
              <>{translateEngToSpaPriority(record)}</>
            ) : translateEngToSpaPriority(record) === SpaPriority.media ? (
              <>{translateEngToSpaPriority(record)}</>
            ) : (
              <>{translateEngToSpaPriority(record)}</>
            )}
          </>
        )
      },
      width: '5%'
    },
    {
      title: 'Estado',
      dataIndex: 'completed',
      render: (record) => {
        return (
          <>{record === true ? TaskStatus.completed : TaskStatus.pending}</>
        )
      },
      width: '5%'
    },
    {
      title: 'Fecha de creación',
      dataIndex: 'createdAt',
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (record) => {
        const formattedDate = dayjs(record).format('DD-MM-YYYY')
        return <>{formattedDate}</>
      },
      width: '10%'
    },

    {
      title: 'Fecha tope',
      dataIndex: 'deadline',
      sorter: (a, b) => dayjs(a.deadline).unix() - dayjs(b.deadline).unix(),
      render: (record, row) => {
        const deadline = dayjs(record)
        const now = dayjs(new Date())
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

        if (row.completed) {
          tagColor = '#D4D4D4'
          tagIcon = <MinusCircleOutlined rev={''} />
        }

        return (
          <Tag icon={tagIcon} color={tagColor}>
            {deadline.format('DD-MM-YYYY')}
          </Tag>
        )
      },
      width: '10%'
    },
    {
      title: 'Vencimiento',
      render: (_, row) => {
        return (
          <>
            {row.completed ? (
              <span>N/A</span>
            ) : (
              dayjs(new Date()).to(row.deadline)
            )}
          </>
        )
      },
      width: '8%'
    },
    {
      title: 'Acciones',
      render: (record) => {
        return (
          <>
            <CheckOutlined
              rev={''}
              style={{ color: '#22C55E', marginRight: 5, fontSize: 16 }}
              onClick={() => {
                const toggleStatus = !record.completed
                updateCompletedStatus({
                  _id: record._id,
                  completed: toggleStatus
                })
              }}
            />
            {record.completed !== undefined && record.completed === false ? (
              <EditOutlined
                rev={''}
                style={{
                  color: '#1D4ED8',
                  marginLeft: 5,
                  marginRight: 5,
                  fontSize: 18
                }}
                onClick={() => {
                  console.log(record._id)
                }}
              />
            ) : null}
            <Popconfirm
              title='¿Desea eliminar la tarea?'
              onConfirm={() => {
                removeTodo({ _id: record._id })
              }}
            >
              <DeleteOutlined
                rev={''}
                style={{ color: '#E63F32', marginLeft: 5, fontSize: 18 }}
              />
            </Popconfirm>
          </>
        )
      },
      width: '8%'
    }
  ]

  return (
    <Row justify='center' style={{ marginTop: '3.5rem' }}>
      <Col span={20}>
        <Table
          ref={animationParent}
          columns={columns}
          dataSource={filteredTodos}
          rowKey={(record) => record._id ?? ''}
          rowClassName={(record) => {
            if (record.completed) {
              return 'completed-table-cell'
            }
            return ''
          }}
          pagination={{
            showSizeChanger: true,
            current: page,
            pageSize,
            onChange: (page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            }
          }}
        />
      </Col>
    </Row>
  )
}

export default Todos
