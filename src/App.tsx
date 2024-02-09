import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/users.json');
        const userData = await response.json();
        setUsers(userData.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSignup = (formData: any) => {
    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    console.log('User signed up:', formData);
  };

  const saveUsers = (data: any[]) => {
    // Save the updated user data to users.json
    fetch('/users.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users: data }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save user data');
        }
      })
      .catch(error => console.error('Error saving user data:', error));
  };

  const handleLogin = ({ email, password }: { email: string; password: string }) => {
    const foundUser = users.find((user) => user.email === email && user.password === password);
    if (foundUser) {
      console.log('Login successful!');
      // Redirect or show a success message
    } else {
      console.log('Invalid credentials');
      // Show an error message
    }
  };

  return (
    <div>
      <Signup onSignup={handleSignup} />
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default App;
