import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';   
import { toast, ToastContainer } from 'react-toastify';  

const UserManagement = () => {  
  const [users, setUsers] = useState([]);  

  useEffect(() => {  
    const fetchUsers = async () => {  
      try {  
        const token = localStorage.getItem('token'); // Get the token from local storage  
        const response = await axios.get(`${apiUrl}/api/admin/users`, {  
          headers: { Authorization: `Bearer ${token}` }, // Include token in request  
        });  
        setUsers(response.data);  
      } catch (error) {  
        toast.error('Failed to fetch users');  
      }  
    };  
    fetchUsers();  
  }, []);  
  
  const deleteUser = async (id) => {  
    try {  
      const token = localStorage.getItem('token'); // Get the token from local storage  
      await axios.delete(`${apiUrl}/api/admin/users/delete`, {   
        headers: { Authorization: `Bearer ${token}` }, // Include token in request  
        data: { id }   
      });  
      setUsers(users.filter(user => user._id !== id));  
      toast.success('User deleted successfully');  
    } catch (error) {  
      toast.error('Error deleting user');  
    }  
  };  

  return (  
    <div>  
      <h2>User Management</h2>  
      <table className="table">  
        <thead>  
          <tr>  
            <th>Name</th>  
            <th>Email</th>  
            <th>Status</th>  
            <th>Actions</th>  
          </tr>  
        </thead>  
        <tbody>  
          {users.map(user => (  
            <tr key={user._id}>  
              <td>{user.name}</td>  
              <td>{user.email}</td>  
              <td>{user.status}</td>  
              <td>  
                <button onClick={() => deleteUser(user._id)} className="btn btn-danger">Delete</button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
      <ToastContainer />  
    </div>  
  );  
};  

export default UserManagement;