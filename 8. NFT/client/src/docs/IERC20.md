# IERC20.sol

View Source: [@openzeppelin\contracts\token\ERC20\IERC20.sol](..\..\..\@openzeppelin\contracts\token\ERC20\IERC20.sol)

**↘ Derived Contracts: [ERC20](ERC20.md), [IERC20FIGO](IERC20FIGO.md), [IERC20Metadata](IERC20Metadata.md)**

**IERC20**

Interface of the ERC20 standard as defined in the EIP.

**Events**

```js
event Transfer(address indexed from, address indexed to, uint256  value);
event Approval(address indexed owner, address indexed spender, uint256  value);
```

## Functions

- [totalSupply()](#totalsupply)
- [balanceOf(address account)](#balanceof)
- [transfer(address to, uint256 amount)](#transfer)
- [allowance(address owner, address spender)](#allowance)
- [approve(address spender, uint256 amount)](#approve)
- [transferFrom(address from, address to, uint256 amount)](#transferfrom)

---    

> ### totalSupply

Returns the amount of tokens in existence.

```solidity
function totalSupply() external view
returns(uint256)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function totalSupply() external view returns (uint256);
```
</details>

---    

> ### balanceOf

Returns the amount of tokens owned by `account`.

```solidity
function balanceOf(address account) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| account | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function balanceOf(address account) external view returns (uint256);
```
</details>

---    

> ### transfer

Moves `amount` tokens from the caller's account to `to`.
 Returns a boolean value indicating whether the operation succeeded.
 Emits a {Transfer} event.

```solidity
function transfer(address to, uint256 amount) external nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| to | address |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function transfer(address to, uint256 amount) external returns (bool);
```
</details>

---    

> ### allowance

Returns the remaining number of tokens that `spender` will be
 allowed to spend on behalf of `owner` through {transferFrom}. This is
 zero by default.
 This value changes when {approve} or {transferFrom} are called.

```solidity
function allowance(address owner, address spender) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| owner | address |  | 
| spender | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function allowance(address owner, address spender) external view returns (uint256);
```
</details>

---    

> ### approve

Sets `amount` as the allowance of `spender` over the caller's tokens.
 Returns a boolean value indicating whether the operation succeeded.
 IMPORTANT: Beware that changing an allowance with this method brings the risk
 that someone may use both the old and the new allowance by unfortunate
 transaction ordering. One possible solution to mitigate this race
 condition is to first reduce the spender's allowance to 0 and set the
 desired value afterwards:
 https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
 Emits an {Approval} event.

```solidity
function approve(address spender, uint256 amount) external nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| spender | address |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function approve(address spender, uint256 amount) external returns (bool);
```
</details>

---    

> ### transferFrom

Moves `amount` tokens from `from` to `to` using the
 allowance mechanism. `amount` is then deducted from the caller's
 allowance.
 Returns a boolean value indicating whether the operation succeeded.
 Emits a {Transfer} event.

```solidity
function transferFrom(address from, address to, uint256 amount) external nonpayable
returns(bool)
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
function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
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

