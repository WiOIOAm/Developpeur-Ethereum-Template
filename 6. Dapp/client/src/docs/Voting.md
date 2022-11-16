# A linear voting system (Voting.sol)

View Source: [\truffle\contracts\voting.sol](..\..\..\truffle\contracts\voting.sol)

**↗ Extends: [Ownable](Ownable.md)**

**Voting**

the owner facilitates the voting sessions. voters make proposals and vote for their favorite.

**Enums**
### WorkflowStatus

```js
enum WorkflowStatus {
 RegisteringVoters,
 ProposalsRegistrationStarted,
 ProposalsRegistrationEnded,
 VotingSessionStarted,
 VotingSessionEnded,
 VotesTallied
}
```

## Structs
### Voter

```js
struct Voter {
 bool isRegistered,
 bool hasVoted,
 uint256 votedProposalId
}
```

### Proposal

```js
struct Proposal {
 string description,
 uint256 voteCount
}
```

## Contract Members
**Constants & Variables**

```js
//public members
uint256 public winningProposalID;
enum Voting.WorkflowStatus public workflowStatus;

//internal members
struct Voting.Proposal[] internal proposalsArray;
mapping(address => struct Voting.Voter) internal voters;

```

**Events**

```js
event VoterRegistered(address  voterAddress);
event WorkflowStatusChange(enum Voting.WorkflowStatus  previousStatus, enum Voting.WorkflowStatus  newStatus);
event ProposalRegistered(uint256  proposalId);
event Voted(address  voter, uint256  proposalId);
```

## Modifiers

- [onlyVoters](#onlyvoters)

### onlyVoters

```js
modifier onlyVoters() internal
```

## Functions

- [me()](#me)
- [getVoter(address _addr)](#getvoter)
- [getOneProposal(uint256 _id)](#getoneproposal)
- [addVoter(address _addr)](#addvoter)
- [addProposal(string _desc)](#addproposal)
- [setVote(uint256 _id)](#setvote)
- [startProposalsRegistering()](#startproposalsregistering)
- [endProposalsRegistering()](#endproposalsregistering)
- [startVotingSession()](#startvotingsession)
- [endVotingSession()](#endvotingsession)
- [tallyVotes()](#tallyvotes)

---    

> ### me

Get self as voter

```solidity
function me() external view
returns(struct Voting.Voter)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function me() external view returns (Voter memory) {
        return voters[msg.sender];
    }
```
</details>

---    

> ### getVoter

Get one Voter

```solidity
function getVoter(address _addr) external view onlyVoters 
returns(struct Voting.Voter)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _addr | address | The address of registered voter | 

**Returns**

Voter object

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getVoter(address _addr)
        external
        view
        onlyVoters
        returns (Voter memory)
    {
        return voters[_addr];
    }
```
</details>

---    

> ### getOneProposal

Get one proposal

```solidity
function getOneProposal(uint256 _id) external view onlyVoters 
returns(struct Voting.Proposal)
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _id | uint256 | The id of proposal | 

**Returns**

Proposal object

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getOneProposal(uint256 _id)
        external
        view
        onlyVoters
        returns (Proposal memory)
    {
        return proposalsArray[_id];
    }
```
</details>

---    

> ### addVoter

Owner Add a voter at RegisteringVoters session

```solidity
function addVoter(address _addr) external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _addr | address | The address of voter | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
```
</details>

---    

> ### addProposal

Voters Add a proposal at ProposalsRegistrationStarted session

```solidity
function addProposal(string _desc) external nonpayable onlyVoters 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _desc | string | The proposal description of registered voter | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addProposal(string memory _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        );

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }
```
</details>

---    

> ### setVote

Voters vote once for a a proposal at VotingSessionStarted session

```solidity
function setVote(uint256 _id) external nonpayable onlyVoters 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| _id | uint256 | The id of proposal | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setVote(uint256 _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found");

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }
```
</details>

---    

> ### startProposalsRegistering

Owner set session to ProposalsRegistrationStarted after Registering

```solidity
function startProposalsRegistering() external nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }
```
</details>

---    

> ### endProposalsRegistering

Owner set session to ProposalsRegistrationEnded after ProposalsRegistrationStarted

```solidity
function endProposalsRegistering() external nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }
```
</details>

---    

> ### startVotingSession

Owner set session to VotingSessionStarted after ProposalsRegistrationEnded

```solidity
function startVotingSession() external nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }
```
</details>

---    

> ### endVotingSession

Owner set session to VotingSessionEnded after VotingSessionStarted

```solidity
function endVotingSession() external nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }
```
</details>

---    

> ### tallyVotes

Owner calculate winner after VotingSessionEnded

```solidity
function tallyVotes() external nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        uint256 _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount >
                proposalsArray[_winningProposalId].voteCount
            ) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
```
</details>

## Contracts

* [Context](Context.md)
* [Ownable](Ownable.md)
* [Voting](Voting.md)

