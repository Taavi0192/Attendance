import { useState, useEffect } from 'react';
import axios from 'axios';

interface LeaveRequest {
  _id: string;
  email: string;
  date: string;
  reason: string;
  status: string;
}

const ViewLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('/api/leave/view-all');
      setLeaveRequests(response.data);
    } catch (error) {
      alert('An error occurred while fetching leave requests');
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/leave/${id}`, { status });
      fetchLeaveRequests(); // Refresh the requests
    } catch (error) {
      alert('An error occurred while updating leave status');
    }
  };

  return (
    <div style={styles.container}>
      <h1>View Leave Requests</h1>
      <ul style={styles.list}>
        {leaveRequests.map((request) => (
          <li key={request._id}>
            {request.date}: {request.email} - {request.reason} - {request.status}
            <button onClick={() => handleUpdateStatus(request._id, 'Approved')} style={styles.button}>Approve</button>
            <button onClick={() => handleUpdateStatus(request._id, 'Declined')} style={styles.button}>Decline</button>
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
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ViewLeaveRequests;
