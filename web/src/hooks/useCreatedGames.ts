import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { GAME_FACTORY_ADDRESS } from '@/constants';
import GameFactoryABI from '@/abis/GameFactory.json';

interface GameCreatedEvent {
  gameAddress: string;
  admin: string;
  lifeToken: string;
  metadata: {
    event: {
      startTime: string;
      endTime: string;
      name: string;
      duration: string;
      game: string;
      assets: {
        food1: string;
        food2: string;
        food3: string;
        bomb: string;
      };
      backgroundColor: string;
      settings: {
        tokenAddress: string;
        tokensPerSecond: number;
        maxPlayers: number;
        serverLocation: string;
      };
    };
  };
}
/*
{
    "gameAddress": "0x8B76AdCcDFD090A82C748Ae4465A8a12371dFeA2",
    "admin": "0xe7e37649f37Ed6665260316413fdfe89f8edadb6",
    "lifeToken": "0x2d43aaE4486C0F7f7AdE607A9c33cb921B0BDCA9",
    "metadata": {
        "event": {
            "startTime": "1723069800",
            "endTime": "1723077000",
            "name": "name",
            "duration": "7200",
            "game": "agario",
            "assets": {
                "food1": "",
                "food2": "",
                "food3": "",
                "bomb": ""
            },
            "backgroundColor": "#FFFFFF",
            "settings": {
                "tokenAddress": "0x2d43aaE4486C0F7f7AdE607A9c33cb921B0BDCA9",
                "tokensPerSecond": 0,
                "maxPlayers": 2,
                "serverLocation": "CN-China"
            }
        }
    }
}
*/


export function useCreatedGames() {
  const [games, setGames] = useState<GameCreatedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const publicClient = usePublicClient();

  useEffect(() => {
    async function fetchGameCreatedLogs() {
      setIsLoading(true);
      try {
        const logs = await publicClient?.getLogs({
          address: GAME_FACTORY_ADDRESS,
          event: {
            type: 'event',
            name: 'GameCreated',
            inputs: [
              { type: 'address', name: 'gameAddress', indexed: true },
              { type: 'address', name: 'admin', indexed: true },
              { type: 'address', name: 'lifeToken', indexed: false },
            ],
          },
          fromBlock: 6438562n,
          toBlock: 'latest',
        });

        const decodedLogs = logs?.map((log) => ({
          gameAddress: log.args.gameAddress as string,
          admin: log.args.admin as string,
          lifeToken: log.args.lifeToken as string,
        }));

        const gamesWithMetadata = await Promise.all(
          (decodedLogs || []).map(async (game) => {
            try {
              const response = await fetch(
                `https://gam3box.s3.amazonaws.com/${game.gameAddress}.json`,
              );
              if (response.ok) {
                const metadata = await response.json();
                return { ...game, metadata };
              }
            } catch (error) {
              console.error(`Failed to fetch metadata for game ${game.gameAddress}:`, error);
            }
            return game;
          }),
        );

        setGames(gamesWithMetadata as GameCreatedEvent[]);
      } catch (error) {
        console.error('Failed to fetch game created logs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGameCreatedLogs();
  }, [publicClient]);

  return { games, isLoading };
}
