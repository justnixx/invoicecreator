import Container from '../Container';

import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p>&copy; {new Date().getFullYear()}</p>
        <a
          target="_blank"
          title="justnixx/invoicecreator"
          href={import.meta.env.VITE_GITHUB_REPO}
        >
          <small>View Source Code</small>
        </a>
      </Container>
      <svg viewBox="0 0 1440 320">
        <path
          fill="#e619a1"
          fillOpacity="1"
          d="M0,288L48,261.3C96,235,192,181,288,170.7C384,160,480,192,576,186.7C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </footer>
  );
}
