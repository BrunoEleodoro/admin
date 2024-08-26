// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@radix-ui/react-select';
// import { Input } from 'postcss';
// import { Controller } from 'react-hook-form';
// import { formatEther } from 'viem';
// import ERC20WrapperTokenForm from '../ERC20WrapperTokenForm/ERC20WrapperTokenForm';
// import { Button } from '../ui/button';
// import UnwrapSuperToken from '../UnwrapSuperToken/UnwrapSuperToken';
// import WrapSuperToken from '../WrapSuperToken/WrapSuperToken';

// export default function CreateGameForm({
//     handleSubmit,
//     onSubmit,
//     control,
//     errors,
//     tokenAddress,
//     handleImageUpload,
//     setBackgroundColor,
//     backgroundColor,
//     hasSuperToken,
//     superTokenBalance,
//     tokensAvailable,
//     tokenAmountNeeded,
//     newGameContract,
//     shouldApprove,
// }) {
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 rounded-lg border bg-background p-6 sm:p-8 md:p-10 lg:p-12"
//     >
//       <div className="grid gap-4">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold">
//             <Controller
//               name="eventName"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   type="text"
//                   placeholder="Enter event name"
//                   className="w-full text-2xl font-bold"
//                 />
//               )}
//             />
//           </h1>
//         </div>
//         {errors.eventName && <p className="text-red-500">{errors.eventName.message}</p>}
//         <div className="flex items-center gap-4">
//           <div className="flex flex-col">
//             <label>Start Date</label>
//             <Controller
//               name="startDate"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="date"
//                   className="w-full rounded-md border-2 border-gray-300 p-2"
//                 />
//               )}
//             />
//             {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
//           </div>
//           <div className="flex flex-col">
//             <label>Start Time</label>
//             <Controller
//               name="startTime"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="time"
//                   className="w-full rounded-md border-2 border-gray-300 p-2"
//                 />
//               )}
//             />
//             {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
//           </div>
//         </div>

