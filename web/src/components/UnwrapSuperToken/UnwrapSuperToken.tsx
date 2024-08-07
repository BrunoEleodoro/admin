'use client';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Button } from '@/components/ui/button';
import SuperTokenABI from '@/abis/ISuperToken.json';
import { formatEther, parseEther } from 'viem';

// Custom hook for write contract
const useWriteContractWithStatus = () => {
  const { writeContract, isPending, isSuccess, isError, error, data } = useWriteContract();

  const {
    status: transactionReceiptStatus,
    isLoading: isTransactionReceiptLoading,
    isSuccess: isTransactionReceiptSuccess,
    error: transactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash: data,
    query: {
      enabled: !!data,
    },
  });

  return {
    writeContract,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    transactionReceiptStatus,
    isTransactionReceiptLoading,
    isTransactionReceiptSuccess,
    transactionReceiptError,
  };
};

export default function UnwrapSuperToken({ tokenAddress }: { tokenAddress: string }) {
  const { address } = useAccount();
  const [amountToUnwrap, setAmountToUnwrap] = useState(0);

  const { data: superTokenBalance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: SuperTokenABI.abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const {
    writeContract: unwrap,
    isPending: isUnwrapping,
    isSuccess: isUnwrapped,
    isError: isUnwrapError,
    error: unwrapError,
    data: unwrapData,
    transactionReceiptStatus: unwrapTransactionReceiptStatus,
    isTransactionReceiptLoading: isUnwrapTransactionReceiptLoading,
    isTransactionReceiptSuccess: isUnwrapTransactionReceiptSuccess,
    transactionReceiptError: unwrapTransactionReceiptError,
  } = useWriteContractWithStatus();

  const superTokenBalanceAmount = superTokenBalance ? parseFloat(formatEther(superTokenBalance as bigint)) : 0;
  const canUnwrap = amountToUnwrap <= superTokenBalanceAmount;

  return (
    <div>
      <Input
        value={amountToUnwrap}
        onChange={(e) => setAmountToUnwrap(e.target.valueAsNumber)}
        type="number"
      />

      {isUnwrapping && <div>Unwrapping...</div>}
      {isUnwrapped && <div>Unwrapped</div>}
      {isUnwrapError && <div>{unwrapError?.message}</div>}
      {isUnwrapTransactionReceiptLoading && <div>Transaction Receipt Loading...</div>}
      {isUnwrapTransactionReceiptSuccess && <div>Transaction Receipt Success</div>}
      {unwrapTransactionReceiptError && <div>{unwrapTransactionReceiptError?.message}</div>}

      <Button
        disabled={isUnwrapping || !canUnwrap}
        onClick={(e) => {
          e.preventDefault();
          unwrap({
            account: address as `0x${string}`,
            address: tokenAddress as `0x${string}`,
            abi: SuperTokenABI.abi,
            functionName: 'downgrade',
            args: [parseEther(amountToUnwrap.toString())],
          });
        }}
      >
        Unwrap
      </Button>
    </div>
  );
}
