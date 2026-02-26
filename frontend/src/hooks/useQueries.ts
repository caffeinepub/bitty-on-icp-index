import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TransactionWithDetail } from '../backend';

export function useGetRecentTransactions(limit: number = 1000, offset: number = 0) {
  const { actor, isFetching } = useActor();

  return useQuery<TransactionWithDetail[]>({
    queryKey: ['recentTransactions', actor, limit, offset],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.getRecentTransactions(BigInt(limit), BigInt(offset));
    },
    enabled: !!actor && !isFetching,
    staleTime: 240000, // Consider data fresh for 4 minutes
    refetchInterval: 300000, // Refetch every 5 minutes (300000ms)
  });
}
