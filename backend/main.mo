import List "mo:core/List";
import OutCall "http-outcalls/outcall";
import Principal "mo:core/Principal";
import Blob "mo:core/Blob";
import Iter "mo:core/Iter";

actor {
  type Transaction = {
    index : Nat;
    operation : TransactionOperation;
    timestamp : Int;
    memo : Text;
  };

  type TransactionOperation = {
    #mint : MintOperation;
    #burn : BurnOperation;
    #transfer : TransferOperation;
  };

  type MintOperation = {
    to : Blob;
    amount : Nat;
  };

  type BurnOperation = {
    from : Blob;
    amount : Nat;
  };

  type TransferOperation = {
    from : Blob;
    to : Blob;
    amount : Nat;
    fee : Nat;
  };

  type TransactionWithDetail = {
    transaction : Transaction;
    amount : Nat;
    transaction_type : Text;
    augmented_memo : Text;
    amount_adjusted : Float;
    value_usd : Float;
    transfer_from : ?Principal;
    transfer_to : ?Principal;
    network : Text;
  };

  type Icrc1Transaction = {
    from : ?Blob;
    to : ?Blob;
    amount : Nat;
    memo : ?Blob;
    created_at_time : ?Int;
    fee : ?Nat;
  };

  type Icrc1TransactionWithId = {
    id : Nat;
    transaction : Icrc1Transaction;
  };

  func parseMemo(memo : Text) : { transactionType : Text; amountAdjusted : Float; valueUsd : Float; augmentedMemo : Text } {
    if (memo.contains(#text "buy")) {
      {
        transactionType = "buy";
        amountAdjusted = 0.0;
        valueUsd = 0.0;
        augmentedMemo = memo;
      };
    } else if (memo.contains(#text "sell")) {
      {
        transactionType = "sell";
        amountAdjusted = 0.0;
        valueUsd = 0.0;
        augmentedMemo = memo;
      };
    } else {
      {
        transactionType = "transfer";
        amountAdjusted = 0.0;
        valueUsd = 0.0;
        augmentedMemo = memo;
      };
    };
  };

  func createTransactionWithDetail(
    transaction : Transaction,
    parsedMemo : { transactionType : Text; amountAdjusted : Float; valueUsd : Float; augmentedMemo : Text },
    transferFrom : ?Principal,
    transferTo : ?Principal,
    network : Text,
  ) : TransactionWithDetail {
    {
      transaction;
      amount = switch (transaction.operation) {
        case (#transfer(t)) { t.amount };
        case (#mint(m)) { m.amount };
        case (#burn(b)) { b.amount };
      };
      transaction_type = parsedMemo.transactionType;
      augmented_memo = parsedMemo.augmentedMemo;
      amount_adjusted = parsedMemo.amountAdjusted;
      value_usd = parsedMemo.valueUsd;
      transfer_from = transferFrom;
      transfer_to = transferTo;
      network;
    };
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public query ({ caller }) func getRecentTransactions(limit : Nat, offset : Nat) : async [TransactionWithDetail] {
    let exampleTransaction : Transaction = {
      index = 1 : Nat;
      operation = #transfer({
        from = Blob.fromArray([0, 1, 2, 3]);
        to = Blob.fromArray([4, 5, 6, 7]);
        amount = 1000;
        fee = 10;
      });
      timestamp = 1_688_108_911_320_000;
      memo = "buy transaction";
    };

    let parsedMemo = parseMemo(exampleTransaction.memo);

    let transactionWithDetail = createTransactionWithDetail(
      exampleTransaction,
      parsedMemo,
      ?Principal.fromText("2vxsx-fae"),
      ?Principal.fromText("35cho-5hjvm-2hv4l-wc2hv-fn2i2-l4ytm-q4ipw-72jt2-toksn-r7dmh-nae"),
      "mainnet",
    );

    [transactionWithDetail];
  };

  public shared ({ caller }) func getAllIcTransactions(_maxResults : Nat, _includeMarkets : Bool, _sortField : Text, _search : Text, _reverse : Bool) : async [Icrc1TransactionWithId] {
    let transactions = List.empty<Icrc1TransactionWithId>();

    let transaction : Icrc1TransactionWithId = {
      id = 0;
      transaction = {
        from = ?Blob.fromArray([0, 1, 2, 3]);
        to = ?Blob.fromArray([4, 5, 6, 7]);
        amount = 1000;
        memo = ?Blob.fromArray([99, 108]);
        created_at_time = ?87_567;
        fee = ?80;
      };
    };

    transactions.add(transaction);

    let transactionsArray = transactions.toArray();
    transactionsArray.sliceToArray(0, if (transactionsArray.size() > _maxResults) { _maxResults } else { transactionsArray.size() });
  };

  public query ({ caller }) func cacheIcTransaction(_transaction : Icrc1TransactionWithId) : async Bool {
    true;
  };
};
