# ExperienceTicketing.sol

View Source: [\truffle\contracts\experienceTicketing.sol](..\..\..\truffle\contracts\experienceTicketing.sol)

**↗ Extends: [ERC1155URIStorage](ERC1155URIStorage.md), [ERC1155Supply](ERC1155Supply.md), [Ownable](Ownable.md)**

**ExperienceTicketing**

## Structs
### Ticket

```js
struct Ticket {
 uint32 nbTickets,
 uint256 date,
 string name
}
```

## Contract Members
**Constants & Variables**

```js
mapping(uint256 => struct ExperienceTicketing.Ticket) public tickets;
mapping(uint256 => uint256) public ticketsSold;

```

**Events**

```js
event TicketCreated(uint256  experienceId);
```

## Functions

- [constructor(string name, string symbol)](#constructor)
- [uri(uint256 tokenId)](#uri)
- [setURI(string newuri)](#seturi)
- [createTicket(uint256 _experienceId, uint32 _nbTickets, uint256 _date, string _name)](#createticket)
- [mint(address _to, uint256 _experienceId, string _tokenURI, uint256 _amount, bytes _data)](#mint)
- [_beforeTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data)](#_beforetokentransfer)

---    

> ### constructor

```solidity
function (string name, string symbol) public nonpayable ERC1155 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| name | string |  | 
| symbol | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor(string memory name, string memory symbol) ERC1155("") {}
```
</details>

---    

> ### uri

Get uri prevent conflicts

```solidity
function uri(uint256 tokenId) public view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| tokenId | uint256 |  | 

**Returns**

string uri

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function uri(
        uint256 tokenId
    ) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return ERC1155URIStorage.uri(tokenId);
    }
```
</details>

---    

> ### setURI

See {_setURI}.

```solidity
function setURI(string newuri) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| newuri | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
```
</details>

---    

> ### createTicket

Add a new ticket for an experience to the list

```solidity
function createTicket(uint256 _experienceId, uint32 _nbTickets, uint256 _date, string _name) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _experienceId | uint256 |  | 
| _nbTickets | uint32 |  | 
| _date | uint256 |  | 
| _name | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function createTicket(
        uint256 _experienceId,
        uint32 _nbTickets,
        uint256 _date,
        string memory _name
    ) external {
        tickets[_experienceId] = Ticket(_nbTickets, _date, _name);

        emit TicketCreated(_experienceId);
    }
```
</details>

---    

> ### mint

Creates `amount` tokens of token type `id`, and assigns them to `to`.

```solidity
function mint(address _to, uint256 _experienceId, string _tokenURI, uint256 _amount, bytes _data) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _to | address |  | 
| _experienceId | uint256 |  | 
| _tokenURI | string |  | 
| _amount | uint256 |  | 
| _data | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mint(
        address _to,
        uint256 _experienceId,
        string memory _tokenURI,
        uint256 _amount,
        bytes memory _data
    ) external {
        require(tickets[_experienceId].nbTickets > 0, "This ticket not exists");
        require(
            tickets[_experienceId].date > block.timestamp,
            "Event is outdated"
        );
        require(
            totalSupply(_experienceId) + _amount <=
                tickets[_experienceId].nbTickets,
            "Not enough tickets for sale"
        );
        _mint(_to, _experienceId, _amount, _data);
        _setURI(_experienceId, _tokenURI);
    }
```
</details>

---    

> ### _beforeTokenTransfer

_beforeTokenTransfer prevent conflicts

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
    ) internal override(ERC1155, ERC1155Supply) {
        ERC1155Supply._beforeTokenTransfer(
            operator,
            from,
            to,
            ids,
            amounts,
            data
        );
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

