import { FadeLoader } from 'react-spinners'
import styles from '../styles/Loader.module.css'

export const Loader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <FadeLoader color='#c5cae9' height={20} />
    </div>
  )
}
