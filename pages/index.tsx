import Link from 'next/link';
import { FC, CSSProperties } from 'react';

const Home: FC = () => {
  return (
    <div style={styles.container}>
      <h1>Attendance Management System</h1>
      <div style={styles.buttonContainer}>
        <Link href="/register">
          <button style={styles.button}>Register</button>
        </Link>
        <Link href="/login">
          <button style={styles.button}>Login</button>
        </Link>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Home;
