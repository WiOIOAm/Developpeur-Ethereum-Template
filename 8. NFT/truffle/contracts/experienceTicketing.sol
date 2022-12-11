// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact security@fillgood.fr
contract ExperienceTicketing is ERC1155URIStorage, ERC1155Supply, Ownable {
    struct Ticket {
        uint32 nbTickets;
        uint256 date;
        string name;
    }
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => uint256) public ticketsSold;

    event TicketCreated(uint256 experienceId);

    constructor(string memory name, string memory symbol) ERC1155("") {}

    /**
     * @notice Get uri prevent conflicts
     * @return string uri
     */
    function uri(uint256 tokenId)
        public
        view
        override(ERC1155, ERC1155URIStorage)
        returns (string memory)
    {
        return ERC1155URIStorage.uri(tokenId);
    }

    /**
     * @dev See {_setURI}.
     */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * @notice Add a new ticket for an experience to the list
     */
    function createTicket(
        uint256 _experienceId,
        uint32 _nbTickets,
        uint256 _date,
        string memory _name
    ) external {
        tickets[_experienceId] = Ticket(_nbTickets, _date, _name);

        emit TicketCreated(_experienceId);
    }

    /**
     * @dev Creates `amount` tokens of token type `id`, and assigns them to `to`.
     * @dev See {_mint}.
     *
     * Requirements:
     *
     * - `date` cannot be the outdatted.
     * - `_experienceId`  must exists in list
     * - `_amount` must be less than of the number of remaining tickets
     */
    function mint(
        address _to,
        uint256 _experienceId,
        string memory _tokenURI,
        uint256 _amount,
        bytes memory _data
    ) external {
        require(tickets[_experienceId].nbTickets > 0, "This ticket not exists");
        require(
            tickets[_experienceId].date > block.timestamp,
            "Event is outdated"
        );
        require(
            totalSupply(_experienceId) + _amount <=
                tickets[_experienceId].nbTickets,
            "Not enough tickets for sale"
        );
        _mint(_to, _experienceId, _amount, _data);
        _setURI(_experienceId, _tokenURI);
    }

    /**
     * @notice _beforeTokenTransfer prevent conflicts
     * @dev See {_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        ERC1155Supply._beforeTokenTransfer(
            operator,
            from,
            to,
            ids,
            amounts,
            data
        );
    }
}
