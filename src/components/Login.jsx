import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/vv.png'
const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      const user = response.data;
      if (token) {
        setToken(token);
        setUser(user);
        toast.success('Login Successful.');
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Login Failed. Try Again!');
      console.error('Error during authentication', error);
    }
  };

  return (
    <div className='bg-gradient-to-t from-blue-400 h-screen'>
      <div className="p-4 flex flex-col md:w-[30%] mx-auto border-2 mt-12 bg-gradient-to-t from-blue-100 to-blue-200">
        <div className='text-center mx-auto py-4'>
          <img className='h-16 w-72' src={logo} alt="" />
          <p className='my-2 border-t-4 font-bold border-blue-700'></p>
          <p className='text-2xl font-semibold py-2'>Login</p>
        </div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
          Login
        </button>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default Login;
