// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api/auth';

// class AuthService {
//   constructor() {
//     this.api = axios.create({
//       baseURL: API_BASE_URL,
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   }

//   async signup(userData) {
//     try {
//       console.log('Sending registration data:', userData);
//       const response = await this.api.post('/register', {
//         email: userData.email,
//         password: userData.password,
//         first_name: userData.firstName,
//         last_name: userData.lastName
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Registration Error:', error);
      
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         console.error('Error response:', error.response.data);
//         throw new Error(error.response.data.error || 'Signup failed');
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//         throw new Error('No response from server. Please check your connection.');
//       } else {
//         // Something happened in setting up the request
//         console.error('Error setting up request:', error.message);
//         throw new Error('An unexpected error occurred');
//       }
//     }
//   }

//   // ... other methods remain the same
// }

// export default new AuthService();
import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api/auth',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000  // 10 seconds timeout
    });
  }

  // Existing login method
  async login(email, password) {
    try {
      const response = await this.api.post('/login', { 
        email, 
        password 
      });
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      console.error('Login Error:', error);

      if (error.response) {
        throw new Error(error.response.data.error || 'Login failed');
      } else if (error.request) {
        throw new Error('No response from server. Please check your network connection.');
      } else {
        throw new Error('Error setting up login request');
      }
    }
  }

  // Add signup method
  async signup(userData) {
    try {
      console.log('Attempting signup with:', userData);
      
      const response = await this.api.post('/register', userData);
      
      console.log('Signup Response:', response.data);
      
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      console.error('Signup Error:', error);

      if (error.response) {
        // Server responded with an error
        throw new Error(error.response.data.error || 'Signup failed');
      } else if (error.request) {
        // Request made but no response received
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something else went wrong
        throw new Error('An unexpected error occurred during signup');
      }
    }
  }

  // Optional: Logout method
  logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // You might want to invalidate the token on the server-side as well
  }

  // Optional: Get current user
  getCurrentUser() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();