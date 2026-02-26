# Specification

## Summary
**Goal:** Fix the `RTS error: blob_of_principal: invalid principal` crash in the Motoko backend's transaction fetching logic so the Transaction History section loads valid transactions without errors.

**Planned changes:**
- In `backend/main.mo`, add principal validation before any principal-related operations (e.g., `Principal.toBlob`, `Principal.fromText`, account identifier conversion) in the transaction fetching function
- Skip any transaction whose account owner principal is invalid, anonymous (`aaaaa-aa`), or otherwise malformed, instead of crashing
- Return all remaining valid transactions normally without throwing or trapping

**User-visible outcome:** The Transaction History section no longer shows the `RTS error: blob_of_principal: invalid principal` message, and valid BITTYICP ledger transactions load and display correctly in the transaction table.
