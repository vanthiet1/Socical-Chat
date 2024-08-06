import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/http';
import { showToastSuccess, showToastError } from '../config/toastConfig';
const userService = {
  useGetAllUsers: () => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const response = await axiosInstance.get('/users/all');
        return response.data;
      },
    });
    return { data, isLoading, error };
  },
  useGetAnUserById: (id) => {
    const { data, isLoading } = useQuery({
      queryKey: ['anUser', id],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`users/room/${id}`)
        return data;
      },
      enabled: !!id,
    });
    return { data, isLoading };
  },
  useUsers: () => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const response = await axiosInstance.get('/users');
        return response.data;
      },
    });
    return { data, isLoading, error };
  },

  useGetAnUser: (googleId) => {
    const { data, isLoading } = useQuery({
      queryKey: ['anUser', googleId],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`users/${googleId}`);
        return data;
      },
      enabled: !!googleId,
    });
    return { data, isLoading };
  },
  useSearchAddFriend: (keyword) => {
    return useQuery({
      queryKey: ['searchAddFriend', keyword],
      queryFn: async () => {
        const { data } = await axiosInstance.get('/users/search/friends', {
          params: { keyword }
        });
        return data;
      },
      enabled: !!keyword,
    });
  },
  useSaveUser: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        const response = await axiosInstance.post('/users/google', user);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    });
  },
  useSendFriendRequest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        const response = await axiosInstance.post('/users/sendFriendRequest', user);
        return response.data;
      },
      onSuccess: () => {

        queryClient.invalidateQueries(['friends']);
      },
    });
  },
  useAcceptFriendRequest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        const response = await axiosInstance.post('/users/acceptFriendRequest', user);
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
  useCancelFriendRequest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        const response = await axiosInstance.post('/users/cancelFriendRequest', user);
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

export default userService;
