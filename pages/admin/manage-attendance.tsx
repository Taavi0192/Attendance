import { useState, useEffect } from 'react';
import axios from 'axios';

interface AttendanceRecord {
  _id: string;
  email: string;
  date: string;
  status: string;
}

const ManageAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('/api/attendance/view-all');
      setAttendanceRecords(response.data);
    } catch (error) {
      alert('An error occurred while fetching attendance records');
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const handleAddAttendance = async () => {
    try {
      await axios.post('/api/admin/mark-attendance', { email, date, status });
      fetchAttendanceRecords(); // Refresh the records
    } catch (error) {
      alert('An error occurred while adding attendance');
    }
  };

  const handleRemoveAttendance = async (id: string) => {
    try {
      await axios.delete(`/api/attendance/${id}`);
      fetchAttendanceRecords(); // Refresh the records
    } catch (error) {
      alert('An error occurred while removing attendance');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Manage Attendance</h1>
      <form style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={handleAddAttendance} style={styles.button}>Add Attendance</button>
      </form>
      <ul style={styles.list}>
        {attendanceRecords.map((record) => (
          <li key={record._id}>
            {record.date}: {record.email} - {record.status}
            <button onClick={() => handleRemoveAttendance(record._id)} style={styles.button}>Remove</button>
          </li>
        ))}
      </ul>
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
    marginBottom: '20px',
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
  list: {
    listStyle: 'none',
    padding: 0,
  },
};

export default ManageAttendance;
