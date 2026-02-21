# Specification

## Summary
**Goal:** Implement complete historical transaction backfill and holder indexing to display all BITTYICP token holders from the token's inception, not just holders from transactions since deployment.

**Planned changes:**
- Add one-time historical backfill at canister deployment/upgrade to fetch all transactions from ledger canister qroj6-lyaaa-aaaam-qeqta-cai starting from transaction index 0
- Create separate stable storage for complete holder list containing addresses, balances, and percentage of total supply (999,999,999.92M BITTYICP)
- Update 5-minute polling timer to incrementally update holder balances from new transactions only (no full re-scan)
- Maintain existing rolling window of last 100 transactions independently from holder list
- Query current balance for each holder using icrc1_balance_of method and calculate percentage of total supply
- Update frontend HolderList component to display complete historical holder list
- Revise "Backend Indexing In Progress" banner message to accurately reflect that historical backfill has completed and ongoing indexing continues every 5 minutes

**User-visible outcome:** Users will see the complete list of all BITTYICP token holders from the token's entire history, with accurate balances and percentages, rather than only holders from transactions indexed since deployment. The banner message will clearly indicate historical data is loaded and new transactions are indexed every 5 minutes.
