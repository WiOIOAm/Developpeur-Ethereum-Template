// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./IERC20FIGO.sol";

/// @custom:security-contact security@fillgood.fr
contract FIGO is ERC20, Ownable, ERC20Burnable, Pausable, IERC20FIGO {
    constructor() ERC20("FIGO", "FIGO") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function faucet(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
