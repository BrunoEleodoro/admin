// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/GameFactory.sol";

contract DeployGameFactory is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the GameFactory
        // Note: We're passing the CFA Forwarder address here. Make sure to replace with the correct address.
        address cfaV1ForwarderAddress = 0xcfA132E353cB4E398080B9700609bb008eceB125; // Replace with actual address
        GameFactory factory = new GameFactory(cfaV1ForwarderAddress);
        console.log("GameFactory deployed at:", address(factory));

        // Optionally, you can set up initial configurations here
        // For example, granting roles to specific addresses
        // address gameAdmin = 0x...;
        // factory.grantRole(factory.GAME_ADMIN_ROLE(), gameAdmin);

        vm.stopBroadcast();
    }
}