import { useCallback, useEffect, useMemo, useState } from 'react';
import { TransactionExecutionError } from 'viem';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import SuperTokenABI from '@/abis/ISuperToken.json'; // Make sure to create this ABI file

export enum TransactionStates {
  START,
  COMPLETE,
  OUT_OF_GAS,
}

export default function useCreateGameFactory({
  tokenAddress,
  arguments: args,
}: {
  tokenAddress: string;
  arguments: [string]; // [admin, superToken, baseFlowRate, nativePrice, startTime, duration]
}) {
  const [newGameContract, setNewGameContract] = useState<string | null>(null);
  const [transactionState, setTransactionState] = useState<TransactionStates | null>(null);
  const { address } = useAccount();

  const {
    data: contractRequest,
    error,
    isLoading,
  } = useSimulateContract({
    account: address,
    address: tokenAddress as `0x${string}`,
    abi: SuperTokenABI.abi,
    functionName: 'approve',
    args,
  });

  const {
    writeContract,
    data: dataHash,
    status: writeContractStatus,
    error: writeContractError,
  } = useWriteContract();

  const { status: transactionReceiptStatus } = useWaitForTransactionReceipt({
    hash: dataHash,
    query: {
      enabled: !!dataHash,
    },
  });

  const disabled = writeContractStatus === 'pending';

  const onSubmitTransaction = useCallback(() => {
    const request = contractRequest?.request;
    if (request) {
      const res = writeContract(contractRequest?.request);
      if (contractRequest.result) {
        setNewGameContract(contractRequest.result);
      }
      setTransactionState(TransactionStates.START);
    } else {
      setTransactionState(null);
    }
  }, [contractRequest, writeContract, isLoading]);

  const resetContractForms = useCallback(() => {
    setTransactionState(null);
  }, []);

  useEffect(() => {
    async function onTransactionReceiptStatus() {
      if ((dataHash as string) === '') return;
      if (transactionReceiptStatus === 'error') {
        if (
          writeContractError instanceof TransactionExecutionError &&
          writeContractError.message.toLowerCase().includes('out of gas')
        ) {
          setTransactionState(TransactionStates.OUT_OF_GAS);
        } else {
          setTransactionState(null);
        }
      }
      if (transactionReceiptStatus === 'success') {
        setTransactionState(TransactionStates.COMPLETE);
      }
    }
    void onTransactionReceiptStatus();
  }, [dataHash, setTransactionState, transactionReceiptStatus, writeContractError]);

  return useMemo(
    () => ({
      disabled,
      transactionState,
      resetContractForms,
      onSubmitTransaction,
      errors: error,
      dataHash,
      transactionReceiptStatus,
      newGameContract,
      writeContract,
    }),
    [
      onSubmitTransaction,
      transactionReceiptStatus,
      transactionState,
      disabled,
      resetContractForms,
      error,
      dataHash,
      writeContract,
      newGameContract,
    ],
  );
}
