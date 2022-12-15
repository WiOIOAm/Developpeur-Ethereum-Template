# Fillgood.sol

View Source: [\truffle\contracts\fillgood.sol](..\..\..\truffle\contracts\fillgood.sol)

**↗ Extends: [Ownable](Ownable.md)**

**Fillgood**

**Enums**
### OfferType

```js
enum OfferType {
 none,
 gold,
 silver,
 bronze
}
```

## Structs
### Pack

```js
struct Pack {
 uint32 nbMaxExperiences,
 string name,
 uint256 price,
 uint256 fees
}
```

### Partner

```js
struct Partner {
 bool isRegister,
 uint256 partnerId,
 string name,
 enum Fillgood.OfferType offer,
 uint256[] experiencesIds
}
```

### Experience

```js
struct Experience {
 uint256 experienceId,
 uint256 partnerId,
 uint32 nbTickets,
 uint32 nbTicketsSold,
 uint256 price,
 uint256 reward,
 uint256 date,
 string name,
 string experienceType,
 string meetingPlace
}
```

### Ticket

```js
struct Ticket {
 bool isRegistered,
 bool proofScanned
}
```

### Participant

```js
struct Participant {
 uint256 participantId,
 mapping(uint256 => struct Fillgood.Ticket) tickets,
 uint256[] ticketsIds
}
```

## Contract Members
**Constants & Variables**

```js
//public members
contract IERC20FIGO public figo;
contract ERC1155TICKET public experienceTicketing;
struct Fillgood.Pack[] public packs;
mapping(uint256 => struct Fillgood.Experience) public experiences;
struct Counters.Counter public partnerIds;
struct Counters.Counter public experienceIds;
struct Counters.Counter public participantsIds;

//internal members
mapping(address => struct Fillgood.Partner) internal partners;

//private members
mapping(address => struct Fillgood.Participant) private participants;
mapping(uint256 => address) private partnersAddresses;

```

**Events**

```js
event offerSold(address  partnerAddress, string  offerName);
event ExperienceAdded(address  partnerAddress, string  experienceName);
event ParticipantRegistered(address  participantAddress, string  experienceName);
```

## Functions

