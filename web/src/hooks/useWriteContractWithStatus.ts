import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

// Custom hook for write contract
export const useWriteContractWithStatus = () => {
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
