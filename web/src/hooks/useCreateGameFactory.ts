import { useCallback, useEffect, useMemo, useState } from 'react';
import { TransactionExecutionError } from 'viem';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import GameFactoryABI from '@/abis/GameFactory.json'; // Make sure to create this ABI file
import { GAME_FACTORY_ADDRESS } from '@/constants';

export enum TransactionStates {
  START,
  COMPLETE,
  OUT_OF_GAS,
}

export default function useCreateGameFactory({
  arguments: args,
}: {
  arguments: [string, string, string, string, string, string, string]; // [admin, superToken, baseFlowRate, nativePrice, startTime, duration]
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
    address: GAME_FACTORY_ADDRESS,
    abi: GameFactoryABI.abi,
    functionName: 'createGame',
    args,
  });

  console.log('contractRequest', contractRequest, error, args);

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
    console.log('onSubmitTransaction', contractRequest);
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
