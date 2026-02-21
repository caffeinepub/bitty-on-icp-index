# Specification

## Summary
**Goal:** Fix the missing TransactionList and HolderList component rendering to display transaction history and holder data on the page.

**Planned changes:**
- Restore TransactionList component implementation to fetch and display last 100 transactions with pagination (25 per page)
- Implement useTransactions hook using React Query to fetch data from backend getIndexedTransactions method
- Add TransactionList component to App.tsx below indexing status alert and above VideoSection
- Debug and fix HolderList component rendering to display holder data with address, balance, and percentage columns
- Verify backend getIndexedTransactions method exists and returns correct transaction data format
- Verify backend getHolderData method exists and returns complete holder list data in correct format

**User-visible outcome:** Users will see the transaction history table displaying recent transactions with pagination controls and the holder list showing all token holders with their balances and ownership percentages.
