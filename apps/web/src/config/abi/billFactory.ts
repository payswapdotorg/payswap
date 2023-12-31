export const billFactoryABI = [
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
        internalType: 'uint256',
        name: '_profileId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_devaddr',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_isPayable',
        type: 'bool',
      },
    ],
    name: 'createGauge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
