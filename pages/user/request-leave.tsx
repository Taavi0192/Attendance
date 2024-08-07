import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const RequestLeave = () => {
  const { email } = useAuth(); // Assuming email is stored in state or received from context
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/leave/request', { email, date, reason });
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
      <h1>Request Leave</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '200px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default RequestLeave;
