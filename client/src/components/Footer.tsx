/**
 * The Footer component displays the number of active tasks, a list of filters,
 * and a button to remove all completed tasks.
 */
import { Badge, Button, Col, Flex, Popconfirm } from 'antd'
import useFooterInfo from '../hooks/useFooterInfo'
import {
  SDeleteFilledIcon,
  SRowFooter
} from '../styled-components/CustomAntDesignComponents'
import Filters from './Filters'

const Footer: React.FC = () => {
  const {
    activeCount,
    completedCount,
    open,
    setConfirmLoading,
    removeAllCompleted,
    handleCancel,
    confirmLoading,
    showPopconfirm
  } = useFooterInfo()

  return (
    <SRowFooter>
      <Col span={20} offset={2}>
        <Flex justify='space-between' align='center'>
          {activeCount > 0 && (
            <>
              <p>
                Tareas pendientes <Badge count={activeCount} />
              </p>
              <Filters />
            </>
          )}

          {completedCount > 0 && (
            <Popconfirm
              open={open}
              title='¿Seguro que quiere eliminar todas las tareas completadas?'
              onConfirm={() => {
                setConfirmLoading(true)
                removeAllCompleted()
              }}
              onCancel={handleCancel}
              okButtonProps={{ loading: confirmLoading }}
            >
              <Button
                icon={<SDeleteFilledIcon rev={''} />}
                type='default'
                color='error'
                onClick={showPopconfirm}
              >
                Borrar tareas completadas
              </Button>
            </Popconfirm>
          )}
        </Flex>
      </Col>
    </SRowFooter>
  )
}

export default Footer
