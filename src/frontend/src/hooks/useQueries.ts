import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetHolderData() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['holderData', actor],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUniqueHolderAddresses();
    },
    enabled: !!actor && !isFetching,
    staleTime: 240000, // Consider data fresh for 4 minutes
    refetchInterval: 300000, // Refetch every 5 minutes (300000ms)
  });
}
