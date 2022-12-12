# FIGO.sol

View Source: [\truffle\contracts\figo.sol](..\..\..\truffle\contracts\figo.sol)

**↗ Extends: [ERC20](ERC20.md), [Ownable](Ownable.md), [ERC20Burnable](ERC20Burnable.md), [Pausable](Pausable.md), [IERC20FIGO](IERC20FIGO.md)**

**FIGO**

## Functions

- [constructor()](#constructor)
- [faucet(address to, uint256 amount)](#faucet)
- [pause()](#pause)
- [unpause()](#unpause)
- [mint(address to, uint256 amount)](#mint)
- [_beforeTokenTransfer(address from, address to, uint256 amount)](#_beforetokentransfer)

---    

> ### constructor

```solidity
function () public nonpayable ERC20 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor() ERC20("FIGO", "FIGO") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
```
</details>

---    

> ### faucet

```solidity
function faucet(address to, uint256 amount) external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| to | address |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function faucet(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
```
</details>

---    

> ### pause

```solidity
function pause() external nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function pause() external onlyOwner {
        _pause();
    }
```
</details>

---    

> ### unpause

```solidity
function unpause() external nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function unpause() external onlyOwner {
        _unpause();
    }
```
</details>

---    

> ### mint

```solidity
function mint(address to, uint256 amount) external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| to | address |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
```
</details>

---    

> ### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal nonpayable whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| from | address |  | 
| to | address |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
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

