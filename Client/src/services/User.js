import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/http';
const userService = {
  useUsers: () => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const response = await axiosInstance.get('users');
        return response.data;
      },
    });
    return { data, isLoading, error };
  },
  useGetAnUser: (googleId) => {
    const { data } = useQuery({
      queryKey: ['anUser', googleId],
      queryFn: async () => {
        const {data} = await axiosInstance.get(`users/${googleId}`);
        return data;
      },
      enabled: !!googleId,
    });
    return { data };
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

};

export default userService;