//         <label>Duration</label>
//         <div className="flex items-center gap-2 pl-2">
//           <Controller
//             name="duration"
//             control={control}
//             render={({ field }) => (
//               <>
//                 <button
//                   type="button"
//                   onClick={() => field.onChange(1)}
//                   className={`rounded-md px-3 py-1 text-sm font-medium ${
//                     field.value === 1
//                       ? 'bg-primary text-primary-foreground'
//                       : 'bg-secondary text-secondary-foreground'
//                   } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
//                 >
//                   1 hour
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => field.onChange(2)}
//                   className={`rounded-md px-3 py-1 text-sm font-medium ${
//                     field.value === 2
//                       ? 'bg-primary text-primary-foreground'
//                       : 'bg-secondary text-secondary-foreground'
//                   } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
//                 >
//                   2 hours
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => field.onChange(3)}
//                   className={`rounded-md px-3 py-1 text-sm font-medium ${
//                     field.value === 3
//                       ? 'bg-primary text-primary-foreground'
//                       : 'bg-secondary text-secondary-foreground'
//                   } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
//                 >
//                   3 hours
//                 </button>
//               </>
//             )}
//           />
//         </div>
//         {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <label htmlFor="game" className="block text-sm font-medium text-muted-foreground">
//               Game Selection
//             </label>
//             <Controller
//               name="game"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Agario fork" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="agario">Agario fork</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.game && <p className="text-red-500">{errors.game.message}</p>}
//           </div>
//         </div>
//       </div>
//       <div className="grid gap-6">
//         <div>
//           <h2 className="mb-4 text-lg font-bold">Settings</h2>
//           <div className="grid gap-4">
//             <div>
//               <Controller
//                 name="hasSuperToken"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id="hasSuperToken"
//                       checked={field.value}
//                       onChange={(e) => field.onChange(e.target.checked)}
//                       className="mr-2"
//                     />
//                     <label
//                       htmlFor="hasSuperToken"
//                       className="text-sm font-medium text-muted-foreground"
//                     >
//                       I already have a Super Token from Superfluid
//                     </label>
//                   </div>
//                 )}
//               />
//             </div>
//             {hasSuperToken ? (
//               <div>
//                 <label
//                   htmlFor="token-address"
//                   className="block text-sm font-medium text-muted-foreground"
//                 >
//                   Super Token Address
//                 </label>
//                 <Controller
//                   name="tokenAddress"
//                   control={control}
//                   render={({ field }) => (
//                     <Input
//                       {...field}
//                       id="token-address"
//                       type="text"
//                       placeholder="0x..."
//                       className="mt-1 w-full"
//                     />
//                   )}
//                 />
//                 {errors.tokenAddress && (
//                   <p className="text-red-500">{errors.tokenAddress.message}</p>
//                 )}
//               </div>
//             ) : (
//               <div className="flex rounded-md border-2 border-gray-300">
//                 <ERC20WrapperTokenForm />
//               </div>
//             )}
//             <p className="text-sm font-medium text-muted-foreground">Super Token Actions</p>
//             <div className="flex items-center gap-4 rounded-md border-2 border-gray-300 p-4">
//               <WrapSuperToken tokenAddress={tokenAddress} />
//               <UnwrapSuperToken tokenAddress={tokenAddress} />
//             </div>
//             <div>
//               <label
//                 htmlFor="tokens-per-second"
//                 className="block text-sm font-medium text-muted-foreground"
//               >
//                 Tokens per second
//               </label>
//               <Controller
//                 name="tokensPerSecond"
//                 control={control}
//                 render={({ field }) => (
//                   <Input
//                     {...field}
//                     id="tokens-per-second"
//                     type="number"
//                     min="0"
//                     step="0.00001"
//                     className="mt-1 w-full"
//                   />
//                 )}
//               />
//               {errors.tokensPerSecond && (
//                 <p className="text-red-500">{errors.tokensPerSecond.message}</p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor="max-players"
//                 className="block text-sm font-medium text-muted-foreground"
//               >
//                 Max Players
//               </label>
//               <Controller
//                 name="maxPlayers"
//                 control={control}
//                 render={({ field }) => (
//                   <Input
//                     {...field}
//                     id="max-players"
//                     type="number"
//                     min="0"
//                     step="1"
//                     className="mt-1 w-full"
//                   />
//                 )}
//               />
//               {errors.maxPlayers && <p className="text-red-500">{errors.maxPlayers.message}</p>}
//             </div>

//             {tokenAmountNeeded && (
//               <p className="text-center text-sm text-muted-foreground">
//                 {tokenAmountNeeded} tokens needed
//               </p>
//             )}
//             {superTokenBalance && (
//               <p className="text-center text-sm text-muted-foreground">
//                 {typeof tokensAvailable === 'bigint' && formatEther(tokensAvailable)} tokens
//                 available
//               </p>
//             )}

