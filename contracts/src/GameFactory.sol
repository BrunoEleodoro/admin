// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Game} from "./Game.sol";
import {ISuperToken} from "@superfluid/interfaces/superfluid/ISuperToken.sol";
import {CFAv1Forwarder} from "@superfluid-finance/ethereum-contracts/contracts/utils/CFAv1Forwarder.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract GameFactory is Ownable {
    // 0xcfA132E353cB4E398080B9700609bb008eceB125
    CFAv1Forwarder public immutable cfaV1Forwarder;

    event GameCreated(
        address indexed gameAddress,
        address indexed admin,
        address lifeToken
    );

    mapping(address => uint256) public gameSuperTokenBalances;
    mapping(address => address) public gameCreators;

    constructor(address _cfaV1Forwarder) Ownable() {
        cfaV1Forwarder = CFAv1Forwarder(_cfaV1Forwarder);
    }

    function createGame(
        address admin,
        address superToken,
        int96 baseFlowRate,
        uint256 nativePrice,
        uint256 superTokenAmount,
        uint256 startTime,
        uint256 duration
    ) external returns (address) {
        ISuperToken lifeToken = ISuperToken(superToken);

        // Transfer SuperTokens from msg.sender to this contract
        require(
            lifeToken.transferFrom(msg.sender, address(this), superTokenAmount),
            "SuperToken transfer failed"
        );

        // Update the balance for this game
        gameSuperTokenBalances[superToken] += superTokenAmount;

        // Deploy new Game contract
        Game game = new Game(
            address(this),
            lifeToken,
            baseFlowRate,
            nativePrice,
            startTime,
            duration
        );

        address gameAddress = address(game);

        // Grant permissions to the game contract
        cfaV1Forwarder.grantPermissions(lifeToken, gameAddress);

        // Grant GAME_ADMIN_ROLE to the specified admin
        game.grantRole(game.GAME_ADMIN_ROLE(), admin);

        // Store the game creator
        gameCreators[gameAddress] = msg.sender;

        emit GameCreated(gameAddress, admin, address(lifeToken));

        return gameAddress;
    }

    function withdrawSuperTokens(address superToken, uint256 amount) external {
        require(
            gameSuperTokenBalances[superToken] >= amount,
            "Insufficient balance"
        );
        require(
            msg.sender == owner() || msg.sender == gameCreators[msg.sender],
            "Not authorized"
        );

        gameSuperTokenBalances[superToken] -= amount;
        ISuperToken(superToken).transfer(msg.sender, amount);
    }
}
