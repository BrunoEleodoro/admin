'use client';
import { Input } from '@/components/ui/input';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectKitButton } from 'connectkit';
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import useCreateERC20Wrapper, { TransactionStates } from '@/hooks/useCreateERC20Wrapper';
import { Button } from '@/components/ui/button';
import { blockExplorers } from '@/constants';
import SuperTokenABI from '@/abis/ISuperToken.json';
import { formatEther, parseEther } from 'viem';
import { useWriteContractWithStatus } from '@/hooks/useWriteContractWithStatus';

export default function WrapSuperToken({ tokenAddress }: { tokenAddress: string }) {
  const { address } = useAccount();
  const [amountToWrap, setAmountToWrap] = useState(0);
  const { data: underlyingTokenAddress } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: SuperTokenABI.abi,
    functionName: 'getUnderlyingToken',
  });
  const { data: allowance } = useReadContract({
    address: underlyingTokenAddress as `0x${string}`,
    abi: SuperTokenABI.abi,
    functionName: 'allowance',
    args: [address as `0x${string}`, tokenAddress as `0x${string}`],
    query: {
      refetchInterval: 10000,
    },
  });

  const {
    writeContract: approve,
    isPending: isApproving,
    isSuccess: isApproved,
    isError,
    error: approveError,
    data: approveData,
    transactionReceiptStatus,
    isTransactionReceiptLoading,
    isTransactionReceiptSuccess,
    transactionReceiptError,
  } = useWriteContractWithStatus();

  const {
    writeContract: wrap,
    isPending: isWrapping,
    isSuccess: isWrapped,
    isError: isWrapError,
    error: wrapError,
    data: wrapData,
    transactionReceiptStatus: wrapTransactionReceiptStatus,
    isTransactionReceiptLoading: isWrapTransactionReceiptLoading,
    isTransactionReceiptSuccess: isWrapTransactionReceiptSuccess,
    transactionReceiptError: wrapTransactionReceiptError,
  } = useWriteContractWithStatus();

  const allowanceAmount = allowance ? parseFloat(formatEther(allowance as bigint)) : 0;
  const shouldApprove = allowanceAmount < amountToWrap;

  return (
    <div>
      <Input
        value={amountToWrap}
        onChange={(e) => setAmountToWrap(e.target.valueAsNumber)}
        type="number"
      />
      {shouldApprove && (
        <Button
          disabled={isApproving}
          onClick={(e) => {
            e.preventDefault();
            approve({
              account: address as `0x${string}`,
              address: underlyingTokenAddress as `0x${string}`,
              abi: SuperTokenABI.abi,
              functionName: 'approve',
              args: [tokenAddress as `0x${string}`, parseEther(amountToWrap.toString())],
            });
          }}
        >
          {isApproving ? 'Approving...' : 'Approve'}
        </Button>
      )}
      {isError && <div>{approveError?.message}</div>}
      {isApproved && <div>Approved</div>}
      {isTransactionReceiptLoading && <div>Transaction Receipt Loading...</div>}
      {isTransactionReceiptSuccess && <div>Transaction Receipt Success</div>}
      {transactionReceiptError && <div>{transactionReceiptError?.message}</div>}

      {isWrapping && <div>Wrapping...</div>}
      {isWrapped && <div>Wrapped</div>}
      {isWrapError && <div>{wrapError?.message}</div>}
      {isWrapTransactionReceiptLoading && <div>Transaction Receipt Loading...</div>}
      {isWrapTransactionReceiptSuccess && <div>Transaction Receipt Success</div>}
      {wrapTransactionReceiptError && <div>{wrapTransactionReceiptError?.message}</div>}

      <Button
        disabled={isWrapping}
        onClick={(e) => {
          e.preventDefault();
          wrap({
            account: address as `0x${string}`,
            address: tokenAddress as `0x${string}`,
            abi: SuperTokenABI.abi,
            functionName: 'upgrade',
            args: [parseEther(amountToWrap.toString())],
          });
        }}
      >
        Wrap
      </Button>
    </div>
  );
}
