# Specification

## Summary
**Goal:** Fix the holder data system to accurately display all 344 BITTYICP token holders by implementing historical transaction backfill and robust ongoing indexing from the ledger canister.

**Planned changes:**
- Implement historical backfill in backend to fetch all transactions from ledger canister qroj6-lyaaa-aaaam-qeqta-cai since token inception using ICRC-2 standard
- Build holder tracking system that analyzes all transactions to identify complete list of holders by tracking transfer events
- Query live balances for each holder address using icrc1_balance_of method with batch processing for 344+ addresses
- Calculate and store percentage of total supply (999,999,999.92M BITTYICP) for each holder in stable memory
- Fix existing 5-minute polling timer to maintain holder data with incremental updates processing only new transactions
- Add comprehensive error handling and logging throughout indexing system for historical backfill, balance queries, and timer execution
- Update frontend HolderList component and useHolderData hook to fetch and display complete holder list with addresses, balances, and supply percentages

**User-visible outcome:** The holder list page displays all 344 authentic BITTYICP token holders with their current balances and percentage of total supply, automatically staying up-to-date through 5-minute polling.
