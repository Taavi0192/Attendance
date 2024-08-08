import Link from 'next/link';
import { FC, CSSProperties } from 'react';

const AdminDashboard: FC = () => {
  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <div style={styles.buttonContainer}>
        <Link href="/admin/view-attendance">
          <button style={styles.button}>View Attendance Records</button>
        </Link>
        <Link href="/admin/manage-attendance">
          <button style={styles.button}>Manage Attendance</button>
        </Link>
        <Link href="/admin/view-leave-requests">
          <button style={styles.button}>View Leave Requests</button>
        </Link>
      </div>
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
