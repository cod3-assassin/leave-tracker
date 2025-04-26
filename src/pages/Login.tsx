import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { users } from '../types/user';
import Notification from '../components/ui/Notification';

import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : 'Please enter a valid email');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      toast.error('Invalid email format');
      return;
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      setEmailError('Email not found');
      toast.error('Email not found');
      return;
    }

    // Mock password check (in real app, use secure auth)
    if (password !== 'password') {
      setPasswordError('Incorrect password');
      toast.error('Incorrect password');
      return;
    }

    login(user); // Set user in context
    switch (user.role) {
      case 'employee':
        navigate('/employee/dashboard');
        toast.success(`Welcome, ${user.name}! Logged in as Employee`);
        break;
      case 'hr':
        navigate('/hr/dashboard');
        toast.success(`Welcome, ${user.name}! Logged in as HR`);
        break;
      case 'manager':
        navigate('/manager/dashboard');
        toast.success(`Welcome, ${user.name}! Logged in as Manager`);
        break;
      case 'tech_lead':
        navigate('/tech-lead/dashboard');
        toast.success(`Welcome, ${user.name}! Logged in as Tech Lead`);
        break;
      default:
        setEmailError('Unknown role');
        toast.error('Unknown role');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-6 lg:px-8">
      <Notification />
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] w-full max-w-sm sm:max-w-md transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`mt-1 w-full p-3 border ${
                emailError ? 'border-red-300' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base placeholder-gray-400`}
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <p className="mt-1 text-red-500 text-xs sm:text-sm animate-fade-in">
                {emailError}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full p-3 border ${
                passwordError ? 'border-red-300' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base placeholder-gray-400`}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
            {passwordError && (
              <p className="mt-1 text-red-500 text-xs sm:text-sm animate-fade-in">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 hover:scale-105 transition-all duration-200 font-medium text-sm sm:text-base shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm sm:text-base text-center">
          Don't have an account?{' '}
          <a
            href="#"
            className="text-indigo-500 hover:text-indigo-600 font-medium"
          >
            Contact HR
          </a>
        </p>
      </div>
    </div>
  );
}