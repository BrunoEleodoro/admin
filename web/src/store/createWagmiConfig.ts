import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
  const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');
  return createConfig(
    getDefaultConfig({
      appName: 'Gam3Box',
      chains: [baseSepolia, base],
      walletConnectProjectId: projectId || '',
      coinbaseWalletPreference: 'smartWalletOnly',
      ssr: true
    }),
  );
  // return createConfig({
  //   chains: [baseSepolia],
  //   connectors: [
  //     coinbaseWallet({
  //       appName: 'Gam3Box',
  //       preference: 'smartWalletOnly',
  //     }),

  //   ],
  //   ssr: true,
  //   transports: {
  //     [baseSepolia.id]: http(baseSepoliaUrl),
  //     [base.id]: http(baseUrl),
  //   },
  // });
}
