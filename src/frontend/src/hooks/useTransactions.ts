import { useGetIndexedTransactions } from './useQueries';
import type { Transaction } from '../backend';

const TRANSACTIONS_PER_PAGE = 25;

export function useTransactions(page: number = 1) {
  const { data, isLoading, error } = useGetIndexedTransactions();

  const allTransactions = data || [];
  const totalPages = Math.ceil(allTransactions.length / TRANSACTIONS_PER_PAGE);

  // Calculate pagination
  const startIndex = (page - 1) * TRANSACTIONS_PER_PAGE;
  const endIndex = startIndex + TRANSACTIONS_PER_PAGE;
  const paginatedTransactions = allTransactions.slice(startIndex, endIndex);

  return {
    paginatedTransactions,
    totalPages,
    currentPage: page,
    totalTransactions: allTransactions.length,
    isLoading,
    error: error ? 'Failed to load transaction data' : null,
  };
}
