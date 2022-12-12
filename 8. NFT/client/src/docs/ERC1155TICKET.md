# ERC1155TICKET.sol

View Source: [\truffle\contracts\ERC1155TICKET.sol](..\..\..\truffle\contracts\ERC1155TICKET.sol)

**↗ Extends: [IERC1155](IERC1155.md)**

**ERC1155TICKET**

## Functions

- [createTicket(uint256 _experienceId, uint32 _nbSeats, uint256 _date, string _name)](#createticket)
- [mint(address _to, uint256 _experienceId, string _tokenURI, uint256 amount, bytes _data)](#mint)

---    

> ### createTicket

```solidity
function createTicket(uint256 _experienceId, uint32 _nbSeats, uint256 _date, string _name) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _experienceId | uint256 |  | 
| _nbSeats | uint32 |  | 
| _date | uint256 |  | 
| _name | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function createTicket(
        uint256 _experienceId,
        uint32 _nbSeats,
        uint256 _date,
        string memory _name
    ) external;
```
</details>

---    

> ### mint

```solidity
function mint(address _to, uint256 _experienceId, string _tokenURI, uint256 amount, bytes _data) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _to | address |  | 
| _experienceId | uint256 |  | 
| _tokenURI | string |  | 
| amount | uint256 |  | 
| _data | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mint(
        address _to,
        uint256 _experienceId,
        string memory _tokenURI,
        uint256 amount,
        bytes memory _data
    ) external;
```
</details>

## Contracts

* [Address](Address.md)
* [Context](Context.md)
* [Counters](Counters.md)
* [ERC1155](ERC1155.md)
* [ERC1155Supply](ERC1155Supply.md)
* [ERC1155TICKET](ERC1155TICKET.md)
* [ERC1155URIStorage](ERC1155URIStorage.md)
* [ERC165](ERC165.md)
* [ERC20](ERC20.md)
* [ERC20Burnable](ERC20Burnable.md)
* [ERC721](ERC721.md)
* [ExperienceTicketing](ExperienceTicketing.md)
* [FIGO](FIGO.md)
* [Fillgood](Fillgood.md)
* [IERC1155](IERC1155.md)
* [IERC1155MetadataURI](IERC1155MetadataURI.md)
* [IERC1155Receiver](IERC1155Receiver.md)
* [IERC165](IERC165.md)
* [IERC20](IERC20.md)
* [IERC20FIGO](IERC20FIGO.md)
* [IERC20Metadata](IERC20Metadata.md)
* [IERC721](IERC721.md)
* [IERC721Metadata](IERC721Metadata.md)
* [IERC721Receiver](IERC721Receiver.md)
* [Math](Math.md)
* [Ownable](Ownable.md)
* [Pausable](Pausable.md)
* [Strings](Strings.md)

