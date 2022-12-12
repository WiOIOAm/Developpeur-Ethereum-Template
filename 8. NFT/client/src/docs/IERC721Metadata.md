# ERC-721 Non-Fungible Token Standard, optional metadata extension (IERC721Metadata.sol)

View Source: [@openzeppelin\contracts\token\ERC721\extensions\IERC721Metadata.sol](..\..\..\@openzeppelin\contracts\token\ERC721\extensions\IERC721Metadata.sol)

**↗ Extends: [IERC721](IERC721.md)**

**↘ Derived Contracts: [ERC721](ERC721.md)**

**IERC721Metadata**

See https://eips.ethereum.org/EIPS/eip-721

## Functions

- [name()](#name)
- [symbol()](#symbol)
- [tokenURI(uint256 tokenId)](#tokenuri)

---    

> ### name

Returns the token collection name.

```solidity
function name() external view
returns(string)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function name() external view returns (string memory);
```
</details>

---    

> ### symbol

Returns the token collection symbol.

```solidity
function symbol() external view
returns(string)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function symbol() external view returns (string memory);
```
</details>

---    

> ### tokenURI

Returns the Uniform Resource Identifier (URI) for `tokenId` token.

```solidity
function tokenURI(uint256 tokenId) external view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| tokenId | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function tokenURI(uint256 tokenId) external view returns (string memory);
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