//             <div>
//               <label
//                 htmlFor="server-location"
//                 className="block text-sm font-medium text-muted-foreground"
//               >
//                 Server Location
//               </label>
//               <Controller
//                 name="serverLocation"
//                 control={control}
//                 render={({ field }) => (
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a location" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="BR-Brazil">BR-Brazil</SelectItem>
//                       <SelectItem value="CN-China">CN-China</SelectItem>
//                       <SelectItem value="EU-London">EU-London</SelectItem>
//                       <SelectItem value="JP-Tokyo">JP-Tokyo</SelectItem>
//                       <SelectItem value="RU-Russia">RU-Russia</SelectItem>
//                       <SelectItem value="SG-Singapore">SG-Singapore</SelectItem>
//                       <SelectItem value="TK-Turkey">TK-Turkey</SelectItem>
//                       <SelectItem value="US-Atlanta">US-Atlanta</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>
//           </div>
//         </div>
//         <div>
//           <h2 className="mb-4 text-lg font-bold">Assets</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="food1" className="block text-sm font-medium text-muted-foreground">
//                 Food1
//               </label>
//               <input
//                 type="file"
//                 id="food1"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, setFood1Image)}
//                 className="hidden"
//               />
//               <label htmlFor="food1">
//                 <img
//                   src={food1Image ? `data:image/png;base64,${food1Image}` : 'placeholder-image-url'}
//                   width={100}
//                   height={100}
//                   alt="Food1"
//                   className="cursor-pointer rounded-md"
//                 />
//               </label>
//             </div>
//             <div>
//               <label htmlFor="food2" className="block text-sm font-medium text-muted-foreground">
//                 Food2
//               </label>
//               <input
//                 type="file"
//                 id="food2"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, setFood2Image)}
//                 className="hidden"
//               />
//               <label htmlFor="food2">
//                 <img
//                   src={food2Image ? `data:image/png;base64,${food2Image}` : 'placeholder-image-url'}
//                   width={100}
//                   height={100}
//                   alt="Food2"
//                   className="cursor-pointer rounded-md"
//                 />
//               </label>
//             </div>
//             <div>
//               <label htmlFor="food3" className="block text-sm font-medium text-muted-foreground">
//                 Food3
//               </label>
//               <input
//                 type="file"
//                 id="food3"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, setFood3Image)}
//                 className="hidden"
//               />
//               <label htmlFor="food3">
//                 <img
//                   src={food3Image ? `data:image/png;base64,${food3Image}` : 'placeholder-image-url'}
//                   width={100}
//                   height={100}
//                   alt="Food3"
//                   className="cursor-pointer rounded-md"
//                 />
//               </label>
//             </div>
//             <div>
//               <label htmlFor="bomb" className="block text-sm font-medium text-muted-foreground">
//                 Bomb
//               </label>
//               <input
//                 type="file"
//                 id="bomb"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, setBombImage)}
//                 className="hidden"
//               />
//               <label htmlFor="bomb">
//                 <img
//                   src={bombImage ? `data:image/png;base64,${bombImage}` : 'placeholder-image-url'}
//                   width={100}
//                   height={100}
//                   alt="Bomb"
//                   className="cursor-pointer rounded-md"
//                 />
//               </label>
//             </div>
//           </div>
//           <div className="mt-4">
//             <label htmlFor="background" className="block text-sm font-medium text-muted-foreground">
//               Background Color
//             </label>
//             <div className="mt-1">
//               <Controller
//                 name="backgroundColor"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     type="color"
//                     id="background"
//                     className="h-10 w-full cursor-pointer rounded-md"
//                     {...field}
//                     // value={backgroundColor}
//                     // onChange={(e) => setBackgroundColor(e.target.value)}
//                   />
//                 )}
//               />
//             </div>
//             <div className="mt-1" />
//             {newGameContract && (
//               <div className="text-sm text-muted-foreground">{newGameContract}</div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <Button type="submit" className="rounded-md px-6 py-2">
//           Create Event
//         </Button>
//       </div>
//       <div className="flex justify-end gap-4">
//         {shouldApprove && (
//           <Button
//             className="rounded-md px-6 py-2"
//             onClick={(e) => {
//               e.preventDefault();
//               // approve({
//               //   address: tokenAddress as `0x${string}`,
//               //   abi: ISuperToken.abi,
//               //   functionName: 'approve',
//               //   args: [GAME_FACTORY_ADDRESS, parseEther('1000000000000000000000000')],
//               // });
//             }}
//           >
//             Approve Super Token for event creation
//           </Button>
//         )}
//         <Button
//           className="rounded-md px-6 py-2"
//           onClick={(e) => {
//             e.preventDefault();
//             //   createGame();
//           }}
//         >
//           Create Game
//         </Button>
//       </div>
//     </form>
//   );
// }
