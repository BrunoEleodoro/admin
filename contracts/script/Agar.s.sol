// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {BaseScript, console} from "./Base.s.sol";
import {ISuperToken} from "@superfluid/interfaces/superfluid/ISuperToken.sol";
import {MintableSuperToken} from "@supertokens/MintableSuperToken.sol";
import {CFAv1Forwarder} from "@superfluid-finance/ethereum-contracts/contracts/utils/CFAv1Forwarder.sol";
import {Game} from "../src/Game.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AgarScript is BaseScript {
    using SuperTokenV1Library for ISuperToken;
    address private _backendAdmin = 0xe7e37649f37Ed6665260316413fdfe89f8edadb6;

    address private _opSepoliaSuperTokenFactory =
        0xfcF0489488397332579f35b0F711BE570Da0E8f5;
    address private _sepoliaSuperTokenFactory =
        0x254C2e152E8602839D288A7bccdf3d0974597193;
    address private _superTokenFactory;

    CFAv1Forwarder private _cfaV1 =
        CFAv1Forwarder(0xcfA132E353cB4E398080B9700609bb008eceB125);

    function setUp() public {}

    function upgradeNoun(DeployementChain chain) public broadcastOn(chain) {
        (, address sender, ) = vm.readCallers();
        ISuperToken token = ISuperToken(payable(_readDeployment("Life")));

        console.log(token.getUnderlyingToken());
        console.log(IERC20(token.getUnderlyingToken()).balanceOf(sender));

        IERC20(token.getUnderlyingToken()).approve(address(token), 2000 ether);
        token.upgrade(2000 ether);

        token.transferFrom(sender, _backendAdmin, 2000 ether);
    }

    function grantPerm(DeployementChain chain) public {
        vm.createSelectFork(forks[chain]);
        vm.startBroadcast(vm.envUint("GAME_ADMIN_PK"));

        Game game = Game(payable(_readDeployment("Game")));

        _cfaV1.grantPermissions(
            ISuperToken(_readDeployment("Life")),
            address(game)
        );

        vm.stopBroadcast();
    }

    function getPrice(DeployementChain chain) public broadcastOn(chain) {
        Game game = Game(payable(_readDeployment("Game")));

        (, uint256 price) = game.gameCurrencies(address(0));
        console.log(price);
    }

    function updatePrice(DeployementChain chain) public broadcastOn(chain) {
        Game game = Game(payable(_readDeployment("Game")));

        game.updateGamePrice(address(0), 0 ether);
    }

    function deployGame(DeployementChain chain) public broadcastOn(chain) {
        // MintableSuperToken token = MintableSuperToken(
        //     payable(_readDeployment("Life"))
        // );

        // if (block.chainid == 11155111) {
        //     token.mint(_backendAdmin, 1_000_000_000 ether, "");
        // }

        // Game game = new Game(
        //     _backendAdmin,
        //     token,
        //     1 * 1e16, // 1 $LIFE per second
        //     0 ether
        // );

        // game.grantRole(game.GAME_ADMIN_ROLE(), _backendAdmin);

        // _cfaV1.grantPermissions(
        //     ISuperToken(_readDeployment("Life")),
        //     address(game)
        // );

        // _saveDeployment(address(game), "Game");
    }

    function deployLifeToken(DeployementChain chain) public broadcastOn(chain) {
        (, address sender, ) = vm.readCallers();
        MintableSuperToken token = new MintableSuperToken();

        token.initialize(_superTokenFactory, "Agar Life", "LIFE");

        token.mint(sender, 1_000_000_000 ether, "");

        _saveDeployment(address(token), "Life");
    }

    function _initialize() internal {
        if (block.chainid == 11155111) {
            _superTokenFactory = _sepoliaSuperTokenFactory;
        } else {
            _superTokenFactory = _opSepoliaSuperTokenFactory;
        }
    }
}
