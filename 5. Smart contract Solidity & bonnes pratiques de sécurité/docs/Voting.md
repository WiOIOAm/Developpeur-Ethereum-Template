# A linear voting system (Voting.sol)

View Source: [\contracts\voting.sol](..\contracts\voting.sol)

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

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

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

### getVoter

Get one Voter

```js
function getVoter(address _addr) external view onlyVoters 
returns(struct Voting.Voter)
```

**Returns**

Voter object

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The address of registered voter | 

### getOneProposal

Get one proposal

```js
function getOneProposal(uint256 _id) external view onlyVoters 
returns(struct Voting.Proposal)
```

**Returns**

Proposal object

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _id | uint256 | The id of proposal | 

### addVoter

Owner Add a voter at RegisteringVoters session

```js
function addVoter(address _addr) external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The address of voter | 

### addProposal

Voters Add a proposal at ProposalsRegistrationStarted session

```js
function addProposal(string _desc) external nonpayable onlyVoters 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _desc | string | The proposal description of registered voter | 

### setVote

Voters vote once for a a proposal at VotingSessionStarted session

```js
function setVote(uint256 _id) external nonpayable onlyVoters 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _id | uint256 | The id of proposal | 

### startProposalsRegistering

Owner set session to ProposalsRegistrationStarted after Registering

```js
function startProposalsRegistering() external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### endProposalsRegistering

Owner set session to ProposalsRegistrationEnded after ProposalsRegistrationStarted

```js
function endProposalsRegistering() external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### startVotingSession

Owner set session to VotingSessionStarted after ProposalsRegistrationEnded

```js
function startVotingSession() external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### endVotingSession

Owner set session to VotingSessionEnded after VotingSessionStarted

```js
function endVotingSession() external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### tallyVotes

Owner calculate winner after VotingSessionEnded

```js
function tallyVotes() external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [Context](Context.md)
* [Ownable](Ownable.md)
* [Voting](Voting.md)
