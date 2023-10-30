import { useMutation } from '@tanstack/react-query';

import APIClient from '../services/apiClient';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const apiClient = new APIClient<SignupData>('/users');

const useSignup = () => {
  return useMutation({
    mutationFn: apiClient.post,
  });
};

export default useSignup;
