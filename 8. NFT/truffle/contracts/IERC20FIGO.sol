// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @custom:security-contact security@fillgood.fr
interface IERC20FIGO is IERC20 {
    function faucet(address to, uint256 amount) external;

    function pause() external;

    function unpause() external;

    function mint(address to, uint256 amount) external;
}
