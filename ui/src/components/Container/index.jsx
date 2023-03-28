import styles from './container.module.scss';

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}
