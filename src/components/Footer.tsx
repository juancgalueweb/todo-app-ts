/**
 * The Footer component displays the number of active tasks, a list of filters,
 * and a button to remove all completed tasks.
 */

import { DeleteOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Popconfirm, Row } from 'antd'
import { useContext } from 'react'
import { FiltersContext } from '../contexts/FilterContext'
import { TodosContext } from '../contexts/TodoContext'
import {
  type FiltersContextType,
  type TodoContextType
} from '../interfaces/todo.interface'
import Filters from './Filters'

const Footer: React.FC = () => {
  const { removeAllCompleted } = useContext(TodosContext) as TodoContextType
  const { activeCount = 0, completedCount = 0 } = useContext(
    FiltersContext
  ) as FiltersContextType

  return (
    <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Col span={20} offset={2}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {activeCount > 0 && (
            <p>
              Tareas pendientes <Badge count={activeCount} />
            </p>
          )}
          <Filters />
          {completedCount > 0 && (
            <Popconfirm
              title='¿Seguro que quiere eliminar todas las tareas completadas?'
              onConfirm={() => {
                removeAllCompleted()
              }}
            >
              <Button
                icon={
                  <DeleteOutlined
                    rev={''}
                    style={{ marginRight: 2, fontSize: 14 }}
                  />
                }
                type='default'
                color='error'
              >
                Borrar tareas completadas
              </Button>
            </Popconfirm>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Footer
