'use client';
import { Input } from '@/components/ui/input';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useChainId } from 'wagmi';
import useCreateERC20Wrapper, { TransactionStates } from '@/hooks/useCreateERC20Wrapper';
import Button from '@/components/Button/Button';
import { blockExplorers } from '@/constants';

const ERC20WrapperTokenForm = () => {
  const [form, setForm] = useState<{
    name: string;
    symbol: string;
  }>({
    name: '',
    symbol: '',
  });
  const [erc20Address, setErc20Address] = useState('');
  const chainId = useChainId();
  const { address, isConnected } = useAccount();

  const {
    transactionState: erc20WrapperState,
    deploySupertoken: deployERC20Wrapper,
    disabled: erc20WrapperDisabled,
    errors: erc20WrapperErrors,
    supertoken,
    dataHash: erc20WrapperDataHash,
  } = useCreateERC20Wrapper({
    erc20Address,
    name: form.name,
    symbol: form.symbol,
    chainId,
  });

  const isPending = erc20WrapperState === TransactionStates.START;
  const isRejected = erc20WrapperState === TransactionStates.REJECTED;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    deployERC20Wrapper();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative z-20 flex w-full flex-col items-center gap-4 p-6"
      >
        <div className="w-full">
          <label
            htmlFor="erc20Address"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            ERC20 Token Address
          </label>
          <Input
            type="text"
            id="erc20Address"
            name="erc20Address"
            placeholder="Enter ERC20 Token Address"
            className="h-[2.5rem] w-full rounded-xl"
            value={erc20Address}
            onChange={(e) => setErc20Address(e.target.value)}
            disabled={erc20WrapperDisabled}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Token Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Token Name"
            className="h-[2.5rem] w-full rounded-xl"
            value={form.name}
            onChange={handleChange}
            disabled={erc20WrapperDisabled}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="symbol"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Token Symbol
          </label>
          <Input
            type="text"
            id="symbol"
            name="symbol"
            placeholder="Enter Token Symbol"
            className="h-[2.5rem] w-full rounded-xl"
            value={form.symbol}
            onChange={handleChange}
            disabled={erc20WrapperDisabled}
          />
        </div>
        {erc20WrapperErrors ? (
          <div className="text-red-500">
            <p>Error: {erc20WrapperErrors.message}</p>
          </div>
        ) : supertoken ? (
          <div className="text-green-500">
            <p>Token Found: {supertoken}</p>
          </div>
        ) : null}
        <Button
          buttonContent={isPending ? 'Loading...' : 'Deploy Wrapped Token'}
          className="flex items-center space-x-2 rounded-md border-2 border-gray-300 bg-white text-black hover:bg-gray-300 dark:bg-black dark:text-white"
          disabled={erc20WrapperDisabled}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        />
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-xl bg-white p-4">
              <p>Transaction Pending...</p>
            </div>
          </div>
        )}
        {erc20WrapperDataHash && (
          <div className="text-center text-green-500">
            <p>
              Transaction Hash: {erc20WrapperDataHash.substring(0, 10)}...
              {erc20WrapperDataHash.substring(erc20WrapperDataHash.length - 10)}
              <br />
              <a
                href={`${blockExplorers[chainId]}/tx/${erc20WrapperDataHash}`}
                className="underline text-center"
                target="_blank"
              >
                View on Explorer
              </a>
            </p>
          </div>
        )}
      </form>
    </>
  );
};

export default ERC20WrapperTokenForm;
