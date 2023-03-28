import Container from '../Container';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <h1>Invoice Creator</h1>
      </Container>
      <svg viewBox="0 0 1440 320">
        <path
          fill="#e619a1"
          fillOpacity="1"
          d="M0,288L48,261.3C96,235,192,181,288,170.7C384,160,480,192,576,186.7C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </header>
  );
}
