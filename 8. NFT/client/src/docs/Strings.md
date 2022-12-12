# Strings.sol

View Source: [@openzeppelin\contracts\utils\Strings.sol](..\..\..\@openzeppelin\contracts\utils\Strings.sol)

**Strings**

String operations.

## Contract Members
**Constants & Variables**

```js
bytes16 private constant _SYMBOLS;
uint8 private constant _ADDRESS_LENGTH;

```

## Functions

- [toString(uint256 value)](#tostring)
- [toHexString(uint256 value)](#tohexstring)
- [toHexString(uint256 value, uint256 length)](#tohexstring)
- [toHexString(address addr)](#tohexstring)

---    

> ### toString

Converts a `uint256` to its ASCII `string` decimal representation.

```solidity
function toString(uint256 value) internal pure
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| value | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function toString(uint256 value) internal pure returns (string memory) {
        unchecked {
            uint256 length = Math.log10(value) + 1;
            string memory buffer = new string(length);
            uint256 ptr;
            /// @solidity memory-safe-assembly
            assembly {
                ptr := add(buffer, add(32, length))
            }
            while (true) {
                ptr--;
                /// @solidity memory-safe-assembly
                assembly {
                    mstore8(ptr, byte(mod(value, 10), _SYMBOLS))
                }
                value /= 10;
                if (value == 0) break;
            }
            return buffer;
        }
    }
```
</details>

---    

> ### toHexString

Converts a `uint256` to its ASCII `string` hexadecimal representation.

```solidity
function toHexString(uint256 value) internal pure
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| value | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function toHexString(uint256 value) internal pure returns (string memory) {
        unchecked {
            return toHexString(value, Math.log256(value) + 1);
        }
    }
```
</details>

---    

> ### toHexString

Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.

```solidity
function toHexString(uint256 value, uint256 length) internal pure
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| value | uint256 |  | 
| length | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
```
</details>

---    

> ### toHexString

Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.

```solidity
function toHexString(address addr) internal pure
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| addr | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function toHexString(address addr) internal pure returns (string memory) {
        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);
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

