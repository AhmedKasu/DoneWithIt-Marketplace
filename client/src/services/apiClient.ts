import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
});

class APIClient<T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endPoint).then((res) => res.data);
  };

  getOne = async (id: string) => {
    return axiosInstance
      .get<T>(`${this.endPoint}/${id}`)
      .then((res) => res.data);
  };

  post = async (data: T) => {
    return axiosInstance.post<T>(this.endPoint, data).then((res) => res.data);
  };

  put = async (id: string, data: T) => {
    return axiosInstance
      .put<T>(`${this.endPoint}/${id}`, data)
      .then((res) => res.data);
  };

  delete = async (id: string) => {
    return axiosInstance
      .delete<T>(`${this.endPoint}/${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
