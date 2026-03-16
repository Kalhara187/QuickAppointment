// API response types
export interface Appointment {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  provider?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
