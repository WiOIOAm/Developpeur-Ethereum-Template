# IERC1155Receiver.sol

View Source: [@openzeppelin\contracts\token\ERC1155\IERC1155Receiver.sol](..\..\..\@openzeppelin\contracts\token\ERC1155\IERC1155Receiver.sol)

**↗ Extends: [IERC165](IERC165.md)**

**IERC1155Receiver**

_Available since v3.1._

## Functions

- [onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes data)](#onerc1155received)
- [onERC1155BatchReceived(address operator, address from, uint256[] ids, uint256[] values, bytes data)](#onerc1155batchreceived)

---    

> ### onERC1155Received

Handles the receipt of a single ERC1155 token type. This function is
 called at the end of a `safeTransferFrom` after the balance has been updated.
 NOTE: To accept the transfer, this must return
 `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
 (i.e. 0xf23a6e61, or its own function selector).

```solidity
function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes data) external nonpayable
returns(bytes4)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| operator | address | The address which initiated the transfer (i.e. msg.sender) | 
| from | address | The address which previously owned the token | 
| id | uint256 | The ID of the token being transferred | 
| value | uint256 | The amount of tokens being transferred | 
| data | bytes | Additional data with no specified format | 

**Returns**

`bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4);
```
</details>

---    

> ### onERC1155BatchReceived

Handles the receipt of a multiple ERC1155 token types. This function
 is called at the end of a `safeBatchTransferFrom` after the balances have
 been updated.
 NOTE: To accept the transfer(s), this must return
 `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
 (i.e. 0xbc197c81, or its own function selector).

```solidity
function onERC1155BatchReceived(address operator, address from, uint256[] ids, uint256[] values, bytes data) external nonpayable
returns(bytes4)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| operator | address | The address which initiated the batch transfer (i.e. msg.sender) | 
| from | address | The address which previously owned the token | 
| ids | uint256[] | An array containing ids of each token being transferred (order and length must match values array) | 
| values | uint256[] | An array containing amounts of each token being transferred (order and length must match ids array) | 
| data | bytes | Additional data with no specified format | 

**Returns**

`bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4);
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

