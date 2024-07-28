'use client';

import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ArrowLeftIcon, PlayIcon } from '@radix-ui/react-icons';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const BlinkingBadge = styled(Badge)`
  animation: ${blink} 2s linear infinite;
`;

export default function ListGames() {
  return (
    <div className="mx-auto w-full max-w-5xl p-6 md:p-10">
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <div className="mb-6 flex items-center justify-between mt-4">
        <h1 className="text-2xl font-bold">Available Games To Play</h1>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Players Online</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Token Rewards / second</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Galactic Showdown</TableCell>
              <TableCell>1,234</TableCell>
              <TableCell>2023-07-01</TableCell>
              <TableCell>2 hours</TableCell>
              <TableCell>0.5 GALA</TableCell>
              <TableCell>
                <BlinkingBadge variant="outline" className="bg-green-500 text-white">
                  Live
                </BlinkingBadge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <PlayIcon className="mr-2 h-4 w-4" /> Play
                  </Button>
                  <Button variant="outline" size="sm">
                    Spectate
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Cosmic Clash</TableCell>
              <TableCell>789</TableCell>
              <TableCell>2023-06-15</TableCell>
              <TableCell>1 hour</TableCell>
              <TableCell>0.3 GALA</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-500 text-white">
                  Upcoming
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Spectate
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Stellar Showdown</TableCell>
              <TableCell>456</TableCell>
              <TableCell>2023-05-30</TableCell>
              <TableCell>3 hours</TableCell>
              <TableCell>0.8 GALA</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-500 text-white">
                  Ended
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" disabled>
                  Spectate
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Nebula Brawl</TableCell>
              <TableCell>2,345</TableCell>
              <TableCell>2023-08-01</TableCell>
              <TableCell>4 hours</TableCell>
              <TableCell>1.0 GALA</TableCell>
              <TableCell>
                <BlinkingBadge variant="outline" className="bg-green-500 text-white">
                  Live
                </BlinkingBadge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <PlayIcon className="mr-2 h-4 w-4" /> Play
                  </Button>
                  <Button variant="outline" size="sm">
                    Spectate
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
