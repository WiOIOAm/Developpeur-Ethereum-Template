## `Voting`

the owner facilitates the voting sessions. voters make proposals and vote for their favorite.


One contract action is possible per voting session.

### `onlyVoters()`






### `getVoter(address _addr) → struct Voting.Voter` (external)

Get one Voter


Getter on voters mapping


### `getOneProposal(uint256 _id) → struct Voting.Proposal` (external)

Get one proposal


Explicit getter on voters array


### `addVoter(address _addr)` (external)

Owner Add a voter at RegisteringVoters session


add a voter with his address and give him the right to vote


### `addProposal(string _desc)` (external)

Voters Add a proposal at ProposalsRegistrationStarted session




### `setVote(uint256 _id)` (external)

Voters vote once for a a proposal at VotingSessionStarted session


Register the proposal id in voter object


### `startProposalsRegistering()` (external)

Owner set session to ProposalsRegistrationStarted after Registering


A proposal GENESIS created to skip side effect with all not participating voters

### `endProposalsRegistering()` (external)

Owner set session to ProposalsRegistrationEnded after ProposalsRegistrationStarted



### `startVotingSession()` (external)

Owner set session to VotingSessionStarted after ProposalsRegistrationEnded



### `endVotingSession()` (external)

Owner set session to VotingSessionEnded after VotingSessionStarted



### `tallyVotes()` (external)

Owner calculate winner after VotingSessionEnded


the highest number of votes for a proposal wins


### `VoterRegistered(address voterAddress)`





### `WorkflowStatusChange(enum Voting.WorkflowStatus previousStatus, enum Voting.WorkflowStatus newStatus)`





### `ProposalRegistered(uint256 proposalId)`





### `Voted(address voter, uint256 proposalId)`






### `Voter`


bool isRegistered


bool hasVoted


uint256 votedProposalId


### `Proposal`


string description


uint256 voteCount



### `WorkflowStatus`




















