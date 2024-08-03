pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ERC20Mock.sol";

contract SuperTokenFactoryMock {
    function createERC20Wrapper(
        IERC20 underlyingToken,
        uint8 underlyingDecimals,
        uint8 upgradability,
        string calldata name,
        string calldata symbol
    ) external returns (address, address) {
        // For testing, just return a new address
        address superTokenAddress = address(new ERC20Mock(name, symbol));
        return (address(0), superTokenAddress);
    }
}
