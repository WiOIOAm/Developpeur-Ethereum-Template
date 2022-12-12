# ERC721 token receiver interface (IERC721Receiver.sol)

View Source: [@openzeppelin\contracts\token\ERC721\IERC721Receiver.sol](..\..\..\@openzeppelin\contracts\token\ERC721\IERC721Receiver.sol)

**IERC721Receiver**

Interface for any contract that wants to support safeTransfers
 from ERC721 asset contracts.

## Functions

- [onERC721Received(address operator, address from, uint256 tokenId, bytes data)](#onerc721received)

---    

> ### onERC721Received

Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
 by `operator` from `from`, this function is called.
 It must return its Solidity selector to confirm the token transfer.
 If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
 The selector can be obtained in Solidity with `IERC721Receiver.onERC721Received.selector`.

```solidity
function onERC721Received(address operator, address from, uint256 tokenId, bytes data) external nonpayable
returns(bytes4)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| operator | address |  | 
| from | address |  | 
| tokenId | uint256 |  | 
| data | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
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

