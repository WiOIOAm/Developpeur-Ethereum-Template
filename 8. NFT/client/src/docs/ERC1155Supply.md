# ERC1155Supply.sol

View Source: [@openzeppelin\contracts\token\ERC1155\extensions\ERC1155Supply.sol](..\..\..\@openzeppelin\contracts\token\ERC1155\extensions\ERC1155Supply.sol)

**↗ Extends: [ERC1155](ERC1155.md)**

**↘ Derived Contracts: [ExperienceTicketing](ExperienceTicketing.md)**

**ERC1155Supply**

Extension of ERC1155 that adds tracking of total supply per id.
 Useful for scenarios where Fungible and Non-fungible tokens have to be
 clearly identified. Note: While a totalSupply of 1 might mean the
 corresponding is an NFT, there is no guarantees that no other token with the
 same id are not going to be minted.

## Contract Members
**Constants & Variables**

```js
mapping(uint256 => uint256) private _totalSupply;

```

## Functions

- [totalSupply(uint256 id)](#totalsupply)
- [exists(uint256 id)](#exists)
- [_beforeTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data)](#_beforetokentransfer)

---    

> ### totalSupply

Total amount of tokens in with a given id.

```solidity
function totalSupply(uint256 id) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| id | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function totalSupply(uint256 id) public view virtual returns (uint256) {
        return _totalSupply[id];
    }
```
</details>

---    

> ### exists

Indicates whether any token exist with a given id, or not.

```solidity
function exists(uint256 id) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| id | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function exists(uint256 id) public view virtual returns (bool) {
        return ERC1155Supply.totalSupply(id) > 0;
    }
```
</details>

---    

> ### _beforeTokenTransfer

See {ERC1155-_beforeTokenTransfer}.

```solidity
function _beforeTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| operator | address |  | 
| from | address |  | 
| to | address |  | 
| ids | uint256[] |  | 
| amounts | uint256[] |  | 
| data | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                _totalSupply[ids[i]] += amounts[i];
            }
        }

        if (to == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                uint256 id = ids[i];
                uint256 amount = amounts[i];
                uint256 supply = _totalSupply[id];
                require(supply >= amount, "ERC1155: burn amount exceeds totalSupply");
                unchecked {
                    _totalSupply[id] = supply - amount;
                }
            }
        }
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

