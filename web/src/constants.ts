import { arbitrum, avalanche, avalancheFuji, base, baseSepolia, bsc, celo, degen, foundry, gnosis, mainnet, optimism, optimismSepolia, polygon, scrollSepolia, sepolia } from 'viem/chains';

export const EXPECTED_CHAIN = baseSepolia;
export const FOUNDRY = { ...foundry, id: 84532};

export const wrappedSuperTokenFactories: Record<number, string> = {
    [mainnet.id]: '0x0422689cc4087b6B7280e0a7e7F655200ec86Ae1',
    [base.id]: '0xe20B9a38E0c96F61d1bA6b42a61512D56Fea1Eb3',
    [polygon.id]: '0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34',
    [optimism.id]: '0x8276469A443D5C6B7146BED45e2abCaD3B6adad9',
    [arbitrum.id]: '0x1C21Ead77fd45C84a4c916Db7A6635D0C6FF09D6',
    [gnosis.id]: '0x23410e2659380784498509698ed70E414D384880',
    [avalanche.id]: '0x464AADdBB2B80f3Cb666522EB7381bE610F638b4',
    [bsc.id]: '0x8bde47397301F0Cd31b9000032fD517a39c946Eb',
    [celo.id]: '',
    [degen.id]: '',
    [avalancheFuji.id]: '0xA25dbEa94C5824892006b30a629213E7Bf238624',
    [sepolia.id]: '0x254C2e152E8602839D288A7bccdf3d0974597193',
    [optimismSepolia.id]: '',
  };

  export const blockExplorers: Record<number, string> = {
    [mainnet.id]: 'https://etherscan.io',
    [base.id]: 'https://basescan.org',
    [polygon.id]: 'https://polygonscan.com',
    [optimism.id]: 'https://optimistic.etherscan.io',
    [arbitrum.id]: 'https://arbiscan.io',
    [sepolia.id]: 'https://sepolia.etherscan.io',
    [optimismSepolia.id]: 'https://sepolia.optimism.io',
    [avalancheFuji.id]: 'https://testnet.snowtrace.io',
    [bsc.id]: 'https://bscscan.com',
    [celo.id]: 'https://celoscan.io',
    [degen.id]: 'https://degen.xyz',
    [gnosis.id]: 'https://gnosisscan.io',
    [avalanche.id]: 'https://snowtrace.io',
  };

  export const GAME_FACTORY_ADDRESS = '0x4Bd0C88F8eDdF1aB15dc5526f90227164B6fC0b8';