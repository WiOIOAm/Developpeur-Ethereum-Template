# ERC20Burnable.sol

View Source: [@openzeppelin\contracts\token\ERC20\extensions\ERC20Burnable.sol](..\..\..\@openzeppelin\contracts\token\ERC20\extensions\ERC20Burnable.sol)

**↗ Extends: [Context](Context.md), [ERC20](ERC20.md)**

**↘ Derived Contracts: [FIGO](FIGO.md)**

**ERC20Burnable**

Extension of {ERC20} that allows token holders to destroy both their own
 tokens and those that they have an allowance for, in a way that can be
 recognized off-chain (via event analysis).

## Functions

- [burn(uint256 amount)](#burn)
- [burnFrom(address account, uint256 amount)](#burnfrom)

---    

> ### burn

Destroys `amount` tokens from the caller.
 See {ERC20-_burn}.

```solidity
function burn(uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }
```
</details>

---    

> ### burnFrom

Destroys `amount` tokens from `account`, deducting from the caller's
 allowance.
 See {ERC20-_burn} and {ERC20-allowance}.
 Requirements:
 - the caller must have allowance for ``accounts``'s tokens of at least
 `amount`.

```solidity
function burnFrom(address account, uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| account | address |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function burnFrom(address account, uint256 amount) public virtual {
        _spendAllowance(account, _msgSender(), amount);
        _burn(account, amount);
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

