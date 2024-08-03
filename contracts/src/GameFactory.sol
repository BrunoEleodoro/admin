// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Game} from "./Game.sol";
import {ISuperToken} from "@superfluid/interfaces/superfluid/ISuperToken.sol";
import {CFAv1Forwarder} from "@superfluid-finance/ethereum-contracts/contracts/utils/CFAv1Forwarder.sol";

contract GameFactory {
    // 0xcfA132E353cB4E398080B9700609bb008eceB125
    CFAv1Forwarder public immutable cfaV1Forwarder;
    
    event GameCreated(address indexed gameAddress, address indexed admin, address lifeToken);

    constructor(address _cfaV1Forwarder) {
        cfaV1Forwarder = CFAv1Forwarder(_cfaV1Forwarder);
    }

    function createGame(
        address admin,
        address superToken,
        int96 baseFlowRate,
        uint256 nativePrice
    ) external returns (address) {
        ISuperToken lifeToken = ISuperToken(superToken);

        // Deploy new Game contract
        Game game = new Game(
            admin,
            lifeToken,
            baseFlowRate,
            nativePrice
        );

        address gameAddress = address(game);

        // Grant permissions to the game contract
        cfaV1Forwarder.grantPermissions(lifeToken, gameAddress);

        // Grant GAME_ADMIN_ROLE to the specified admin
        game.grantRole(game.GAME_ADMIN_ROLE(), admin);

        emit GameCreated(gameAddress, admin, address(lifeToken));

        return gameAddress;
    }
}