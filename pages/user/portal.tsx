import Link from 'next/link';
import { FC, CSSProperties } from 'react';

const userportal: FC = () => {
  return (
    <div style={styles.container}>
      <h1>User Portal</h1>
      <div style={styles.buttonContainer}>
        <Link href="/user/register">
          <button style={styles.button}>Register</button>
        </Link>
        <Link href="/user/login">
          <button style={styles.button}>Login</button>
        </Link>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    display: 'flex',
    backgroundColor: 'violet',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    color: 'black',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default userportal;
