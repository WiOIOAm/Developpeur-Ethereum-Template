# SimpleStorage.sol

View Source: [\truffle\contracts\SimpleStorage.sol](..\..\..\truffle\contracts\SimpleStorage.sol)

**SimpleStorage**

## Contract Members
**Constants & Variables**

```js
uint256 internal value;
string internal greeter;

```

**Events**

```js
event valueChanged(uint256  _value);
```

## Functions

- [read()](#read)
- [write(uint256 newValue)](#write)
- [setGreet(string _greet)](#setgreet)
- [greet()](#greet)

---    

> ### read

```solidity
function read() public view
returns(uint256)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function read() public view returns (uint256) {
        return value;
    }
```
</details>

---    

> ### write

```solidity
function write(uint256 newValue) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| newValue | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function write(uint256 newValue) public {
        value = newValue;
        emit valueChanged(newValue);
    }
```
</details>

---    

> ### setGreet

```solidity
function setGreet(string _greet) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _greet | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setGreet(string memory _greet) public {
        greeter = _greet;
    }
```
</details>

---    

> ### greet

```solidity
function greet() public view
returns(string)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function greet() public view returns (string memory) {
        return greeter;
    }
```
</details>

## Contracts

* [Context](Context.md)
* [Ownable](Ownable.md)
* [SimpleStorage](SimpleStorage.md)
* [Voting](Voting.md)

