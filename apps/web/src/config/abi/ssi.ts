export const ssiABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auditorProfileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'answer',
        type: 'string',
      },
    ],
    name: 'ActivateData',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'publicKey',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'encyptedPrivateKey',
        type: 'string',
      },
    ],
    name: 'CreateAccount',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auditorProfileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'auditor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'answer',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'dataType',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'searchable',
        type: 'bool',
      },
    ],
    name: 'DataCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
    ],
    name: 'DataDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'senderProfileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auditorProfileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'encryptedAnswer',
        type: 'string',
      },
    ],
    name: 'GenerateIdentityProof',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'senderProfileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'receiverProfileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auditorProfileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'encryptedAnswer',
        type: 'string',
      },
    ],
    name: 'GenerateShareProof',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collectionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'paramName',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'paramValue',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'paramValue2',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'paramValue3',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paramValue4',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string[]',
        name: 'paramValue5',
        type: 'string[]',
      },
    ],
    name: 'UpdateMiscellaneous',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
    ],
    name: 'ValidateData',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_auditorProfileId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'answer',
        type: 'string',
      },
    ],
    name: 'activateData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'burn',
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
        name: 'profileId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'publicKey',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'encryptedPrivateKey',
        type: 'string',
      },
    ],
    name: 'createAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'auditorProfileId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'auditor',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'searchable',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'answer',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'dataType',
        type: 'string',
      },
    ],
    name: 'createData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
    ],
    name: 'deleteData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_idx',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_collectionId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'paramName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'paramValue',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'paramValue2',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'paramValue3',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'paramValue4',
        type: 'address',
      },
      {
        internalType: 'string[]',
        name: 'paramValue5',
        type: 'string[]',
      },
    ],
    name: 'emitUpdateMiscellaneous',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_senderProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_auditorProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_question',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_answer',
        type: 'string',
      },
    ],
    name: 'generateIdentityProof',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_senderProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_receiverProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_auditorProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_question',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_encryptedAnswer',
        type: 'string',
      },
    ],
    name: 'generateShareProof',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_profileId',
        type: 'uint256',
      },
    ],
    name: 'getAllAuthorizations',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_auditors',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
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
        name: '_profileId',
        type: 'uint256',
      },
    ],
    name: 'getSSID',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'senderProfileId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'receiverProfileId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'auditorProfileId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'question',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'answer',
            type: 'string',
          },
          {
            internalType: 'enum ProofType',
            name: 'proofType',
            type: 'uint8',
          },
        ],
        internalType: 'struct SSIData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'getSSIData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'senderProfileId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'receiverProfileId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'auditorProfileId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'question',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'answer',
            type: 'string',
          },
          {
            internalType: 'enum ProofType',
            name: 'proofType',
            type: 'uint8',
          },
        ],
        internalType: 'struct SSIData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'idValueName',
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
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'metadata',
    outputs: [
      {
        internalType: 'uint256',
        name: 'senderProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'receiverProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'auditorProfileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'answer',
        type: 'string',
      },
      {
        internalType: 'enum ProofType',
        name: 'proofType',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minBadgeColor',
    outputs: [
      {
        internalType: 'enum COLOR',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
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
    inputs: [],
    name: 'owner',
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
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
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
    inputs: [],
    name: 'paused',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'profileToAccount',
    outputs: [
      {
        internalType: 'string',
        name: 'publicKey',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'encryptedPrivateKey',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
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
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
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
    name: 'symbol',
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
    inputs: [],
    name: 'tokenId',
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
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: 'output',
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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_auditorProfileId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_add',
        type: 'bool',
      },
    ],
    name: 'updateAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_idValueName',
        type: 'string',
      },
    ],
    name: 'updateId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum COLOR',
        name: '_minBadgeColor',
        type: 'uint8',
      },
    ],
    name: 'updateParams',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_profileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_identityTokenId',
        type: 'uint256',
      },
    ],
    name: 'updateSSID',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'profileId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
    ],
    name: 'validateData',
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
        name: 'merchantId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'item',
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
