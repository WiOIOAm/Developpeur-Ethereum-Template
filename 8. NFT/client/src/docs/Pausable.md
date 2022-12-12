# Pausable.sol

View Source: [@openzeppelin\contracts\security\Pausable.sol](..\..\..\@openzeppelin\contracts\security\Pausable.sol)

**↗ Extends: [Context](Context.md)**

**↘ Derived Contracts: [FIGO](FIGO.md)**

**Pausable**

Contract module which allows children to implement an emergency stop
 mechanism that can be triggered by an authorized account.
 This module is used through inheritance. It will make available the
 modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 the functions of your contract. Note that they will not be pausable by
 simply including this module, only once the modifiers are put in place.

## Contract Members
**Constants & Variables**

```js
bool private _paused;

```

**Events**

```js
event Paused(address  account);
event Unpaused(address  account);
```

## Modifiers

- [whenNotPaused](#whennotpaused)
- [whenPaused](#whenpaused)

### whenNotPaused

Modifier to make a function callable only when the contract is not paused.
 Requirements:
 - The contract must not be paused.

```js
modifier whenNotPaused() internal
```

### whenPaused

Modifier to make a function callable only when the contract is paused.
 Requirements:
 - The contract must be paused.

```js
modifier whenPaused() internal
```

## Functions

- [constructor()](#constructor)
- [paused()](#paused)
- [_requireNotPaused()](#_requirenotpaused)
- [_requirePaused()](#_requirepaused)
- [_pause()](#_pause)
- [_unpause()](#_unpause)

---    

> ### constructor

Initializes the contract in unpaused state.

```solidity
function () internal nonpayable
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor() {
        _paused = false;
    }
```
</details>

---    

> ### paused

Returns true if the contract is paused, and false otherwise.

```solidity
function paused() public view
returns(bool)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function paused() public view virtual returns (bool) {
        return _paused;
    }
```
</details>

---    

> ### _requireNotPaused

Throws if the contract is paused.

```solidity
function _requireNotPaused() internal view
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _requireNotPaused() internal view virtual {
        require(!paused(), "Pausable: paused");
    }
```
</details>

---    

> ### _requirePaused

Throws if the contract is not paused.

```solidity
function _requirePaused() internal view
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _requirePaused() internal view virtual {
        require(paused(), "Pausable: not paused");
    }
```
</details>

---    

> ### _pause

Triggers stopped state.
 Requirements:
 - The contract must not be paused.

```solidity
function _pause() internal nonpayable whenNotPaused 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }
```
</details>

---    

> ### _unpause

Returns to normal state.
 Requirements:
 - The contract must be paused.

```solidity
function _unpause() internal nonpayable whenPaused 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
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

