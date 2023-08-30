import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationOutlined
} from '@ant-design/icons'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Col, Popconfirm, Row, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
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
import('dayjs/locale/es')

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
      dataIndex: 'title',
      width: '50%'
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
              <>
                <ExclamationOutlined
                  rev={''}
                  style={{ color: '#ec0d0d', marginRight: 3, fontSize: 16 }}
                />
                <span>{translateEngToSpaPriority(record)}</span>
              </>
            ) : translateEngToSpaPriority(record) === SpaPriority.media ? (
              <>
                <ExclamationOutlined
                  rev={''}
                  style={{ color: '#f07f20', marginRight: 3, fontSize: 16 }}
                />
                <span>{translateEngToSpaPriority(record)}</span>
              </>
            ) : (
              <>
                <ExclamationOutlined
                  rev={''}
                  style={{ color: '#22C55E', marginRight: 3, fontSize: 16 }}
                />
                <span>{translateEngToSpaPriority(record)}</span>
              </>
            )}
          </>
        )
      }
    },
    {
      title: 'Estado',
      dataIndex: 'completed',
      render: (record) => {
        return (
          <>{record === true ? TaskStatus.completed : TaskStatus.pending}</>
        )
      }
    },
    {
      title: 'Fecha tope',
      dataIndex: 'deadline',
      sorter: (a, b) => dayjs(a.deadline).unix() - dayjs(b.deadline).unix(),
      render: (record) => {
        const formattedDate = dayjs(record).format('DD-MM-YYYY')
        return <>{formattedDate}</>
      }
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
                disabled={
                  record.completed !== undefined && record.completed === true
                }
                style={{
                  color: '#F18F01',
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
                removeTodo(record._id)
              }}
            >
              <DeleteOutlined
                rev={''}
                style={{ color: '#E63F32', marginLeft: 5, fontSize: 18 }}
              />
            </Popconfirm>
          </>
        )
      }
    }
  ]

  return (
    <Row justify='center' style={{ marginTop: '1.5rem' }}>
      <Col span={20}>
        <Table
          ref={animationParent}
          columns={columns}
          dataSource={filteredTodos}
          rowKey={(record) => record._id ?? ''}
          rowClassName={(record) =>
            record.completed ? 'completed-table-cell' : ''
          }
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
