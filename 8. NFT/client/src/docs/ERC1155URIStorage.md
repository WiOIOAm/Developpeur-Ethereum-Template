# ERC1155URIStorage.sol

View Source: [@openzeppelin\contracts\token\ERC1155\extensions\ERC1155URIStorage.sol](..\..\..\@openzeppelin\contracts\token\ERC1155\extensions\ERC1155URIStorage.sol)

**↗ Extends: [ERC1155](ERC1155.md)**

**↘ Derived Contracts: [ExperienceTicketing](ExperienceTicketing.md)**

**ERC1155URIStorage**

ERC1155 token with storage based token URI management.
 Inspired by the ERC721URIStorage extension
 _Available since v4.6._

## Contract Members
**Constants & Variables**

```js
string private _baseURI;
mapping(uint256 => string) private _tokenURIs;

```

## Functions

- [uri(uint256 tokenId)](#uri)
- [_setURI(uint256 tokenId, string tokenURI)](#_seturi)
- [_setBaseURI(string baseURI)](#_setbaseuri)

---    

> ### uri

See {IERC1155MetadataURI-uri}.
 This implementation returns the concatenation of the `_baseURI`
 and the token-specific uri if the latter is set
 This enables the following behaviors:
 - if `_tokenURIs[tokenId]` is set, then the result is the concatenation
   of `_baseURI` and `_tokenURIs[tokenId]` (keep in mind that `_baseURI`
   is empty per default);
 - if `_tokenURIs[tokenId]` is NOT set then we fallback to `super.uri()`
   which in most cases will contain `ERC1155._uri`;
 - if `_tokenURIs[tokenId]` is NOT set, and if the parents do not have a
   uri value set, then the result is empty.

```solidity
function uri(uint256 tokenId) public view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| tokenId | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];

        // If token URI is set, concatenate base URI and tokenURI (via abi.encodePacked).
        return bytes(tokenURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenURI)) : super.uri(tokenId);
    }
```
</details>

---    

> ### _setURI

Sets `tokenURI` as the tokenURI of `tokenId`.

```solidity
function _setURI(uint256 tokenId, string tokenURI) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| tokenId | uint256 |  | 
| tokenURI | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _setURI(uint256 tokenId, string memory tokenURI) internal virtual {
        _tokenURIs[tokenId] = tokenURI;
        emit URI(uri(tokenId), tokenId);
    }
```
</details>

---    

> ### _setBaseURI

Sets `baseURI` as the `_baseURI` for all tokens

```solidity
function _setBaseURI(string baseURI) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| baseURI | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _setBaseURI(string memory baseURI) internal virtual {
        _baseURI = baseURI;
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

