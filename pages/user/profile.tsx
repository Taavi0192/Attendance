import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { email } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const response = await axios.get(`/api/user/attendance-grade?email=${email}`);
        setGrade(response.data.grade);
      } catch (error) {
        alert('An error occurred while fetching the grade');
      }
    };

    fetchGrade();
  }, [email]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) return;
  //   const formData = new FormData();
  //   formData.append('profilePicture', selectedFile);
  //   formData.append('email', email);

  //   try {
  //     const response = await axios.post('/api/user/upload-profile-picture', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setProfilePicture(response.data.filePath);
  //     alert('Profile picture uploaded successfully');
  //   } catch (error) {
  //     alert('An error occurred while uploading the profile picture');
  //   }
  // };

  return (
    <div style={styles.container}>
      <h1>User Profile</h1>
      {/* <input type="file" onChange={handleFileChange} style={styles.input} />
      <button onClick={handleUpload} style={styles.button}>Upload Profile Picture</button>
      {profilePicture && <img src={profilePicture} alt="Profile Picture" style={styles.image} />} */}
      {grade && <p style={styles.grade}>Your Grade: {grade}</p>}
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
  input: {
    margin: '10px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  image: {
    marginTop: '20px',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  grade: {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default Profile;
