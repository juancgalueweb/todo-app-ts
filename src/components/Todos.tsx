import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteFilled,
  EditTwoTone,
  ExclamationCircleOutlined,
  LockFilled,
  MinusCircleOutlined,
  SearchOutlined,
  UnlockFilled
} from '@ant-design/icons'
import type { InputRef } from 'antd'
import {
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  message
} from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import {
  translateEngToSpaPriority,
  translateSpaToEngPriority
} from '../helpers/translatePriorities'
import { uniqueArrayDate } from '../helpers/uniqueArrayData'
import {
  SpaPriority,
  TaskStatus,
  type ITodo,
  type TodoUpdateType
} from '../interfaces/todo.interface'
import { useFilterTodos } from '../stores/filterTodosStore'
import { useTodosStore } from '../stores/todosStore'
import TodoModal from './TodoModal'
import('dayjs/locale/es')
dayjs.locale('es')
dayjs.extend(relativeTime)

type DataIndex = keyof ITodo

const Todos: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const [form] = Form.useForm()
  const [modaldata, setModaldata] = useState<TodoUpdateType | null>(null)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const { loading, removeTodo, updateCompletedStatus, updateTodo } =
    useTodosStore()
  const { pageSize, setPageSize, filteredTodos, setFilteredTodos } =
    useFilterTodos()

  const deleteMsg = (): void => {
    void messageApi.open({
      type: 'loading',
      content: 'Borrando tarea',
      duration: 0
    })
  }

  const completeTodoMsg = (completed: boolean): void => {
    if (completed) {
      void messageApi.open({
        type: 'success',
        content: 'Tarea completada',
        duration: 0
      })
    } else {
      void messageApi.info({
        content: 'Tarea abierta nuevamente',
        duration: 0
      })
    }
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ): void => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void): void => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ITodo> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={(e) => {
          e.stopPropagation()
        }}
      >
        <Input
          ref={searchInput}
          placeholder='Buscar tarea'
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }}
          onPressEnter={() => {
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => {
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters)
            }}
            size='small'
            style={{ width: 90 }}
          >
            Limpiar
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filtrar
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      const dataIndexValue = record[dataIndex]
      if (dataIndexValue !== undefined) {
        return dataIndexValue
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase())
      }
      return false
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const handleSubmit = (): void => {
    form
      .validateFields()
      .then((values: TodoUpdateType) => {
        const dateToDb = dayjs(values?.deadline).toDate()
        const translatedPriority = translateSpaToEngPriority(values?.priority)
        setConfirmLoading(true)
        const dataToDB = {
          _id: modaldata?._id,
          title: values?.title,
          deadline: dateToDb,
          priority: translatedPriority
        }
        updateTodo(dataToDB)
        form.resetFields()
        setModaldata(null)
      })
      .catch((error) => {
        console.error('Error en el formulario:', error)
      })
  }

  const showModal = (record: any): void => {
    const translatedPriority = translateEngToSpaPriority(record?.priority)
    const formattedDeadline = dayjs(record?.deadline)
    setModaldata({
      _id: record?._id,
      title: record?.title,
      priority: translatedPriority,
      deadline: formattedDeadline
    })
    setOpen(true)
  }

  const handleCancel = (): void => {
    setOpen(false)
    form.resetFields()
    setModaldata(null)
  }

  useEffect(() => {
    if (modaldata) {
      form.setFieldsValue({
        title: modaldata.title,
        priority: modaldata.priority,
        deadline: modaldata.deadline
      })
    }
  }, [modaldata])

  useEffect(() => {
    setFilteredTodos()
    // Cuando loading cambia a false, establece confirmLoading en false.
    if (!loading) {
      setOpen(false)
      setConfirmLoading(false)
      messageApi.destroy()
    }
  }, [loading])

  const columns: ColumnsType<ITodo> = [
    {
      title: 'Descripción de la tarea',
      dataIndex: 'title',
      ...getColumnSearchProps('title')
    },
    {
      title: 'Prioridad',
      dataIndex: 'priority',
      filters: uniqueArrayDate(filteredTodos, 'priority').map((priority) => {
        return {
          text: translateEngToSpaPriority(priority as string),
          value: priority as string
        }
      }),
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
      render: (record, row) => {
        return (
          <>
            {row.completed ? (
              <Tooltip title='Cambiar a pendiente'>
                <LockFilled
                  style={{ color: '#4B5563', marginRight: 5, fontSize: 16 }}
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
                <UnlockFilled
                  style={{ color: '#4B5563', marginRight: 5, fontSize: 16 }}
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
            {record.completed !== undefined && record.completed === false ? (
              <Tooltip title='Editar tarea'>
                <EditTwoTone
                  rev={''}
                  style={{
                    color: '#0EA5E9',
                    marginLeft: 5,
                    marginRight: 5,
                    fontSize: 16
                  }}
                  onClick={() => {
                    showModal(record)
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
                <DeleteFilled
                  rev={''}
                  style={{ color: '#E63F32', marginLeft: 5, fontSize: 16 }}
                />
              </Tooltip>
            </Popconfirm>
          </>
        )
      },
      width: '10%'
    }
  ]

  return (
    <>
      {contextHolder}
      <Row justify='center' style={{ marginTop: '3.5rem' }}>
        <Col span={20}>
          <Table
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
      <TodoModal
        open={open}
        onCancel={handleCancel}
        onOk={form.submit}
        initialValues={{
          _id: modaldata?._id,
          title: modaldata?.title,
          priority: modaldata?.priority,
          deadline: dayjs(modaldata?.deadline)
        }}
        onFinish={handleSubmit}
        name='editTodo'
        modalTitle='Editar tarea'
        form={form}
        confirmLoading={confirmLoading}
      />
    </>
  )
}

export default Todos
