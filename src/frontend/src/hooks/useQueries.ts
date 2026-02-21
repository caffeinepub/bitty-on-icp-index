import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetHolderData() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['holderData', actor],
    queryFn: async () => {
      if (!actor) return { holders: [], account_principal_mapping: [] };
      return actor.getHolderData();
    },
    enabled: !!actor && !isFetching,
    staleTime: 240000, // Consider data fresh for 4 minutes
    refetchInterval: 300000, // Refetch every 5 minutes (300000ms)
  });
}

export function useGetIndexedTransactions() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['indexedTransactions', actor],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIndexedTransactions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 240000, // Consider data fresh for 4 minutes
    refetchInterval: 300000, // Refetch every 5 minutes (300000ms)
  });
}

export function useGetMetrics() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['metrics', actor],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMetrics();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000, // Refetch every 60 seconds for live data
  });
}
