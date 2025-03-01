import axios from 'axios';
import { LoginResponse } from '../types/types';

const API_BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const login = async (email: string, password: string): Promise<{
  data: any; token: string 
}> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    console.log('API Response:', response.data); 
    return response.data; 
  } catch (error:any) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};