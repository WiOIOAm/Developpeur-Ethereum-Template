const Fillgood = artifacts.require("fillgood.sol");
const Figo = artifacts.require("Figo");
const ExperienceTicketing = artifacts.require("ExperienceTicketing");

const truffleAssert = require("truffle-assertions");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("Ticketing", function (accounts) {
  const owner = accounts[0];
  const user1 = accounts[1];

  beforeEach("should setup the contract instance", async () => {
    ticketing = await ExperienceTicketing.new("Ticketing", "TKT", {
      from: owner,
    });
  });

  describe("Create a ticket inside collection", function () {
    it("should add ticket", async function () {
      const res = await ticketing.createTicket(
        0, // uint256 experienceId
        10, // uint32 _nbTickets,
        1702314345, // uint256 _date, Sunday 11 December 2023
        "test du ticket" //  string memory _name
      );

      const ticket = await ticketing.tickets.call(0);

      expectEvent(res, "TicketCreated", {
        experienceId: BN(0),
      });
      expect(ticket.nbTickets).to.be.bignumber.equals(BN(10));
      expect(ticket.date).to.be.bignumber.equals(BN(1702314345));
      expect(ticket.name).to.be.string("test du ticket");
    });
  });
  describe("Mint a ticket of this collection", function () {
    beforeEach("should setup the contract instance", async () => {
      await ticketing.createTicket(
        0, // uint256 experienceId
        2, // uint32 _nbTickets,
        1702314345, // uint256 _date, Sunday 11 December 2022 13:53:37
        "test du ticket" //  string memory _name
      );
    });
    it("should mint for users", async function () {
      const isMinted = await ticketing.mint(
        user1, //    address _athlete,
        0, //  uint256 _experienceId,
        "ipfs://hash/id.json", // string memory _tokenURI
        1, // _quantity
        "0x" // _data,
      );
      const toKenURI = await ticketing.uri.call(0);

      expectEvent(isMinted, "TransferSingle", {
        operator: owner,
        from: "0x0000000000000000000000000000000000000000",
        to: user1,
        id: BN(0),
        value: BN(1),
      });

      expect(toKenURI).to.be.string("ipfs://hash/id.json");
    });
    it("should revert experience ticket not exists", async function () {
      await expectRevert(
        ticketing.mint(user1, 1, "ipfs://hash/id.json", 1, "0x"),
        "This ticket not exists -- Reason given: This ticket not exists"
      );
    });
    it("should revert if has not enought tickets", async function () {
      await expectRevert(
        ticketing.mint(user1, 0, "ipfs://hash/id.json", 5, "0x"),
        "Not enough tickets for sale"
      );
    });
  });
  describe("Mint an outdated ticket of this collection", function () {
    beforeEach("should setup the contract instance", async () => {
      await ticketing.createTicket(
        1, // uint256 experienceId
        2, // uint32 _nbTickets,
        1545609600, // uint256 _date, 2018-12-24T00:00:00Z
        "test du ticket" //  string memory _name
      );
    });
    it("should revert on outdated experience", async function () {
      await expectRevert(
        ticketing.mint(user1, 1, "ipfs://hash/id.json", 1, "0x"),
        "Event is outdated"
      );
    });
  });
});
