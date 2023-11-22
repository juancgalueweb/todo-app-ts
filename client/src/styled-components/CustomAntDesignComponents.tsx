import {
  DeleteFilled,
  EditTwoTone,
  LockFilled,
  SearchOutlined,
  UnlockFilled
} from '@ant-design/icons'
import { Button, Flex, Input, Modal, Row, Space } from 'antd'
import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

export const SFlexCreateTodo = styled(Flex)`
  justify-content: center;
  margin: 1rem 0;

  @media ${device.tablet} {
    justify-content: flex-start;
  }
`

export const SRowFooter = styled(Row)`
  margin: 1rem 0;
`

export const SRowTodo = styled(Row)`
  margin-top: 3.5rem;
`

export const SDeleteFilledIcon = styled(DeleteFilled)`
  color: #e63f32;
  font-size: 16px;
`

export const SEditTwoToneIcon = styled(EditTwoTone)`
  color: #0ea5e9;
  font-size: 16px;
`

export const SModalTag = styled(Modal)`
  body: {
    max-height: 60vh;
    overflow-y: auto;
  }
`

export const SSpaceFlex = styled(Space)`
  display: flex;
`

export const SButtonCreateTag = styled(Button)`
  margin-top: 10px;
`

export const SRowTodos = styled(Row)``

export const STableSearchDiv = styled.div`
  padding: 8px;
`

export const STableSearchInput = styled(Input)`
  display: block;
  margin-bottom: 8px;
`

export const STableSearchButton = styled(Button)`
  width: 85px;
`

export const STableClearButton = styled(Button)`
  width: 70px;
`

export const SLockFilledIcon = styled(LockFilled)`
  color: #4b5563;
  font-size: 16px;
`

export const SUnlockFilledIcon = styled(UnlockFilled)`
  color: #4b5563;
  font-size: 16px;
`

export const SFlexTodoActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  @media ${device.laptop} {
    width: 100%;
    justify-content: flex-start;
    gap: 1rem;
    align-items: center;
  }
`

export const STableSearchOutlinedIcon = styled(SearchOutlined)<{
  $filtered?: boolean
}>`
  color: ${(props) => (props.$filtered ? '#1677ff' : undefined)};
`
