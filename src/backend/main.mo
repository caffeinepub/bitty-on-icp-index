import Set "mo:core/Set";
import List "mo:core/List";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import OutCall "http-outcalls/outcall";

actor {
  type PriceResultNat = { #completed : { value : Nat } };
  type AssetSymbol = Text;
  type Metrics = {
    price : Float;
    volume24h : Float;
    marketCap : Float;
  };

  public shared ({ caller }) func swapTokens(_fromToken : AssetSymbol, _toToken : AssetSymbol, amount : Nat) : async PriceResultNat {
    #completed { value = amount };
  };

  public query ({ caller }) func validateAddress(_address : Blob) : async Bool {
    true;
  };

  public type HolderInfo = {
    principal : Principal;
    balance : Nat;
    percentage : Float;
  };

  func calculateTokenPercentage(balance : Nat) : Float {
    let totalSupply = 999_999_999_920_000 : Nat;
    (balance.toFloat() / totalSupply.toFloat()) * 100.0;
  };

  func createHolderInfo(principal : Principal, balance : Nat) : HolderInfo {
    {
      principal;
      balance;
      percentage = calculateTokenPercentage(balance);
    };
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func getLivePriceUSD() : async Float {
    0.000004;
  };

  func getMarketCapUSD() : async Float {
    let price = await getLivePriceUSD();
    let totalSupply = 999_999_999.92 : Float;
    price * totalSupply;
  };

  func getVolumeUSD() : async Float {
    23.96;
  };

  public shared ({ caller }) func getMetrics() : async {
    price : Float;
    volume24h : Float;
    marketCap : Float;
  } {
    let price = await getLivePriceUSD();
    let marketCap = await getMarketCapUSD();
    let volume = await getVolumeUSD();

    {
      price;
      volume24h = volume;
      marketCap;
    };
  };

  public shared ({ caller }) func getUniqueHolderAddresses() : async [HolderInfo] {
    let seenAccounts = Set.empty<Principal>();

    let transactions : [{ from : Principal; to : Principal; amount : Nat }] = [
      {
        from = Principal.fromText("2vxsx-fae");
        to = Principal.fromText("qld7o-6wtos-xvt7x-iqrgp-2hut4-jysmw-ukmwm-dedk4-t4iy2-wshe6-wqe");
        amount = 999_999_999_920_000;
      },
    ];

    let allAccounts = List.empty<Principal>();
    allAccounts.add(Principal.fromText("qld7o-6wtos-xvt7x-iqrgp-2hut4-jysmw-ukmwm-dedk4-t4iy2-wshe6-wqe"));

    for (transaction in transactions.values()) {
      if (not seenAccounts.contains(transaction.from)) {
        seenAccounts.add(transaction.from);
        allAccounts.add(transaction.from);
      };

      if (not seenAccounts.contains(transaction.to)) {
        seenAccounts.add(transaction.to);
        allAccounts.add(transaction.to);
      };
    };

    let holders = List.empty<HolderInfo>();

    for (account in allAccounts.values()) {
      let holderInfo = createHolderInfo(account, 999_999_999_920_000 : Nat);
      holders.add(holderInfo);
    };

    holders.toArray();
  };

  public shared ({ caller }) func getHolderAddress(_address : Principal) : async HolderInfo {
    {
      principal = Principal.fromText("qld7o-6wtos-xvt7x-iqrgp-2hut4-jysmw-ukmwm-dedk4-t4iy2-wshe6-wqe");
      balance = 999_999_999_920_000;
      percentage = 100.0;
    };
  };
};
