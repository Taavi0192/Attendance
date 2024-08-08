import Link from "next/link";
import { FC, CSSProperties } from "react";

const UserDashboard: FC = () => {
  return (
    <div style={styles.container}>
      <h1>User Dashboard</h1>
      <div style={styles.buttonContainer}>
        <Link href="/user/profile">
          <button style={styles.button}>Profile</button>
        </Link>
        <Link href="/user/mark-attendance">
          <button style={styles.button}>Mark Attendance</button>
        </Link>
        <Link href="/user/request-leave">
          <button style={styles.button}>Request Leave</button>
        </Link>
        <Link href="/user/view-attendance">
          <button style={styles.button}>View Attendance</button>
        </Link>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default UserDashboard;
