export const marketCollectionsABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_adminAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '__contractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_referrerFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_badgeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minBounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_userMinBounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_recurringBounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_identityTokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_baseToken',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_requestUserRegistration',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_requestPartnerRegistration',
        type: 'bool',
      },
    ],
    name: 'addCollection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'addressToCollectionId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cashbackBuffer',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '__sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'changeDouble',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_identityTokenId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'checkUnique',
        type: 'bool',
      },
    ],
    name: 'checkIdentityProof',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'closeCollectionForTradingAndListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'collectionIdToProfileId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cosignee',
        type: 'address',
      },
    ],
    name: 'cosign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cosignEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'devaddr_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_collectionId',
        type: 'uint256',
      },
    ],
    name: 'dynamicPrices',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'tokenId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'period',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'isPaywall',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isTradeable',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'images',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'countries',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'cities',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'products',
        type: 'string',
      },
    ],
    name: 'emitAskInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_collectionId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'tokenId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'userTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'isPaywall',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'superLike',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'review',
        type: 'string',
      },
    ],
    name: 'emitReview',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_start',
        type: 'uint256',
      },
    ],
    name: 'getAllCollectionTrustWorthyAuditors',
    outputs: [
      {
        internalType: 'address[]',
        name: '_auditors',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_start',
        type: 'uint256',
      },
    ],
    name: 'getAllRequests',
    outputs: [
      {
        internalType: 'address[]',
        name: '_requests',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_start',
        type: 'uint256',
      },
    ],
    name: 'getAllTrustWorthyAuditors',
    outputs: [
      {
        internalType: 'address[]',
        name: '_auditors',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_collectionId',
        type: 'uint256',
      },
    ],
    name: 'getCollection',
    outputs: [
      {
        components: [
          {
            internalType: 'enum Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'baseToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'referrerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minBounty',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userMinBounty',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'badgeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'recurringBounty',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'requestUserRegistration',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'requestPartnerRegistration',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'requiredIndentity',
                type: 'string',
              },
              {
                internalType: 'enum COLOR',
                name: 'minIDBadgeColor',
                type: 'uint8',
              },
              {
                internalType: 'string',
                name: 'valueName',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'maxUse',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'dataKeeperOnly',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'onlyTrustWorthyAuditors',
                type: 'bool',
              },
            ],
            internalType: 'struct IdentityProof',
            name: 'userIdentityProof',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'requiredIndentity',
                type: 'string',
              },
              {
                internalType: 'enum COLOR',
                name: 'minIDBadgeColor',
                type: 'uint8',
              },
              {
                internalType: 'string',
                name: 'valueName',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'maxUse',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'dataKeeperOnly',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'onlyTrustWorthyAuditors',
                type: 'bool',
              },
            ],
            internalType: 'struct IdentityProof',
            name: 'partnerIdentityProof',
            type: 'tuple',
          },
        ],
        internalType: 'struct Collection',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'helper',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isBlacklisted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_collectionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_auditor',
        type: 'address',
      },
    ],
    name: 'isCollectionTrustWorthyAuditor',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_auditor',
        type: 'address',
      },
    ],
    name: 'isTrustWorthyAuditor',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'limits',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lotteryFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxDropinTimer',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maximumArrayLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minCosigners',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_referrerFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_badgeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minBounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_userMinBounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_recurringBounty',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_requestUserRegistration',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_requestPartnerRegistration',
        type: 'bool',
      },
    ],
    name: 'modifyCollection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_requiredIndentity',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_valueName',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: '_onlyTrustWorthyAuditors',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_maxUse',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_isUserIdentity',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_dataKeeperOnly',
        type: 'bool',
      },
      {
        internalType: 'enum COLOR',
        name: '_minIDBadgeColor',
        type: 'uint8',
      },
    ],
    name: 'modifyIdentityProof',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'onlyTrustWorthyAuditors',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'requestCosign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requiredIndentity',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '__contractAddress',
        type: 'address',
      },
    ],
    name: 'setContractAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tradingFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_collectionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_oldOwner',
        type: 'address',
      },
    ],
    name: 'updateAddressToCollectionId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_add',
        type: 'bool',
      },
    ],
    name: 'updateAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_users',
        type: 'address[]',
      },
      {
        internalType: 'bool',
        name: '_add',
        type: 'bool',
      },
    ],
    name: 'updateBlacklist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'userProfileIds',
        type: 'uint256[]',
      },
      {
        internalType: 'bool',
        name: 'blacklist',
        type: 'bool',
      },
    ],
    name: 'updateBlacklistedIdentities',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'large',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'small',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'avatar',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contactChannels',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contacts',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'workspaces',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'countries',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'cities',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'products',
        type: 'string',
      },
    ],
    name: 'updateCollection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_gauges',
        type: 'address[]',
      },
      {
        internalType: 'bool',
        name: '_add',
        type: 'bool',
      },
    ],
    name: 'updateCollectionTrustWorthyAuditors',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_enable',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_minCosigners',
        type: 'uint256',
      },
    ],
    name: 'updateCosign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_devaddr',
        type: 'address',
      },
    ],
    name: 'updateDev',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newMaxDropinTimer',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_cashbackBuffer',
        type: 'uint256',
      },
    ],
    name: 'updateMaxDropinTimer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tradingFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lotteryFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maximumArrayLength',
        type: 'uint256',
      },
    ],
    name: 'updateParams',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'updateProfileId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_gauges',
        type: 'address[]',
      },
      {
        internalType: 'bool',
        name: '_add',
        type: 'bool',
      },
    ],
    name: 'updateTrustWorthyAuditors',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_senderProfileId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_identityCode',
        type: 'bytes32',
      },
    ],
    name: 'updateUserToIdentityCode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum COLOR',
        name: '_idColor',
        type: 'uint8',
      },
      {
        internalType: 'bool',
        name: '_onlyTrustWorthyAuditors',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_dataKeeperOnly',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_maxUse',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_valueName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_value',
        type: 'string',
      },
    ],
    name: 'updateValueNameNCode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'valueName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
