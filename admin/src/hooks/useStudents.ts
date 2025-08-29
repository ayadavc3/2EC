import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/service/api';
import { StudentCreateArgs, StudentUpdateArgs } from '@/service/api/student/types';

export function useStudents() {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => api.student.getAll(),
    });
}

// Hook to create a new student
export function useCreateStudent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: StudentCreateArgs) => api.student.create(data),
        onSuccess: () => {
            // Invalidate students list to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });
}

export function useUpdateStudent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: StudentUpdateArgs }) => api.student.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });
}

export function useDeleteStudent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return await api.student.delete(id);;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });
}