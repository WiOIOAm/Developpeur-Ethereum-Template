# Counters (Counters.sol)

View Source: [@openzeppelin\contracts\utils\Counters.sol](..\..\..\@openzeppelin\contracts\utils\Counters.sol)

**Counters**

Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number
 of elements in a mapping, issuing ERC721 ids, or counting request ids.
 Include with `using Counters for Counters.Counter;`

## Structs
### Counter

```js
struct Counter {
 uint256 _value
}
```

## Functions

- [current(struct Counters.Counter counter)](#current)
- [increment(struct Counters.Counter counter)](#increment)
- [decrement(struct Counters.Counter counter)](#decrement)
- [reset(struct Counters.Counter counter)](#reset)

---    

> ### current

```solidity
function current(struct Counters.Counter counter) internal view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| counter | struct Counters.Counter |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }
```
</details>

---    

> ### increment

```solidity
function increment(struct Counters.Counter counter) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| counter | struct Counters.Counter |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }
```
</details>

---    

> ### decrement

```solidity
function decrement(struct Counters.Counter counter) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| counter | struct Counters.Counter |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }
```
</details>

---    

> ### reset

```solidity
function reset(struct Counters.Counter counter) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| counter | struct Counters.Counter |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function reset(Counter storage counter) internal {
        counter._value = 0;
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

