import { useQuery , useQueryClient , useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils/http';
const messageService = {
  useGetMessage: ({ fromUserId, toUserId }) => {
    const { data } = useQuery({
      queryKey: ['message', fromUserId, toUserId],
      queryFn: async () => {
        const response = await axiosInstance.get(`/message/${fromUserId}/${toUserId}`);
        return response.data;
      },
      enabled: !!fromUserId && !!toUserId,
    });

    return { data };
  },
  useDeleteMessageUser: () => { 
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id) => {
        const response = await axiosInstance.delete(`/message/${id}`);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['message']); 
      },
    });
  },
};

export default messageService;
