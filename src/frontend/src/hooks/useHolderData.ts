import { useGetHolderData } from './useQueries';

export function useHolderData() {
  const { data, isLoading, error } = useGetHolderData();

  return {
    holders: data?.holders || [],
    isLoading,
    error: error ? 'Failed to load holder data' : null,
  };
}
