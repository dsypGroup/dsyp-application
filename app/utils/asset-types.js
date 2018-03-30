import sharedService from '../models/shared/shared-service';

export default {
    // Equity types
    Equity: 0,
    EquityNew: 60,
    CommonStock: 61,
    PreferredStock: 62,
    Warrant: 63,
    Premium: 64,
    Trust: 65,
    Right: 66,
    WarrantRight: 67,
    Etf: 86,

    // Option types
    Future: 68,
    FutureSpread: 69,
    Option: 10,
    EquityOption: 71,
    IndexOption: 72,
    FutureOption: 73,
    IndexFuture: 92,
    FutureInterest: 93,
    CurrencyFuture: 105,
    CommodityFuture: 96,
    CommodityOption: 95,
    FutureFuture: 97,

    // Mutual fund types
    MutualFund: 5,
    FixedIncome: 74,
    SukukBonds: 75,
    ConvertibleBond: 76,
    MBS: 77,
    GovBond: 78,
    CorpBond: 79,
    USAgencyBond: 80,
    USTreasuryBill: 81,
    USTreasuryCoupon: 82,
    MoneyMarket: 83,
    CD: 84,
    TreasuryBill: 108,
    LendingRate: 109,
    BorrowningRate: 110,
    InterbankRate: 111,
    Debenture: 112,
    Sukuk: 121,

    // Forex types
    Forex: 14,
    ForexFra: 88,
    ForexDeposit: 89,
    ForexForward: 90,
    Statistics: 91,

    // Index types
    Indices: 7,

    // Stock Borrowing  types
    StockBorrowing: 106,

    FixedIncomes: '6',

    isEquity: function (inst) {
        return inst === this.Equity;
    },

    isRight: function (inst) {
        return inst === this.Right;
    },

    isSukukBonds: function (inst) {
        return inst === this.SukukBonds;
    },

    isEtf: function (inst) {
        return inst === this.Etf;
    },

    isIndices: function (inst) {
        return inst === this.Indices;
    },

    isOption: function (inst) {
        return inst === this.Option;
    },

    isForex: function (inst) {
        return inst === this.Forex;
    },

    isFixedIncome: function (inst) {
        return inst === this.FixedIncomes;
    },

    isTradableAssetType: function (inst) {
        if (sharedService.getService('trade')) {
            return !sharedService.getService('trade').settings.tradingDisabledInstTypes.contains(inst);
        }

        return false;
    },

    AssetLangKeys: {
        0: 'equity',
        2: 'mutualFund',
        5: 'mutualFund',
        7: 'indices',
        10: 'option',
        11: 'currency',
        14: 'forex',
        60:	'equity',
        61:	'equity',
        62:	'preferredStock',
        63:	'warrant',
        64:	'premium',
        65:	'trust',
        66:	'rights',
        67:	'warrantRight',
        68:	'future',
        69:	'futureSpread',
        71:	'equityOption',
        72:	'indexOption',
        73:	'futureOption',
        74:	'fixedIncome',
        75:	'sukukBonds',
        76:	'convertibleBond',
        77:	'mbs',
        78:	'govBond',
        79:	'corpBond',
        80:	'usAgencyBond',
        81:	'usTreasuryBill',
        82:	'usTreasuryCoupon',
        83:	'moneyMarket',
        84:	'cd',
        86:	'etf',
        88:	'forexFra',
        89:	'forexDeposit',
        90:	'forexForward',
        91:	'statistics',
        92:	'indexFuture',
        93:	'interestRateFuture',
        94:	'interestRateOption',
        95:	'commodityOption',
        96:	'commodityFuture',
        97:	'futureFuture',
        98:	'crudeOil',
        99:	'heatingOil',
        100: 'naturalGas',
        101: 'gold',
        102: 'silver',
        103: 'platinum',
        104: 'corn',
        105: 'currencyFuture',
        106: 'stockBorrowing',
        108: 'treasuryBill',
        109: 'lendingDate',
        110: 'borrowingDate',
        111: 'interbankDate',
        112: 'debenture',
        113: 'interventionRates',
        114: 'exchangeRates',
        115: 'economicPolicyDebt',
        116: 'financialSector',
        117: 'publicSector',
        118: 'healthPopulationStructure',
        119: 'generalCountryData',
        120: 'labourSocialProtection',
        121: 'sukuk',
        122: 'certificate'
    }
};