- [constructor(address _figoaddress, address _ticketAddress)](#constructor)
- [getSelfAsPartner()](#getselfaspartner)
- [getPartnerAddressById(uint256 _id)](#getpartneraddressbyid)
- [getExperience(uint256 idExperience)](#getexperience)
- [getParticipationsIds()](#getparticipationsids)
- [getParticipation(uint256 experienceId)](#getparticipation)
- [buyPack(uint8 _offerType)](#buypack)
- [_registerPartner(address _sender)](#_registerpartner)
- [addExperience(uint8 _nbTickets, uint256 _price, uint256 _reward, uint256 _date, string _name, string _experienceType, string _meetingPlace)](#addexperience)
- [registerParticipant(uint256 _experienceId)](#registerparticipant)

---    

> ### constructor

```solidity
function (address _figoaddress, address _ticketAddress) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _figoaddress | address |  | 
| _ticketAddress | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor(address _figoaddress, address _ticketAddress) {
        figo = IERC20FIGO(_figoaddress);
        experienceTicketing = ERC1155TICKET(_ticketAddress);

        packs.push(Pack(0, "None", 0, 500));
        packs.push(Pack(0, "Gold", 2500 ether, 0));
        packs.push(Pack(5, "Silver", 1500 ether, 100));
        packs.push(Pack(2, "Bronze", 500 ether, 300));
    }
```
</details>

---    

> ### getSelfAsPartner

Get self as partner

```solidity
function getSelfAsPartner() external view
returns(struct Fillgood.Partner)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getSelfAsPartner() external view returns (Partner memory) {
        return partners[msg.sender];
    }
```
</details>

---    

> ### getPartnerAddressById

Get partner by id
 use to get a partner detail in experience

```solidity
function getPartnerAddressById(uint256 _id) external view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _id | uint256 |  | 

**Returns**

address address

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getPartnerAddressById(
        uint256 _id
    ) external view returns (address) {
        return partnersAddresses[_id];
    }
```
</details>

---    

> ### getExperience

Get an Experience by id

```solidity
function getExperience(uint256 idExperience) external view
returns(struct Fillgood.Experience)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| idExperience | uint256 |  | 

**Returns**

Experience object

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getExperience(
        uint256 idExperience
    ) external view returns (Experience memory) {
        return experiences[idExperience];
    }
```
</details>

---    

> ### getParticipationsIds

Get experience id list registered by participant

```solidity
function getParticipationsIds() external view
returns(uint256[])
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getParticipationsIds() external view returns (uint256[] memory) {
        uint256[] memory ticketsIds = participants[msg.sender].ticketsIds;

        return ticketsIds;
    }
```
</details>

---    

> ### getParticipation

Get ticket of participant for an experience id

```solidity
function getParticipation(uint256 experienceId) external view
returns(struct Fillgood.Ticket)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| experienceId | uint256 |  | 

**Returns**

Ticket object

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getParticipation(
        uint256 experienceId
    ) external view returns (Ticket memory) {
        return participants[msg.sender].tickets[experienceId];
    }
```
</details>

---    

> ### buyPack

Partner buy FillGood Offer

```solidity
function buyPack(uint8 _offerType) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _offerType | uint8 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function buyPack(uint8 _offerType) external {
        require(
            partners[msg.sender].offer != OfferType(_offerType),
            "you already have this offer"
        );

        uint256 amount = packs[_offerType].price;
        bool success = figo.transferFrom(msg.sender, address(this), amount);
        require(success, "transfertFrom failed");

        _registerPartner(msg.sender);

        partners[msg.sender].offer = OfferType(_offerType);
        emit offerSold(msg.sender, packs[_offerType].name);
    }
```
</details>

---    

> ### _registerPartner

Register a partner in partner lists
 add entry partnerId to address

```solidity
function _registerPartner(address _sender) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _sender | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _registerPartner(address _sender) internal {
        if (!partners[_sender].isRegister) {
            partnerIds.increment();
            partners[_sender].partnerId = partnerIds.current();
            partners[_sender].isRegister = true;
            partnersAddresses[partnerIds.current()] = _sender;
        }
    }
```
</details>

---    

> ### addExperience

Partner add an experience

```solidity
function addExperience(uint8 _nbTickets, uint256 _price, uint256 _reward, uint256 _date, string _name, string _experienceType, string _meetingPlace) external nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _nbTickets | uint8 |  | 
| _price | uint256 |  | 
| _reward | uint256 |  | 
| _date | uint256 |  | 
| _name | string |  | 
| _experienceType | string |  | 
| _meetingPlace | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addExperience(
        uint8 _nbTickets,
        uint256 _price,
        uint256 _reward,
        uint256 _date,
        string memory _name,
        string memory _experienceType,
        string memory _meetingPlace
    ) external returns (bool) {
        _registerPartner(msg.sender);
        experienceIds.increment();

        experiences[experienceIds.current()] = Experience(
            experienceIds.current(),
            partners[msg.sender].partnerId,
            _nbTickets,
            0,
            _price,
            _reward,
            _date,
            _name,
            _experienceType,
            _meetingPlace
        );
        experienceTicketing.createTicket(
            experienceIds.current(),
            _nbTickets,
            _date,
            _name
        );
        partners[msg.sender].experiencesIds.push(experienceIds.current());
        emit ExperienceAdded(msg.sender, _name);
        return true;
    }
```
</details>

---    

> ### registerParticipant

Participants registering to an experience

```solidity
function registerParticipant(uint256 _experienceId) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _experienceId | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function registerParticipant(uint256 _experienceId) external {
        Experience memory experience = experiences[_experienceId];
        require(
            experience.nbTicketsSold < experience.nbTickets,
            "not enougth tickets"
        );

        require(
            !participants[msg.sender].tickets[_experienceId].isRegistered,
            "You are already registered"
        );

        // pay for registering an experience
        bool success = figo.transferFrom(
            msg.sender,
            partnersAddresses[experience.partnerId],
            experience.price
        );
        require(success, "transfertFrom failed");

        // if partcipant has no account
        if (participants[msg.sender].participantId == 0) {
            participants[msg.sender].participantId = participantsIds.current();
        }

        participants[msg.sender].tickets[_experienceId] = Ticket(true, false);
        participants[msg.sender].ticketsIds.push(_experienceId);

        // mint ticket
        experienceTicketing.mint(
            msg.sender, //    address _athlete,
            _experienceId, //  uint256 _experienceId,
            "json_uri", // string memory _tokenURI
            1, // _quantity
            "0x" // _data
        );
        experience.nbTicketsSold++;
        emit ParticipantRegistered(msg.sender, experience.name);
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

