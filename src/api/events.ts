import axios from 'axios';
import { Event } from '../types/types';

const API_BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const getEvents = async (token: string): Promise<any[]> => {
  try {
    const response:any = await axios.post<any[]>(
      `${API_BASE_URL}/events-listing`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('response.data?=-=',response.data);
    
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};