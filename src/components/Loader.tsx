import { type FC } from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loader: FC = () => {
  return (
    <ThreeDots
      height='40'
      width='40'
      radius='9'
      color='#405cf5'
      ariaLabel='three-dots-loading'
      visible={true}
    />
  )
}

export default Loader
