import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface AttendanceRecord {
  email: string;
  date: string;
  status: string;
}

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchAttendanceRecords = useCallback(async () => {
    try {
      const response = await axios.get(`/api/attendance/view-all?startDate=${startDate}&endDate=${endDate}`);
      setAttendanceRecords(response.data);
    } catch (error) {
      alert('An error occurred while fetching attendance records');
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, [fetchAttendanceRecords]);

  return (
    <div style={styles.container}>
      <h1>View Attendance Records</h1>
      <form style={styles.form}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={fetchAttendanceRecords} style={styles.button}>Filter</button>
      </form>
      <ul style={styles.list}>
        {attendanceRecords.map((record, index) => (
          <li key={index}>
            {record.date}: {record.email} - {record.status}
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

export default ViewAttendance;
