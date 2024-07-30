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

export default function Component() {
  const [food1Image, setFood1Image] = useState('');
  const [food2Image, setFood2Image] = useState('');
  const [food3Image, setFood3Image] = useState('');
  const [bombImage, setBombImage] = useState('');
  const [eventName, setEventName] = useState('');
  const [duration, setDuration] = useState('1 hour');
  const [game, setGame] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokensPerSecond, setTokensPerSecond] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [serverLocation, setServerLocation] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const event = {
      name: eventName,
      duration: duration,
      game: game,
      assets: {
        food1: food1Image,
        food2: food2Image,
        food3: food3Image,
        bomb: bombImage,
      },
      backgroundColor: backgroundColor,
      settings: {
        tokenAddress: tokenAddress,
        tokensPerSecond: parseFloat(tokensPerSecond),
        maxPlayers: parseInt(maxPlayers),
        serverLocation: serverLocation,
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
          // TODO: change this once we deploy the contract using this interface
          contractAddress: '0x1234567890123456789012345678901234567890',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Config file created:', data);
        // Handle success (e.g., show a success message, redirect, etc.)
      } else {
        console.error('Failed to create config file');
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
        onSubmit={handleSubmit}
        className="space-y-8 rounded-lg border bg-background p-6 sm:p-8 md:p-10 lg:p-12"
      >
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <Input
                type="text"
                placeholder="Enter event name"
                className="w-full text-2xl font-bold"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </h1>
            <div className="flex items-center gap-2 pl-2">
              <button
                type="button"
                onClick={() => setDuration('1 hour')}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  duration === '1 hour'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              >
                1 hour
              </button>
              <button
                type="button"
                onClick={() => setDuration('2 hours')}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  duration === '2 hours'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              >
                2 hours
              </button>
              <button
                type="button"
                onClick={() => setDuration('3 hours')}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  duration === '3 hours'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              >
                3 hours
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="game" className="block text-sm font-medium text-muted-foreground">
                Game Selection
              </label>
              <Select onValueChange={(value) => setGame(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Agario fork" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agario">Agario fork</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
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
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </div>
              <div className="mt-1" />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-bold">Settings</h2>
            <div className="grid gap-4">
              <div>
                <label
                  htmlFor="token-address"
                  className="block text-sm font-medium text-muted-foreground"
                >
                  Token Address
                </label>
                <Input
                  id="token-address"
                  type="text"
                  placeholder="0x..."
                  className="mt-1 w-full"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="tokens-per-second"
                  className="block text-sm font-medium text-muted-foreground"
                >
                  Tokens per second
                </label>
                <Input
                  id="tokens-per-second"
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 w-full"
                  value={tokensPerSecond}
                  onChange={(e) => setTokensPerSecond(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="max-players"
                  className="block text-sm font-medium text-muted-foreground"
                >
                  Max Players
                </label>
                <Input
                  id="max-players"
                  type="number"
                  min="0"
                  step="1"
                  className="mt-1 w-full"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="server-location"
                  className="block text-sm font-medium text-muted-foreground"
                >
                  Server Location
                </label>
                <Select onValueChange={(value) => setServerLocation(value)}>
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
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="rounded-md px-6 py-2">
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
}
