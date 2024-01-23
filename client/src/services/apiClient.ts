import axios from 'axios';
import EventEmitter from 'eventemitter3';

export const baseURL = '/api';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
});

export const authEventEmitter = new EventEmitter();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      authEventEmitter.emit('unauthorized');
    }
    return Promise.reject(error);
  }
);

class APIClient<T, K = T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = () => {
    return axiosInstance.get<K[]>(this.endPoint).then((res) => res.data);
  };

  getOne = async (id: string) => {
    return axiosInstance
      .get<K>(`${this.endPoint}/${id}`)
      .then((res) => res.data);
  };

  post = async (data: T) => {
    return axiosInstance.post<K>(this.endPoint, data).then((res) => res.data);
  };

  put = async (id: string, data: T) => {
    return axiosInstance
      .put<K>(`${this.endPoint}/${id}`, data)
      .then((res) => res.data);
  };

  delete = async (id: string) => {
    return axiosInstance
      .delete<K>(`${this.endPoint}/${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
