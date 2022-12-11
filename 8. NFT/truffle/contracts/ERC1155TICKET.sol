// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

/// @custom:security-contact security@fillgood.fr
interface ERC1155TICKET is IERC1155 {
    function createTicket(
        uint256 _experienceId,
        uint32 _nbSeats,
        uint256 _date,
        string memory _name
    ) external;

    function mint(
        address _to,
        uint256 _experienceId,
        string memory _tokenURI,
        uint256 amount,
        bytes memory _data
    ) external;
}
