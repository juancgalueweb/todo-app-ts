/**
 * Filters component that displays filter options to show all, active or completed todos
 */

import { Button, Flex } from 'antd'
import { FILTERS_BUTTONS } from '../constants/const'
import { type FilterValue } from '../interfaces/todo.interface'
import { useFilterTodos } from '../stores/filterTodosStore'

const Filters: React.FC = () => {
  const { filterSelected, filterChange, setFilteredTodos } = useFilterTodos()

  /**
   * Renders the filter buttons based on the FILTERS_BUTTONS constant
   * @returns {JSX.Element[]} An array of JSX elements representing the filter buttons
   */
  const renderFilterButtons = (): JSX.Element[] => {
    return Object.entries(FILTERS_BUTTONS).map(([key, { literal }]) => {
      const isSelected = key === filterSelected

      return (
        <Button
          key={key}
          type={isSelected ? 'primary' : 'default'}
          onClick={() => {
            filterChange(key as FilterValue)
            setFilteredTodos()
          }}
        >
          {literal}
        </Button>
      )
    })
  }

  return (
    <Flex wrap='wrap' justify='flex-start' align='center' gap={8}>
      {renderFilterButtons()}
    </Flex>
  )
}

export default Filters
