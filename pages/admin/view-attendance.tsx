import { useState, useEffect } from 'react';
import axios from 'axios';

interface AttendanceRecord {
  _id?: string;
  email: string;
  date: string;
  status: string;
}

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [month, setMonth] = useState('');
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get(`/api/attendance/view-month?month=${month}`);
        setAttendanceRecords(response.data.records);
        setUsers(response.data.users);
      } catch (error) {
        alert('An error occurred while fetching attendance records');
      }
    };

    if (month) {
      fetchAttendanceRecords();
    }
  }, [month]);

  const updateAttendance = async (record: AttendanceRecord) => {
    try {
      if (record._id) {
        // Update existing record
        const newStatus = record.status === 'Present' ? 'Absent' : 'Present';
        await axios.put(`/api/attendance/${record._id}`, { status: newStatus });
        setAttendanceRecords((prevRecords) =>
          prevRecords.map((rec) =>
            rec._id === record._id ? { ...rec, status: newStatus } : rec
          )
        );
      } else {
        // Create new record
        const newRecord = { ...record, status: 'Present' };
        const response = await axios.post('/api/admin/mark-attendance', newRecord);
        setAttendanceRecords((prevRecords) => [...prevRecords, response.data]);
      }
    } catch (error) {
      alert('An error occurred while updating the attendance record');
    }
  };

  const handleCellClick = (user: string, date: number) => {
    const record = attendanceRecords.find(
      (rec) => new Date(rec.date).getDate() === date && rec.email === user
    );
    if (record && record.status === 'Leave') {
      // Prevent changing the leave status
      return;
    }
    if (record) {
      updateAttendance(record);
    } else {
      const newDate = new Date(month);
      newDate.setDate(date);
      const newRecord = { email: user, date: newDate.toISOString(), status: 'Absent' };
      updateAttendance(newRecord);
    }
  };

  const renderTable = () => {
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            {users.map((user) => (
              <th key={user} style={styles.th}>{user}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => (
            <tr key={date}>
              <td style={styles.td}>{date}</td>
              {users.map((user) => {
                const record = attendanceRecords.find(
                  (rec) =>
                    new Date(rec.date).getDate() === date && rec.email === user
                );
                return (
                  <td
                    key={user + date}
                    style={styles.td}
                    onClick={() => handleCellClick(user, date)}
                  >
                    {record ? record.status[0] : 'A'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.container}>
      <h1>View Attendance Records</h1>
      <form style={styles.form}>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={styles.input}
        />
      </form>
      {month && renderTable()}
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
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  th: {
    border: '1px solid #000',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    border: '1px solid #000',
    textAlign: 'left',
    padding: '8px',
    cursor: 'pointer',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ViewAttendance;
