const Voting = artifacts.require("Voting.sol");
const truffleAssert = require("truffle-assertions");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("Voting", function (accounts) {
  owner = accounts[0];
  voter1 = accounts[1];
  voter2 = accounts[2];
  voter3 = accounts[3];
  voter4 = accounts[4];
  noWhitlistedUser = accounts[5];

  let VotingInstance;

  const errorMessages = {
    notOwner:
      "Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.",
    invalidParams: "Params: invalid",
    notOnlyVoter: "You're not a voter",
  };

  beforeEach(async function () {
    VotingInstance = await Voting.new({ from: owner });
  });

  /**
   * ::::::::::::::::::: UNIT TESTING ADD VOTER :::::::::::::::::::
   */
  describe("unit testing addVoter", function () {
    it("revert adding a voter by non authorized user", async () => {
      await expectRevert(
        VotingInstance.addVoter(voter1, { from: voter1 }),
        errorMessages.notOwner
      );
    });
    it("revert adding a voter with no params", async () => {
      await truffleAssert.fails(VotingInstance.addVoter({ from: owner }));
    });
    it("assert adding a voter", async () => {
      const res = await VotingInstance.addVoter(voter1, { from: owner });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on adding a voter", async () => {
      const res = await VotingInstance.addVoter(voter1, { from: owner });
      expectEvent(res, "VoterRegistered", { voterAddress: voter1 });
    });
  });

  /**
   * ::::::::::::::::::: UNIT TESTING GET VOTER :::::::::::::::::::
   */

  describe("Unit testing Getting self as voter", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
    });
    it("assert getting self as no registred address", async () => {
      const firstVoter = await VotingInstance.me({
        from: voter2,
      });
      expect(firstVoter).that.have.any.keys(
        "isRegistered",
        "hasVoted",
        "votedProposalId"
      );
      expect(firstVoter.votedProposalId).to.be.bignumber.equals(BN(0));
      expect(firstVoter.isRegistered).to.be.false;
      expect(firstVoter.hasVoted).to.be.false;
    });
    it("assert getting self as registered address", async () => {
      const firstVoter = await VotingInstance.me({
        from: voter1,
      });
      expect(firstVoter).that.have.any.keys(
        "isRegistered",
        "hasVoted",
        "votedProposalId"
      );
      expect(firstVoter.votedProposalId).to.be.bignumber.equals(BN(0));
      expect(firstVoter.isRegistered).to.be.true;
      expect(firstVoter.hasVoted).to.be.false;
    });
  });
  describe("Unit testing Getting a voter", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
    });
    it("revert getting a voter by non authorized user", async () => {
      await expectRevert(
        VotingInstance.getVoter(voter1, { from: owner }),
        errorMessages.notOnlyVoter
      );
      await expectRevert(
        VotingInstance.getVoter(voter1, { from: noWhitlistedUser }),
        errorMessages.notOnlyVoter
      );
    });
    it("revert getting a voter with no params", async () => {
      await truffleAssert.fails(VotingInstance.getVoter({ from: voter1 }));
    });
    it("assert getting an empty voter by inexisting address", async () => {
      const firstVoter = await VotingInstance.getVoter(voter2, {
        from: voter1,
      });
      expect(firstVoter).that.have.any.keys(
        "isRegistered",
        "hasVoted",
        "votedProposalId"
      );
      expect(firstVoter.votedProposalId).to.be.bignumber.equals(BN(0));
      expect(firstVoter.isRegistered).to.be.false;
      expect(firstVoter.hasVoted).to.be.false;
    });
    it("assert getting a voter by existing id", async () => {
      const firstVoter = await VotingInstance.getVoter(voter1, {
        from: voter1,
      });
      expect(firstVoter).that.have.any.keys(
        "isRegistered",
        "hasVoted",
        "votedProposalId"
      );
      expect(firstVoter.votedProposalId).to.be.bignumber.equals(BN(0));
      expect(firstVoter.isRegistered).to.be.true;
      expect(firstVoter.hasVoted).to.be.false;
    });
  });
  /**
   * ::::::::::::::::::: UNIT TESTING ADD PROPOSAL :::::::::::::::::::
   */
  describe("unit testing addProposal", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
    });

    it("revert adding a proposal by non authorized user", async () => {
      await expectRevert(
        VotingInstance.addProposal("description", { from: owner }),
        errorMessages.notOnlyVoter
      );
    });
    it("revert adding a proposal with no params", async () => {
      await truffleAssert.fails(VotingInstance.addProposal({ from: voter1 }));
    });
    it("revert adding a proposal with empty description", async () => {
      await expectRevert(
        VotingInstance.addProposal("", { from: voter1 }),
        "Vous ne pouvez pas ne rien proposer"
      );
    });
    it("assert adding a proposal", async () => {
      const res = await VotingInstance.addProposal("description", {
        from: voter1,
      });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on adding a proposal", async () => {
      const res = await VotingInstance.addProposal("description", {
        from: voter1,
      });
      expectEvent(res, "ProposalRegistered", { proposalId: BN(1) });
    });
  });

  /**
   * ::::::::::::::::::: UNIT TESTING GET ONE PROPOSAL :::::::::::::::::::
   */
  describe("Unit testing Getting one proposal", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.addProposal("description", { from: voter1 });
    });
    it("revert getting a proposal by non authorized user", async () => {
      await expectRevert(
        VotingInstance.getOneProposal(1, { from: owner }),
        errorMessages.notOnlyVoter
      );
      await expectRevert(
        VotingInstance.getOneProposal(1, { from: noWhitlistedUser }),
        errorMessages.notOnlyVoter
      );
    });
    it("revert getting a proposal with no params", async () => {
      await truffleAssert.fails(
        VotingInstance.getOneProposal({ from: voter1 })
      );
    });
    it("revert getting inexisting proposal", async () => {
      await truffleAssert.fails(
        VotingInstance.getOneProposal(2, { from: voter1 })
      );
    });
    it("assert getting a proposal by existing id", async () => {
      const firstProposal = await VotingInstance.getOneProposal(1, {
        from: voter1,
      });
      expect(firstProposal).that.have.any.keys(
        "description",
        "voteCount",
        "votedProposalId"
      );
      expect(firstProposal.description).to.be.string("description");
      expect(firstProposal.voteCount).to.be.bignumber.equals(BN(0));
    });
  });

  /**
   * ::::::::::::::::::: UNIT TESTING ADDVOTE :::::::::::::::::::
   */
  describe("unit testing setVote", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.addProposal("description", { from: voter1 });
      await VotingInstance.endProposalsRegistering({ from: owner });
      await VotingInstance.startVotingSession({ from: owner });
    });

    it("revert voting by non authorized user", async () => {
      await expectRevert(
        VotingInstance.setVote(1, { from: owner }),
        errorMessages.notOnlyVoter
      );
    });
    it("revert voting with no params", async () => {
      await truffleAssert.fails(VotingInstance.setVote({ from: voter1 }));
    });

    it("revert if proposal unexists", async () => {
      await expectRevert(
        VotingInstance.setVote(2, { from: voter1 }),
        "Proposal not found"
      );
    });
    it("assert voting", async () => {
      const res = await VotingInstance.setVote(1, { from: voter1 });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on voting", async () => {
      const res = await VotingInstance.setVote(1, { from: voter1 });
      expectEvent(res, "Voted", { voter: voter1, proposalId: BN(1) });
    });
  });

  /**
   * ::::::::::::::::::: VOTING SIDE EFFECTS :::::::::::::::::::
   */
  describe("setVote side effects", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.addProposal("description", { from: voter1 });
      await VotingInstance.endProposalsRegistering({ from: owner });
      await VotingInstance.startVotingSession({ from: owner });
      await VotingInstance.setVote(1, { from: voter1 });
    });

    it("assert adding vote count to proposal", async () => {
      const firstProposal = await VotingInstance.getOneProposal(1, {
        from: voter1,
      });
      expect(firstProposal.voteCount).to.be.bignumber.equals(BN(1));
    });
    it("revert if voter has already vote", async () => {
      await expectRevert(
        VotingInstance.setVote(1, { from: voter1 }),
        "You have already voted"
      );
    });
  });

  /**
   * ::::::::::::::::::: CHANGE SESSION SIDE EFFECTS STEP 0  :::::::::::::::::::
   */
  describe("setVote side effects at RegisteringVoters step", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
    });
    it("revert change status by non authorized user", async () => {
      await expectRevert(
        VotingInstance.startProposalsRegistering({ from: voter1 }),
        errorMessages.notOwner
      );
    });
    it("revert when status is RegisteringVoters", async () => {
      await expectRevert(
        VotingInstance.endProposalsRegistering({ from: owner }),
        "Registering proposals havent started yet"
      );
      await expectRevert(
        VotingInstance.startVotingSession({ from: owner }),
        "Registering proposals phase is not finished"
      );
      await expectRevert(
        VotingInstance.endVotingSession({ from: owner }),
        "Voting session havent started yet"
      );
      await expectRevert(
        VotingInstance.tallyVotes({ from: owner }),
        "Current status is not voting session ended"
      );
    });
    it("assert change to startProposalsRegistering only on status RegisteringVoters ", async () => {
      const res = await VotingInstance.startProposalsRegistering({
        from: owner,
      });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on startProposalsRegistering", async () => {
      const res = await VotingInstance.startProposalsRegistering({
        from: owner,
      });
      expectEvent(res, "WorkflowStatusChange", {
        previousStatus: BN(0),
        newStatus: BN(1),
      });
    });
  });

  /**
   * ::::::::::::::::::: CHANGE SESSION SIDE EFFECTS STEP 1 :::::::::::::::::::
   */
  describe("setVote side effects at ProposalsRegistrationStarted step", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
    });
    it("revert adding a voter by non authorized user", async () => {
      await expectRevert(
        VotingInstance.endProposalsRegistering({ from: voter1 }),
        errorMessages.notOwner
      );
    });

    it("revert change status when status is RegisteringVoters", async () => {
      await expectRevert(
        VotingInstance.startProposalsRegistering({ from: owner }),
        "Registering proposals cant be started now"
      );
      // await expectRevert(
      //     VotingInstance.endProposalsRegistering({ from: owner }),
      //     "Registering proposals havent started yet"
      // );
      await expectRevert(
        VotingInstance.startVotingSession({ from: owner }),
        "Registering proposals phase is not finished"
      );
      await expectRevert(
        VotingInstance.endVotingSession({ from: owner }),
        "Voting session havent started yet"
      );
      await expectRevert(
        VotingInstance.tallyVotes({ from: owner }),
        "Current status is not voting session ended"
      );
    });
    it("assert change to endProposalsRegistering only on status ProposalsRegistrationStarted ", async () => {
      const res = await VotingInstance.endProposalsRegistering({ from: owner });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on endProposalsRegistering", async () => {
      const res = await VotingInstance.endProposalsRegistering({ from: owner });
      expectEvent(res, "WorkflowStatusChange", {
        previousStatus: BN(1),
        newStatus: BN(2),
      });
    });
    it("assert create a genesis proposal startProposalsRegistering", async () => {
      const firstProposal = await VotingInstance.getOneProposal(0, {
        from: voter1,
      });
      expect(firstProposal).that.have.any.keys(
        "description",
        "voteCount",
        "votedProposalId"
      );
      expect(firstProposal.description).to.be.string("GENESIS");
      expect(firstProposal.voteCount).to.be.bignumber.equals(BN(0));
    });
  });

  /**
   * ::::::::::::::::::: CHANGE SESSION SIDE EFFECTS STEP 2 :::::::::::::::::::
   */
  describe("setVote side effects at ProposalsRegistrationEnded step", function () {
    beforeEach(async function () {
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.endProposalsRegistering({ from: owner });
    });
    it("revert adding a voter by non authorized user", async () => {
      await expectRevert(
        VotingInstance.startVotingSession({ from: voter1 }),
        errorMessages.notOwner
      );
    });
    it("revert change status when status is RegisteringVoters", async () => {
      await expectRevert(
        VotingInstance.startProposalsRegistering({ from: owner }),
        "Registering proposals cant be started now"
      );
      await expectRevert(
        VotingInstance.endProposalsRegistering({ from: owner }),
        "Registering proposals havent started yet"
      );
      // await expectRevert(
      //     VotingInstance.startVotingSession({ from: owner }),
      //     "Registering proposals phase is not finished"
      // );
      await expectRevert(
        VotingInstance.endVotingSession({ from: owner }),
        "Voting session havent started yet"
      );
      await expectRevert(
        VotingInstance.tallyVotes({ from: owner }),
        "Current status is not voting session ended"
      );
    });
    it("assert change to endProposalsRegistering only on status ProposalsRegistrationStarted ", async () => {
      const res = await VotingInstance.startVotingSession({ from: owner });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on endProposalsRegistering", async () => {
      const res = await VotingInstance.startVotingSession({ from: owner });
      expectEvent(res, "WorkflowStatusChange", {
        previousStatus: BN(2),
        newStatus: BN(3),
      });
    });
  });
  /**
   * ::::::::::::::::::: CHANGE SESSION SIDE EFFECTS STEP 3 :::::::::::::::::::
   */
  describe("setVote side effects at startProposalsRegistering step", function () {
    beforeEach(async function () {
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.endProposalsRegistering({ from: owner });
      await VotingInstance.startVotingSession({ from: owner });
    });
    it("revert adding a voter by non authorized user", async () => {
      await expectRevert(
        VotingInstance.endVotingSession({ from: voter1 }),
        errorMessages.notOwner
      );
    });
    it("revert change status when status is RegisteringVoters", async () => {
      await expectRevert(
        VotingInstance.startProposalsRegistering({ from: owner }),
        "Registering proposals cant be started now"
      );
      await expectRevert(
        VotingInstance.endProposalsRegistering({ from: owner }),
        "Registering proposals havent started yet"
      );
      await expectRevert(
        VotingInstance.startVotingSession({ from: owner }),
        "Registering proposals phase is not finished"
      );
      // await expectRevert(
      //     VotingInstance.endVotingSession({ from: owner }),
      //     "Voting session havent started yet"
      // );
      await expectRevert(
        VotingInstance.tallyVotes({ from: owner }),
        "Current status is not voting session ended"
      );
    });
    it("assert change to endProposalsRegistering only on status ProposalsRegistrationStarted ", async () => {
      const res = await VotingInstance.endVotingSession({ from: owner });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on endProposalsRegistering", async () => {
      const res = await VotingInstance.endVotingSession({ from: owner });
      expectEvent(res, "WorkflowStatusChange", {
        previousStatus: BN(3),
        newStatus: BN(4),
      });
    });
  });

  /**
   * ::::::::::::::::::: CHANGE SESSION SIDE EFFECTS STEP 4 :::::::::::::::::::
   */
  describe("setVote side effects at endVotingSession step", function () {
    beforeEach(async function () {
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.endProposalsRegistering({ from: owner });
      await VotingInstance.startVotingSession({ from: owner });
      await VotingInstance.endVotingSession({ from: owner });
    });
    it("revert adding a voter by non authorized user", async () => {
      await expectRevert(
        VotingInstance.tallyVotes({ from: voter1 }),
        errorMessages.notOwner
      );
    });
    it("revert change status when status is RegisteringVoters", async () => {
      await expectRevert(
        VotingInstance.startProposalsRegistering({ from: owner }),
        "Registering proposals cant be started now"
      );
      await expectRevert(
        VotingInstance.endProposalsRegistering({ from: owner }),
        "Registering proposals havent started yet"
      );
      await expectRevert(
        VotingInstance.startVotingSession({ from: owner }),
        "Registering proposals phase is not finished"
      );
      await expectRevert(
        VotingInstance.endVotingSession({ from: owner }),
        "Voting session havent started yet"
      );
      // await expectRevert(
      //     VotingInstance.tallyVotes({ from: owner }),
      //     "Current status is not voting session ended"
      // );
    });
    it("assert change to endVotingSession only on status tallyVotes ", async () => {
      const res = await VotingInstance.tallyVotes({ from: owner });
      expect(res.receipt.status).to.be.true;
    });
    it("assert event on tallyVotes", async () => {
      const res = await VotingInstance.tallyVotes({ from: owner });
      expectEvent(res, "WorkflowStatusChange", {
        previousStatus: BN(4),
        newStatus: BN(5),
      });
    });
  });

  /**
   * ::::::::::::::::::: GET WINNER STEP 5 :::::::::::::::::::
   */
  describe("USE CASE Get Winner on higest score", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.addVoter(voter2, { from: owner });
      await VotingInstance.addVoter(voter3, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.addProposal("description", { from: voter1 });
      await VotingInstance.addProposal("winner", { from: voter2 });
      await VotingInstance.endProposalsRegistering({ from: owner });
      await VotingInstance.startVotingSession({ from: owner });
      await VotingInstance.setVote(1, { from: voter1 });
      await VotingInstance.setVote(2, { from: voter2 });
      await VotingInstance.setVote(2, { from: voter3 });
      await VotingInstance.endVotingSession({ from: owner });
      await VotingInstance.tallyVotes({ from: owner });
    });
    it("assert winner is proposal 2", async () => {
      expect(VotingInstance.winningProposalID.call(), 2);
    });
  });
  describe("USE CASE Get Winner equal score, the lastest proposal wins", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.addVoter(voter2, { from: owner });
      await VotingInstance.addVoter(voter3, { from: owner });
      await VotingInstance.addVoter(voter4, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.addProposal("description", { from: voter1 });
      await VotingInstance.addProposal("winner", { from: voter2 });
      await VotingInstance.endProposalsRegistering({ from: owner });
      await VotingInstance.startVotingSession({ from: owner });
      await VotingInstance.setVote(1, { from: voter1 });
      await VotingInstance.setVote(2, { from: voter2 });
      await VotingInstance.setVote(2, { from: voter3 });
      await VotingInstance.setVote(1, { from: voter4 });
      await VotingInstance.endVotingSession({ from: owner });
      await VotingInstance.tallyVotes({ from: owner });
    });
    it("assert winner is proposal 2", async () => {
      expect(VotingInstance.winningProposalID.call(), 2);
    });
  });
  describe("USE CASE Get Winner no one voting", function () {
    beforeEach(async function () {
      await VotingInstance.addVoter(voter1, { from: owner });
      await VotingInstance.addVoter(voter2, { from: owner });
      await VotingInstance.addVoter(voter3, { from: owner });
      await VotingInstance.addVoter(voter4, { from: owner });
      await VotingInstance.startProposalsRegistering({ from: owner });
      await VotingInstance.addProposal("description", { from: voter1 });
      await VotingInstance.addProposal("winner", { from: voter2 });
      await VotingInstance.endProposalsRegistering({ from: owner });
      await VotingInstance.startVotingSession({ from: owner });
      // no votes
      await VotingInstance.endVotingSession({ from: owner });
      await VotingInstance.tallyVotes({ from: owner });
    });
    it("assert winner is proposal GENESIS", async () => {
      expect(VotingInstance.winningProposalID.call(), 0);
    });
  });
});
