export const stakeMarketNoteABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'IOU',
    outputs: [
      {
        internalType: 'uint256',
        name: 'ownerStakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'creatorStakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'created',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'tag',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minIDBadgeColor',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_valueName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_maxUse',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_dataKeeperOnly',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_onlyTrustWorthyAuditors',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: '_requiredIndentity',
        type: 'string',
      },
    ],
    name: 'addIdentityProofToStake',
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
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'blackListedIdentities',
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
    name: 'bufferTime',
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
        name: '_stakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_identityTokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'checkIdentityProof',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'uint256',
        name: '_stakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_partnerStakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_start',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_tag',
        type: 'string',
      },
    ],
    name: 'createIOU',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stakeId',
        type: 'uint256',
      },
    ],
    name: 'getAllGaugeTrustWorthyAuditors',
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
        name: '_stakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_numPeriods',
        type: 'uint256',
      },
    ],
    name: 'getDuePayable',
    outputs: [
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
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stakeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_numPeriods',
        type: 'uint256',
      },
    ],
    name: 'getDueReceivable',
    outputs: [
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
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tm1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tm2',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_period',
        type: 'uint256',
      },
    ],
    name: 'getNumPeriods',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'identityProofs',
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
        name: '_source',
        type: 'address',
      },
    ],
    name: 'isMarketPlace',
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
        name: '_bufferTime',
        type: 'uint256',
      },
    ],
    name: 'setBufferTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
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
        name: '_stakeId',
        type: 'uint256',
      },
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
        internalType: 'uint256',
        name: '_stakeId',
        type: 'uint256',
      },
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
    name: 'updateGaugeTrustWorthyAuditors',
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
    ],
    name: 'updateTradingFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_creatorStakeId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_tag',
        type: 'string',
      },
    ],
    name: 'verifyNFT',
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
] as const
