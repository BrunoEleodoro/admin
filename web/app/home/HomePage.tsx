/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SecCB6xsG74
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <GamepadIcon className="text-primary h-6 w-6" />
          <span className="text-primary text-xl font-bold">Gam3Box</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-primary-foreground text-sm font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            Games
          </Link>
          <Link
            href="#"
            className="text-primary-foreground text-sm font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            Events
          </Link>
          <Link
            href="#"
            className="text-primary-foreground text-sm font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            Earn
          </Link>
          <Link
            href="#"
            className="text-primary-foreground text-sm font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="bg-primary w-full py-12 md:py-24 lg:py-32">
          <div className="container grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-6">
            <div className="space-y-4">
              <h1 className="text-primary-foreground text-4xl font-bold md:text-5xl">
                Unlock the Future of Gaming
              </h1>
              <p className="text-primary-foreground text-lg">
                Gam3Box is a platform that empowers you to host events, play games, and earn
                community tokens. Join the revolution in play-to-earn gaming.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="bg-primary-foreground text-primary hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Start Playing
                </Link>
                <Link
                  href="#"
                  className="border-primary-foreground bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Host an Event
                </Link>
              </div>
            </div>
            <img
              src="https://avatars.githubusercontent.com/u/176804621?s=400&u=fe7eb7184bcee8913a706c14f0e48445e9f7ed15&v=4"
              width="650"
              height="650"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-contain sm:w-full"
            />
          </div>
        </section>
        <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Game Categories
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover a wide range of games across different genres and gameplay styles.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Link
                href="#"
                className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group grid gap-1 rounded-lg p-4"
                prefetch={false}
              >
                <PuzzleIcon className="text-primary h-8 w-8" />
                <h3 className="text-lg font-bold">Puzzle</h3>
                <p className="text-muted-foreground text-sm">Test your problem-solving skills.</p>
              </Link>
              <Link
                href="#"
                className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group grid gap-1 rounded-lg p-4"
                prefetch={false}
              >
                <ArchiveIcon className="text-primary h-8 w-8" />
                <h3 className="text-lg font-bold">Arcade</h3>
                <p className="text-muted-foreground text-sm">Classic arcade-style games.</p>
              </Link>
              <Link
                href="#"
                className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group grid gap-1 rounded-lg p-4"
                prefetch={false}
              >
                <KeyIcon className="text-primary h-8 w-8" />
                <h3 className="text-lg font-bold">Strategy</h3>
                <p className="text-muted-foreground text-sm">Outsmart your opponents.</p>
              </Link>
              <Link
                href="#"
                className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group grid gap-1 rounded-lg p-4"
                prefetch={false}
              >
                <ClubIcon className="text-primary h-8 w-8" />
                <h3 className="text-lg font-bold">Sports</h3>
                <p className="text-muted-foreground text-sm">Compete in virtual sports.</p>
              </Link>
              <Link
                href="#"
                className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group grid gap-1 rounded-lg p-4"
                prefetch={false}
              >
                <ActivityIcon className="text-primary h-8 w-8" />
                <h3 className="text-lg font-bold">Adventure</h3>
                <p className="text-muted-foreground text-sm">Embark on thrilling journeys.</p>
              </Link>
              <Link
                href="#"
                className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group grid gap-1 rounded-lg p-4"
                prefetch={false}
              >
                <ServerIcon className="text-primary h-8 w-8" />
                <h3 className="text-lg font-bold">Multiplayer</h3>
                <p className="text-muted-foreground text-sm">Compete or collaborate with others.</p>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Games</h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of the most popular and engaging games on Gam3Box.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg"
                    width="300"
                    height="200"
                    alt="Game 1"
                    className="rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <h3 className="text-xl font-bold">Crypto Brawlers</h3>
                  <p className="text-muted-foreground">
                    Battle it out in this exciting crypto-themed fighting game.
                  </p>
                  <div className="flex items-center justify-between">
                    <Button variant="link">Play Now</Button>
                    <div className="text-primary flex items-center gap-1">
                      <CoinsIcon className="h-5 w-5" />
                      <span>250 GBX</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg"
                    width="300"
                    height="200"
                    alt="Game 2"
                    className="rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <h3 className="text-xl font-bold">Pixel Puzzles</h3>
                  <p className="text-muted-foreground">
                    Solve intricate pixel art puzzles and earn rewards.
                  </p>
                  <div className="flex items-center justify-between">
                    <Button variant="link">Play Now</Button>
                    <div className="text-primary flex items-center gap-1">
                      <CoinsIcon className="h-5 w-5" />
                      <span>150 GBX</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg"
                    width="300"
                    height="200"
                    alt="Game 3"
                    className="rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <h3 className="text-xl font-bold">Galactic Racer</h3>
                  <p className="text-muted-foreground">
                    Pilot your spacecraft through a futuristic racing course.
                  </p>
                  <div className="flex items-center justify-between">
                    <Button variant="link">Play Now</Button>
                    <div className="text-primary flex items-center gap-1">
                      <CoinsIcon className="h-5 w-5" />
                      <span>300 GBX</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
          <div className="container grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Join the Gam3Box Community
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up now to start playing, hosting events, and earning community tokens.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Sign Up
                </Link>
                <Link
                  href="#"
                  className="border-primary bg-muted text-primary hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Start Playing
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Community"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </section>
      </main>
      <footer className="bg-muted w-full p-6 md:py-12">
        <div className="container grid max-w-7xl grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:grid-cols-5">
          <div className="grid gap-1">
            <h3 className="text-primary font-semibold">Gam3Box</h3>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Games
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Events
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Earn
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="text-primary font-semibold">Community</h3>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Discord
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Twitter
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Reddit
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Telegram
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="text-primary font-semibold">Support</h3>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Help Center
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Contact Us
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              FAQs
            </Link>
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
              Status
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="text-primary font-semibold">Legal</h3>
            <Link href="#" className="text-primary-foreground hover:" prefetch={false} />
          </div>
        </div>
      </footer>
    </div>
  );
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function ArchiveIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function ClubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
      <path d="M12 17.66L12 22" />
    </svg>
  );
}

function CoinsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function GamepadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}

function KeyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  );
}

function PuzzleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
}

function ServerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
