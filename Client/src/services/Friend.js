import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/http';
import { showToastSuccess, showToastError } from '../config/toastConfig';
const friendService = {
  useUnFriendRequest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        const response = await axiosInstance.post('/users/unfriends', user);
         console.log('response',response);
         
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['friends']);
        showToastSuccess(data.message);
      },
      onError: (error) => {
        showToastError(error.message);
      },
    });
  },
};

export default friendService;
