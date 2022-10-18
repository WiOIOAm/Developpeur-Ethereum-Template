const Voting = artifacts.require("Voting.sol");
const truffleAssert = require('truffle-assertions');

contract("Voting", function (accounts) {
    userAdmin = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    user3 = accounts[3];
    noWhitlistedUser = accounts[4];

    let voting;
    beforeEach('should setup the contract instance', async () => {
        voting = await Voting.deployed();
    });

    /**
     *     L'administrateur du vote enregistre une liste blanche d'électeurs identifiés par leur adresse Ethereum.
     */
    it("should assert initial state empty", async function () {
        const contractOwner = await voting.owner();
        const status = await voting.status();
        const winningProposalId = await voting.winningProposalId();
        const voter1 = await voting.voters(user1);

        assert.equal(contractOwner, userAdmin, "le propriétaire doit etre l'administrateur");
        assert.equal(status.toNumber(), 0, "le statut initial doit etre l'enregistrement des votants");
        assert.equal(winningProposalId.toNumber(), 0, "le gagnant ne doit pas etre designé");
        assert.equal(voter1.isRegistered, false, "un visiteur ne doit pas avoir le droit de participer");

    });

    it("should revert on non admin user register a voter", async function () {
        await truffleAssert.reverts(voting.registerVoter(user2, {
            'from': user1
        }));
    });

    it("should assert adding new voters by admin", async function () {
        await voting.registerVoter(user1, { from: userAdmin });
        await voting.registerVoter(user2, { from: userAdmin });
        await voting.registerVoter(accounts[5], { from: userAdmin });
        await voting.registerVoter(accounts[6], { from: userAdmin });
        await voting.registerVoter(accounts[7], { from: userAdmin });
        await voting.registerVoter(accounts[8], { from: userAdmin });
        await voting.registerVoter(accounts[9], { from: userAdmin });
        const result = await voting.registerVoter(user3, { from: userAdmin });
        truffleAssert.eventEmitted(result, 'VoterRegistered');

        const voter1 = await voting.voters(user1);
        assert.equal(voter1.isRegistered, true, "le votant doit pourvoir participer");

    });
    /**
     * L'administrateur du vote commence la session d'enregistrement de la proposition.
     */
    it("should revert on non admin change status", async function () {
        await truffleAssert.reverts(voting.changeStatus(1, {
            'from': user1
        }));
    });

    it("should assert admin can change status", async function () {
        const result = await voting.changeStatus(1, {
            'from': userAdmin
        });
        truffleAssert.eventEmitted(result, 'WorkflowStatusChange');

        const status = await voting.status();
        assert.equal(status.toNumber(), 1, "Le statut doit etre passé à ProposalsRegistrationStarted");
    });

    it("should revert on non registered user add proposal", async function () {
        await truffleAssert.reverts(voting.registerProposal("description malicieuse", {
            'from': noWhitlistedUser
        }));
    });

    /**
     * Les électeurs inscrits sont autorisés à enregistrer leurs propositions pendant que la session d'enregistrement est active.
     */
    it("should revert on admin registered voters out of register session", async function () {
        await truffleAssert.reverts(voting.registerVoter(user1, {
            'from': userAdmin
        }));
    });

    it("should assert registered users can add proposal", async function () {
        const description = "description pertinente";
        const result = await voting.registerProposal(description, {
            'from': user1
        });
        truffleAssert.eventEmitted(result, 'ProposalRegistered');
        // vote 0 est le vote blanc
        const proposal = await voting.proposals(1);
        assert.equal(proposal.description, description, "La description doit etre enregistrée");

        // add 2 proposals
        await voting.registerProposal("Autre proposition", {
            'from': user2
        });
        await voting.registerProposal("troisième proposition", {
            'from': user2
        });
    });

    /**
     * L'administrateur de vote met fin à la session d'enregistrement des propositions.
     */
    it("should revert on add proposals out of proposals session", async function () {
        await voting.changeStatus(2, {
            'from': userAdmin
        });
        await truffleAssert.reverts(voting.registerProposal("proposition passée hors de la session", {
            'from': user2
        }));
    });
    /**
     * L'administrateur du vote commence la session de vote.
     * Les électeurs inscrits votent pour leur proposition préférée.
     */
    it("should assert registred user can vote", async function () {
        await voting.changeStatus(3, {
            'from': userAdmin
        });

        // Create equality, the winner is the first to add proposal
        const result = await voting.registerVote(1, {
            'from': user1
        });
        truffleAssert.eventEmitted(result, 'Voted');

        await voting.registerVote(2, {
            'from': user2
        });
        await voting.registerVote(2, {
            'from': user3
        });
        await voting.registerVote(3, {
            'from': accounts[5]
        });
        await voting.registerVote(3, {
            'from': accounts[6]
        });
        // proposal 0  = vote blanc
        const proposal1 = await voting.proposals(1);
        const proposal2 = await voting.proposals(2);
        const proposal3 = await voting.proposals(3);
        assert.equal(proposal1.voteCount, 1, "La proposition 0 doit avoir 1 vote");
        assert.equal(proposal2.voteCount, 2, "La proposition 1 doit avoir 2 votes"); // proposition gagnante
        assert.equal(proposal3.voteCount, 2, "La proposition 2 doit avoir 2 votes");
    });

    it("should assert registred user save voting choice", async function () {
        const voter1 = await voting.voters(user1);
        const voter2 = await voting.voters(user2);
        const voter3 = await voting.voters(user3);
        const voter5 = await voting.voters(accounts[5]);
        const voter6 = await voting.voters(accounts[6]);
        assert.equal(voter1.votedProposalId, 1, "user1 a voté pour La proposition 1 ");
        assert.equal(voter2.votedProposalId, 2, "user2 a voté pour La proposition 2");
        assert.equal(voter3.votedProposalId, 2, "user3 a voté pour La proposition 2");
        assert.equal(voter5.votedProposalId, 3, "user5 a voté pour La proposition 3");
        assert.equal(voter6.votedProposalId, 3, "user6 a voté pour La proposition 3");
    });

    it("should revert on vote by no registrered user", async function () {
        await truffleAssert.reverts(voting.registerVote(0, {
            'from': noWhitlistedUser
        }));
    });

    it("should revert on vote twice or more by registred user", async function () {
        await truffleAssert.reverts(voting.registerVote(0, {
            'from': user1
        }));
    });

    /**
     * L'administrateur du vote met fin à la session de vote.
     * L'administrateur du vote comptabilise les votes.
     */
    it("should revert on get winner details out of VotesTallied session", async function () {
        await truffleAssert.reverts(voting.getWinnerDetails({
            'from': user1
        }));
    });

    it("should revert on get winner details by non registred user", async function () {
        await truffleAssert.reverts(voting.getWinnerDetails({
            'from': noWhitlistedUser
        }));
    });

    it("should revert on calculate winner out of VotingSessionEnded session", async function () {
        await truffleAssert.reverts(voting.countingVotes({
            'from': userAdmin
        }));
    });

    it("should assert admin can calcule winner", async function () {
        await voting.changeStatus(4, {
            'from': userAdmin
        });
        await voting.countingVotes({
            'from': userAdmin
        });
        const winningProposalId = await voting.winningProposalId();
        assert.equal(winningProposalId.toNumber(), 2, "La proposition gagnante est la 2");
    });
    /**
     *   Tout le monde peut vérifier les derniers détails de la proposition gagnante.
     */
    it("should assert registred user can see winner details", async function () {
        await voting.changeStatus(5, {
            'from': userAdmin
        });
        const winnerDescription = await voting.getWinnerDetails({
            'from': user1
        });
        assert.equal(winnerDescription, "Autre proposition", "La description doit etre 'autre proposition'");

    });
});

