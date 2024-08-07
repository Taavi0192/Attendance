import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface AttendanceRecord {
  email: string;
  date: string;
  status: string;
}

const ViewAttendance = () => {
  const { email } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get(`/api/attendance/view?email=${email}`);
        setAttendanceRecords(response.data);
      } catch (error) {
        alert('An error occurred while fetching attendance records');
      }
    };

    fetchAttendanceRecords();
  }, [email]);

  return (
    <div style={styles.container}>
      <h1>View Attendance</h1>
      <ul style={styles.list}>
        {attendanceRecords.map((record, index) => (
          <li key={index}>
            {record.date}: {record.status}
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
  list: {
    listStyle: 'none',
    padding: 0,
  },
};

export default ViewAttendance;
