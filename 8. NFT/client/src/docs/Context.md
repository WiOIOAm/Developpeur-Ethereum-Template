# Context.sol

View Source: [@openzeppelin\contracts\utils\Context.sol](..\..\..\@openzeppelin\contracts\utils\Context.sol)

**↘ Derived Contracts: [ERC1155](ERC1155.md), [ERC20](ERC20.md), [ERC20Burnable](ERC20Burnable.md), [ERC721](ERC721.md), [Ownable](Ownable.md), [Pausable](Pausable.md)**

**Context**

Provides information about the current execution context, including the
 sender of the transaction and its data. While these are generally available
 via msg.sender and msg.data, they should not be accessed in such a direct
 manner, since when dealing with meta-transactions the account sending and
 paying for execution may not be the actual sender (as far as an application
 is concerned).
 This contract is only required for intermediate, library-like contracts.

## Functions

- [_msgSender()](#_msgsender)
- [_msgData()](#_msgdata)

---    

> ### _msgSender

```solidity
function _msgSender() internal view
returns(address)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
```
</details>

---    

> ### _msgData

```solidity
function _msgData() internal view
returns(bytes)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
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

