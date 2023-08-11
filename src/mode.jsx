export const mode = {
  id: 919,
  name: 'Mode Testnet',
  network: 'mode',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.mode.network/'] },
    default: { http: ['https://sepolia.mode.network/'] },
  },
  blockExplorers: {
    default: { name: 'Sepolia Mode Explorer', url: 'https://sepolia.explorer.mode.network/' },
  },
  contracts: {
    "MyContract": {
      address: '0x09D8cFfE58cc6a5d728BeEA0a7043AC5eAb4913E',
    },
  },
};