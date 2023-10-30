import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
});

class APIClient<T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = async () => {
    return await axiosInstance.get<T[]>(this.endPoint);
  };

  getOne = async (id: string) => {
    return await axiosInstance.get<T>(`${this.endPoint}/${id}`);
  };

  post = async (data: T) => {
    return await axiosInstance.post<T>(this.endPoint, data);
  };

  put = async (id: string, data: T) => {
    return await axiosInstance.put<T>(`${this.endPoint}/${id}`, data);
  };

  delete = async (id: string) => {
    return await axiosInstance.delete<T>(`${this.endPoint}/${id}`);
  };
}

export default APIClient;
