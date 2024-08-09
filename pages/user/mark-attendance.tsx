import { useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const MarkAttendance = () => {
  const { email } = useAuth(); // Assuming email is stored in state or received from context
  const router = useRouter();

  const handleMarkAttendance = async () => {
    try {
      const response = await axios.post('/api/user/mark-attendance', { email });
      alert(response.data.message);
      router.push('/user/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        alert(axiosError.response?.data.message);
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Mark Attendance</h1>
      <button onClick={handleMarkAttendance} style={styles.button}>Mark Attendance</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default MarkAttendance;
