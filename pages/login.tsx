import { FC, CSSProperties } from 'react';

const Login: FC = () => {
  return (
    <div style={styles.container}>
      <h1>Login Page</h1>
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

export default Login;
