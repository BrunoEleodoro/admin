'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import useCreateGameFactory from '@/hooks/useCreateGameFactory';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { formatEther, parseEther, parseUnits } from 'viem';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ERC20WrapperTokenForm from '@/components/ERC20WrapperTokenForm/ERC20WrapperTokenForm';
import WrapSuperToken from '@/components/WrapSuperToken/WrapSuperToken';
import ISuperToken from '@/abis/ISuperToken.json';
import UnwrapSuperToken from '@/components/UnwrapSuperToken/UnwrapSuperToken';
import { useWriteContractWithStatus } from '@/hooks/useWriteContractWithStatus';
import { GAME_FACTORY_ADDRESS } from '@/constants';
// chainlink faucet sepolia: 0x779877A7B0D9E8603169DdbD7836e478b4624789
// Convert date and time to Unix timestamp
function dateToTimestamp(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 0;
  }
  const timestamp = Math.floor(date.getTime() / 1000);
  return timestamp;
}

function timestampToDate(timestamp: number) {
  return new Date(timestamp * 1000).toISOString().split('T')[0];
}

const schema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  duration: z.number().min(1, 'Duration must be at least 1 hour'),
  game: z.string().min(1, 'Game selection is required'),
  tokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid token address'),
  tokensPerSecond: z.string().min(1, 'Tokens per second is required'),
  maxPlayers: z.string().min(1, 'Max players is required'),
  serverLocation: z.string().min(1, 'Server location is required'),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
  hasSuperToken: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function Component() {
  const { address: adminAddress } = useAccount();
  const [food1Image, setFood1Image] = useState('');
  const [food2Image, setFood2Image] = useState('');
  const [food3Image, setFood3Image] = useState('');
  const [bombImage, setBombImage] = useState('');
  const [fileCreated, setFileCreated] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      eventName: '',
      startDate: '',
      startTime: '',
      duration: 1,
      game: '',
      tokenAddress: '',
      tokensPerSecond: '0',
      maxPlayers: '0',
      serverLocation: '',
      backgroundColor: '#FFFFFF',
      hasSuperToken: true,
    },
  });

  const hasSuperToken = watch('hasSuperToken');
  const [tokenAddress, tokensPerSecond, maxPlayers, duration, startDate, startTime] = watch([
    'tokenAddress',
    'tokensPerSecond',
    'maxPlayers',
    'duration',
    'startDate',
    'startTime',
  ]);

  const tokenAmountNeeded =
    maxPlayers && tokensPerSecond && duration
      ? parseFloat(maxPlayers) * parseFloat(tokensPerSecond) * duration
      : 0;
  const formattedStartTime = startDate + 'T' + startTime;
  const formattedDuration = (duration * 60 * 60).toString();
  const startTimeTimestamp = dateToTimestamp(formattedStartTime);

  const superTokenBalance = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ISuperToken.abi,
    functionName: 'balanceOf',
    args: [adminAddress as `0x${string}`],
  });

  const tokensAvailable = superTokenBalance?.data;

  const {
    disabled,
    transactionState,
    resetContractForms,
    onSubmitTransaction: createGame,
    dataHash,
    transactionReceiptStatus,
    newGameContract,
  } = useCreateGameFactory({
    /*
        address admin,
        address superToken,
        int96 baseFlowRate,
        uint256 nativePrice,
        uint256 superTokenAmount,
        uint256 startTime,
        uint256 duration
    */
    arguments: [
      adminAddress as `0x${string}`,
      tokenAddress,
      parseEther(tokensPerSecond.toString()).toString(),
      '10000000000',
      parseEther(tokenAmountNeeded.toString()).toString(),
      startTimeTimestamp.toString(),
      formattedDuration,
    ],
  });

  const {
    writeContract: approve,
    isPending: isApproving,
    isSuccess: isApproved,
    isError,
    error: approveError,
    data: approveData,
    transactionReceiptStatus: approveTransactionReceiptStatus,
    isTransactionReceiptLoading: isApproveTransactionReceiptLoading,
    isTransactionReceiptSuccess: isApproveTransactionReceiptSuccess,
    transactionReceiptError: approveTransactionReceiptError,
  } = useWriteContractWithStatus();

  // console.log(
  //   'CREATE GAME',
  //   [
  //     adminAddress as `0x${string}`,
  //     tokenAddress,
  //     tokensPerSecond,
  //     '0',
  //     parseEther(tokenAmountNeeded.toString()).toString(), // superTokenAmount will be calculated in onSubmit
  //     startTimeTimestamp.toString(), // startTime will be calculated in onSubmit
  //     formattedDuration, // duration will be calculated in onSubmit
  //   ],
  //   { transactionState, transactionReceiptStatus, errors: errors, dataHash },
  // );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/convert-base64', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImage(data.base64);
        } else {
          console.error('Failed to convert image to base64');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    const startTimeTimestamp = dateToTimestamp(`${data.startDate}T${data.startTime}`);
    const durationCompiled = (data.duration * 60 * 60).toString();
    const endTime = startTimeTimestamp + parseInt(durationCompiled);

    const event = {
      name: data.eventName,
      startTime: startTimeTimestamp.toString(),
      duration: durationCompiled,
      endTime: endTime.toString(),
      game: data.game,
      assets: {
        food1: food1Image,
        food2: food2Image,
        food3: food3Image,
        bomb: bombImage,
      },
      backgroundColor: data.backgroundColor,
      settings: {
        tokenAddress: data.tokenAddress,
        tokensPerSecond: parseFloat(data.tokensPerSecond),
        maxPlayers: parseInt(data.maxPlayers),
        serverLocation: data.serverLocation,
      },
    };

    try {
      const response = await fetch('/api/create-game-config-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          contractAddress: newGameContract,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Config file created:', responseData);
        setFileCreated(true);
        // Handle success (e.g., show a success message, redirect, etc.)
      } else {
        console.error('Failed to create config file');
        setFileCreated(false);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFileCreated(false);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="mx-auto w-2/3 p-6 sm:p-8 md:p-10 lg:p-12">
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <br />
      <br />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg border bg-background p-6 sm:p-8 md:p-10 lg:p-12"
      >
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <Controller
                name="eventName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter event name"
                    className="w-full text-2xl font-bold"
                  />
                )}
              />
            </h1>
          </div>
          {errors.eventName && <p className="text-red-500">{errors.eventName.message}</p>}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <label>Start Date</label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full rounded-md border-2 border-gray-300 p-2"
                  />
                )}
              />
              {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
            </div>
            <div className="flex flex-col">
              <label>Start Time</label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="time"
                    className="w-full rounded-md border-2 border-gray-300 p-2"
                  />
                )}
              />
              {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
            </div>
          </div>

          <label>Duration</label>
          <div className="flex items-center gap-2 pl-2">
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <>
                  <button
                    type="button"
                    onClick={() => field.onChange(1)}
                    className={`rounded-md px-3 py-1 text-sm font-medium ${
                      field.value === 1
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    1 hour
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange(2)}
                    className={`rounded-md px-3 py-1 text-sm font-medium ${
                      field.value === 2
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    2 hours
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange(3)}
                    className={`rounded-md px-3 py-1 text-sm font-medium ${
                      field.value === 3
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    3 hours
                  </button>
                </>
              )}
            />
          </div>
          {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="game" className="block text-sm font-medium text-muted-foreground">
                Game Selection
              </label>
              <Controller
                name="game"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Agario fork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agario">Agario fork</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.game && <p className="text-red-500">{errors.game.message}</p>}
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div>
            <h2 className="mb-4 text-lg font-bold">Settings</h2>
            <div className="grid gap-4">
              <div>
                <Controller
                  name="hasSuperToken"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasSuperToken"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mr-2"
                      />
                      <label
                        htmlFor="hasSuperToken"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        I already have a Super Token from Superfluid
                      </label>
                    </div>
                  )}
                />
              </div>
              {hasSuperToken ? (
                <div>
                  <label
                    htmlFor="token-address"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Super Token Address
                  </label>
                  <Controller
                    name="tokenAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="token-address"
                        type="text"
                        placeholder="0x..."
                        className="mt-1 w-full"
                      />
                    )}
                  />
                  {errors.tokenAddress && (
                    <p className="text-red-500">{errors.tokenAddress.message}</p>
                  )}
                </div>
              ) : (
                <div className="flex rounded-md border-2 border-gray-300">
                  <ERC20WrapperTokenForm />
                </div>
              )}
              <p className="text-sm font-medium text-muted-foreground">Super Token Actions</p>
              <div className="flex items-center gap-4 rounded-md border-2 border-gray-300 p-4">
                <WrapSuperToken tokenAddress={tokenAddress} />
                <UnwrapSuperToken tokenAddress={tokenAddress} />
              </div>
              <div>
                <label
                  htmlFor="tokens-per-second"
                  className="block text-sm font-medium text-muted-foreground"
                >
                  Tokens per second
                </label>
                <Controller
                  name="tokensPerSecond"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="tokens-per-second"
                      type="number"
                      min="0"
                      step="0.00001"
                      className="mt-1 w-full"
                    />
                  )}
                />
                {errors.tokensPerSecond && (
                  <p className="text-red-500">{errors.tokensPerSecond.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="max-players"
                  className="block text-sm font-medium text-muted-foreground"
                >
                  Max Players
                </label>
                <Controller
                  name="maxPlayers"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="max-players"
                      type="number"
                      min="0"
                      step="1"
                      className="mt-1 w-full"
                    />
                  )}
                />
                {errors.maxPlayers && <p className="text-red-500">{errors.maxPlayers.message}</p>}
              </div>

              {tokenAmountNeeded && (
                <p className="text-center text-sm text-muted-foreground">
                  {tokenAmountNeeded} tokens needed
                </p>
              )}
              {superTokenBalance && (
                <p className="text-center text-sm text-muted-foreground">
                  {typeof tokensAvailable === 'bigint' && formatEther(tokensAvailable)} tokens
                  available
                </p>
              )}

              <div>
                <label
                  htmlFor="server-location"
                  className="block text-sm font-medium text-muted-foreground"
                >
                  Server Location
                </label>
                <Controller
                  name="serverLocation"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BR-Brazil">BR-Brazil</SelectItem>
                        <SelectItem value="CN-China">CN-China</SelectItem>
                        <SelectItem value="EU-London">EU-London</SelectItem>
                        <SelectItem value="JP-Tokyo">JP-Tokyo</SelectItem>
                        <SelectItem value="RU-Russia">RU-Russia</SelectItem>
                        <SelectItem value="SG-Singapore">SG-Singapore</SelectItem>
                        <SelectItem value="TK-Turkey">TK-Turkey</SelectItem>
                        <SelectItem value="US-Atlanta">US-Atlanta</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-bold">Assets</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="food1" className="block text-sm font-medium text-muted-foreground">
                  Food1
                </label>
                <input
                  type="file"
                  id="food1"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setFood1Image)}
                  className="hidden"
                />
                <label htmlFor="food1">
                  <img
                    src={
                      food1Image ? `data:image/png;base64,${food1Image}` : 'placeholder-image-url'
                    }
                    width={100}
                    height={100}
                    alt="Food1"
                    className="cursor-pointer rounded-md"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="food2" className="block text-sm font-medium text-muted-foreground">
                  Food2
                </label>
                <input
                  type="file"
                  id="food2"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setFood2Image)}
                  className="hidden"
                />
                <label htmlFor="food2">
                  <img
                    src={
                      food2Image ? `data:image/png;base64,${food2Image}` : 'placeholder-image-url'
                    }
                    width={100}
                    height={100}
                    alt="Food2"
                    className="cursor-pointer rounded-md"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="food3" className="block text-sm font-medium text-muted-foreground">
                  Food3
                </label>
                <input
                  type="file"
                  id="food3"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setFood3Image)}
                  className="hidden"
                />
                <label htmlFor="food3">
                  <img
                    src={
                      food3Image ? `data:image/png;base64,${food3Image}` : 'placeholder-image-url'
                    }
                    width={100}
                    height={100}
                    alt="Food3"
                    className="cursor-pointer rounded-md"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="bomb" className="block text-sm font-medium text-muted-foreground">
                  Bomb
                </label>
                <input
                  type="file"
                  id="bomb"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setBombImage)}
                  className="hidden"
                />
                <label htmlFor="bomb">
                  <img
                    src={bombImage ? `data:image/png;base64,${bombImage}` : 'placeholder-image-url'}
                    width={100}
                    height={100}
                    alt="Bomb"
                    className="cursor-pointer rounded-md"
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="background"
                className="block text-sm font-medium text-muted-foreground"
              >
                Background Color
              </label>
              <div className="mt-1">
                <input
                  type="color"
                  id="background"
                  className="h-10 w-full cursor-pointer rounded-md"
                  // value={backgroundColor}
                  // onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </div>
              <div className="mt-1" />
              {newGameContract && (
                <div className="text-sm text-muted-foreground">{newGameContract}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="rounded-md px-6 py-2">
            Create Event
          </Button>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            className="rounded-md px-6 py-2"
            onClick={(e) => {
              e.preventDefault();
              approve({
                address: tokenAddress as `0x${string}`,
                abi: ISuperToken.abi,
                functionName: 'approve',
                args: [GAME_FACTORY_ADDRESS, parseEther('1000000000000000000000000')],
              });
            }}
          >
            Approve Super Token for event creation
          </Button>
          <Button
            className="rounded-md px-6 py-2"
            onClick={(e) => {
              e.preventDefault();
              createGame();
            }}
          >
            Create Game
          </Button>
        </div>
      </form>
    </div>
  );
}
