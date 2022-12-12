# IERC1155MetadataURI.sol

View Source: [@openzeppelin\contracts\token\ERC1155\extensions\IERC1155MetadataURI.sol](..\..\..\@openzeppelin\contracts\token\ERC1155\extensions\IERC1155MetadataURI.sol)

**↗ Extends: [IERC1155](IERC1155.md)**

**↘ Derived Contracts: [ERC1155](ERC1155.md)**

**IERC1155MetadataURI**

Interface of the optional ERC1155MetadataExtension interface, as defined
 in the https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[EIP].
 _Available since v3.1._

## Functions

- [uri(uint256 id)](#uri)

---    

> ### uri

Returns the URI for token type `id`.
 If the `\{id\}` substring is present in the URI, it must be replaced by
 clients with the actual token type ID.

```solidity
function uri(uint256 id) external view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| id | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function uri(uint256 id) external view returns (string memory);
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

