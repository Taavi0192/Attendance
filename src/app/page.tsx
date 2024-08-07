import Link from 'next/link';
import { FC, CSSProperties } from 'react';

const Home: FC = () => {
  return (
    <div style={styles.container}>
      <h1>Attendance Management System</h1>
      <div style={styles.buttonContainer}>
        <Link href="/admin/portal">
          <button style={styles.button}>Admin Portal</button>
        </Link>
        <Link href="/user/portal">
          <button style={styles.button}>User Portal</button>
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

export default Home;
