const API_URL = `http://ec2-44-204-169-176.compute-1.amazonaws.com:8000/api/`;
export const login = async (username, password) => {
  const response = await fetch(`${API_URL}token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return true;
  } else {
    throw new Error('Failed to login');
  }
};


export const register = async (username, password) => {
    const response = await fetch(`${API_URL}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to register');
    }
  };

