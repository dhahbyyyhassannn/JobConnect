import axios from 'axios';

export const register = (username, email, password, role, cv_file) => {
  const formData = new FormData();
  const safeRole = role === 'recruiter' ? 'recruiter' : 'user';

  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', safeRole);

  if (cv_file) {
    formData.append('cv_file', cv_file);
  }

  return axios.post('http://localhost:8000/auth/createUser/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const googleLogin = (idToken) => {
    return axios.post('http://localhost:8000/auth/google', 
        { token: idToken }
    );
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  return axios.get('http://localhost:8000/user/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const becomeRecruiter = () => {
  const token = localStorage.getItem('token');
  return axios.post(
    'http://localhost:8000/user/become-recruiter',
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const logIn = (email, password) => {
  return axios.post('http://localhost:8000/auth/login', { email, password });
};

export const logout = () => {
  localStorage.removeItem('token');
};

