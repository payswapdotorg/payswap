export const valuePoolFactoryABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_devaddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_marketPlace',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_onePersonOneVote',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'riskpool',
        type: 'bool',
      },
    ],
    name: 'createValuePool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
