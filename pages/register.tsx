import { FC, CSSProperties } from 'react';

const Register: FC = () => {
  return (
    <div style={styles.container}>
      <h1>Register Page</h1>
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
};

export default Register;
