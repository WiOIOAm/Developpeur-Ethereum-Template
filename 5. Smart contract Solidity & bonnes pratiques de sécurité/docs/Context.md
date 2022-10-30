# Context.sol

View Source: [\node_modules\@openzeppelin\contracts\utils\Context.sol](..\node_modules\@openzeppelin\contracts\utils\Context.sol)

**↘ Derived Contracts: [Ownable](Ownable.md)**

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

### _msgSender

```js
function _msgSender() internal view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _msgData

```js
function _msgData() internal view
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [Context](Context.md)
* [Ownable](Ownable.md)
* [Voting](Voting.md)
