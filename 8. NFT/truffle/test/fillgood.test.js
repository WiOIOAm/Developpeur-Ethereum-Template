const Fillgood = artifacts.require("fillgood.sol");
const Figo = artifacts.require("Figo");
const ExperienceTicketing = artifacts.require("ExperienceTicketing");

const truffleAssert = require("truffle-assertions");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("Fillgood", function (accounts) {
  const owner = accounts[0];
  const userGold = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[3];
  const noUser = accounts[4];

  let fillgood;
  let ticketing;
  let figo;
  beforeEach("should setup the contract instance", async () => {
    figo = await Figo.new({ from: owner });
    ticketing = await ExperienceTicketing.new("", { from: owner });
    fillgood = await Fillgood.new(figo.address, ticketing.address, {
      from: owner,
    });

    // faucetes
    await figo.faucet(userGold, 3000000000000000000000n);
    await figo.faucet(user2, 2000000000000000000000n);
    await figo.approve(fillgood.address, "10000000000000000000000", {
      from: userGold,
    });
  });

  describe("Initialize fillgoods plateform", function () {
    it("should assert initial state packs", async function () {
      const pack = await fillgood.packs.call(1);
      expect(pack).that.have.any.keys(
        "nbMaxExperiences",
        "name",
        "price",
        "fees"
      );
      expect(pack.nbMaxExperiences).to.be.bignumber.equals(BN(0));
      expect(pack.name).to.be.string("Gold");
      expect(pack.price).to.be.bignumber.equals(BN(2500000000000000000000n)); // 2500 + 18 decimales
      expect(pack.fees).to.be.bignumber.equals(BN(0));
    });
  });
  describe("Become Partner", function () {
    it("should assert add a partner when buy a pack", async function () {
      const res = await fillgood.buyPack(1, { from: userGold }); //gold pack à 2500 FIGO
      const myUserGold = await fillgood.getPartnerByAddress(userGold, {
        from: owner,
      });

      expectEvent(res, "offerSold", {
        partnerAddress: userGold,
        offerName: "Gold",
      });
      expect(myUserGold.partnerId, BN(1));
      expect(myUserGold.experiencesIds, []);
      expect(myUserGold.offer, BN(1));
      expect(await figo.balanceOf(fillgood.address)).to.be.bignumber.equal(
        BN(2500000000000000000000n)
      );
    });
    it("should revert add a partner when already get this pack", async function () {
      await fillgood.buyPack(1, { from: userGold });
      await expectRevert(
        fillgood.buyPack(1, { from: userGold }),
        "you already have this offer"
      );
    });
    it("should revert if no approval for fillgood to spend my tokens", async function () {
      await expectRevert(
        fillgood.buyPack(1, { from: user2 }),
        "ERC20: insufficient allowance -- Reason given: ERC20: insufficient allowance."
      );
    });
    it("should revert add a partner when has not enought fund", async function () {
      await figo.approve(fillgood.address, "10000000000000000000000", {
        from: noUser,
      });
      await expectRevert(
        fillgood.buyPack(1, { from: noUser }),
        "ERC20: transfer amount exceeds balance -- Reason given: ERC20: transfer amount exceeds balance."
      );
    });

    /// TODO un partenaire peut changer d'offre ou résilier
    // à la différence de prix à la hausse, paye le montant et change de forfait
    // a la baisse ne paye pas pas et change de forfait
  });
  describe("Partners create experience", function () {
    let res;
    beforeEach(async function () {
      await fillgood.buyPack(1, { from: userGold });
      res = await fillgood.addExperience(
        10, //_nbTickets,
        2000000000000000000n, // _price, 2 FIGO
        1000000000000000000n, //_reward 1 FIGO
        1702314345, //_date,  10/12/2023
        "Séance de muscu au bureau", // _name,
        "Fitness", // _experienceType,
        "3 rue colonel Roux 05000 GAP", // _meetingPlace, mon bureau
        { from: userGold }
      );
    });
    // payer pour créer une expérience me rajoute en tant que partenaire dans fillgood si je n'existe pas déjà

    it("should assert add a fillgood experience", async function () {
      expectEvent(res, "ExperienceAdded", {
        partnerAddress: userGold,
        experienceName: "Séance de muscu au bureau",
      });
      const expectedPartnerId = 1;

      const experience = await fillgood.experiences.call(1);
      expect(experience).that.have.any.keys(
        "partnerId",
        "experienceId",
        "nbTickets",
        "nbTicketsSold",
        "price",
        "reward",
        "date",
        "name",
        "experienceType",
        "meetingPlace"
      );
      expect(experience.partnerId).to.be.bignumber.equals(
        BN(expectedPartnerId)
      );
      expect(experience.experienceId).to.be.bignumber.equals(BN(1));
      expect(experience.nbTickets).to.be.bignumber.equals(BN(10));
      expect(experience.nbTicketsSold).to.be.bignumber.equals(BN(0));
      expect(experience.price).to.be.bignumber.equals(BN(2000000000000000000n));
      expect(experience.reward).to.be.bignumber.equals(
        BN(1000000000000000000n)
      );
      expect(experience.date).to.be.bignumber.equals(BN(1702314345));
      expect(experience.name).to.be.string("Séance de muscu au bureau");
      expect(experience.experienceType).to.be.string("Fitness");
      expect(experience.meetingPlace).to.be.string(
        "3 rue colonel Roux 05000 GAP"
      );

      const partnersAddress = await fillgood.getPartnerAddressById.call(
        expectedPartnerId
      );
      expect(partnersAddress).to.be.equals(userGold);
    });

    /// TODO   on ne peut pas créer d'expérience si je suis premium et que je dépasse mon quota d'expérience par mois
  });
  describe("Participant registering experience", function () {
    beforeEach(async function () {
      await fillgood.buyPack(1, { from: userGold });
      const res = await fillgood.addExperience(
        10, //_nbTickets,
        2000000000000000000n, // _price, 2 FIGO
        1000000000000000000n, //_reward 1 FIGO
        1702314345, //_date,  10/12/2023
        "Séance de muscu au bureau", // _name,
        "Fitness", // _experienceType,
        "3 rue colonel Roux 05000 GAP", // _meetingPlace, mon bureau
        { from: userGold }
      );
      await figo.approve(fillgood.address, "10000000000000000000000", {
        from: user2, // 10 000 FIGO aprouvé pour usergold
      });
    });
    it("should assert register to an experience", async function () {
      const idExpereience = 1;
      const res = await fillgood.registerParticipant(idExpereience, {
        from: user2,
      });

      expect(await figo.balanceOf(userGold)).to.be.bignumber.equal(
        BN(
          3000000000000000000000n -
            2500000000000000000000n +
            2000000000000000000n
        )
      );
      expectEvent(res, "ParticipantRegistered", {
        participantAddress: user2,
        experienceName: "Séance de muscu au bureau",
      });
      // je paye en FIGO pour une expérience
      //  une partei a organisateur
      // paye les reward  a figo en attendant remboursement
      // je suis inscrit à l'expérience

      // je mint mon billet de la collection de l'organisateur
      const finalBalance = await ticketing.balanceOf(user2, idExpereience);
      expect(finalBalance).to.be.bignumber.equals(BN(1));
    });
    it("should revert if no approval for fillgood to spend my tokens", async function () {
      await expectRevert(
        fillgood.registerParticipant(1, { from: user3 }),
        "ERC20: insufficient allowance -- Reason given: ERC20: insufficient allowance."
      );
    });
    it("should revertregister if has not FIGO enought", async function () {
      await figo.approve(fillgood.address, "10000000000000000000000", {
        from: user3,
      });
      await expectRevert(
        fillgood.registerParticipant(1, { from: user3 }),
        "ERC20: transfer amount exceeds balance -- Reason given: ERC20: transfer amount exceeds balance."
      );
    });
    it("should revert  if already registered", async function () {
      await fillgood.registerParticipant(1, { from: user2 });
      await expectRevert(
        fillgood.registerParticipant(1, { from: user2 }),
        "You are already registered"
      );
    });
  });

  /// récupérer ma preuve de participation
  // je scanne le QRCODE, fillgod sait que j'ai participé
  // je demande mon poap si j'ai scanné le QRCODE je mint le poap de l'organisateur, fillgood me rembourse la récompense
  //Exemple : Je paye mon billet 10 FIGO, Le cashback est de 1 FIGO, Au moment du paiement, l'organisateur reçoit 9 FIGO. Les 1 FIGO restant sont en "pending" en attendant que la personne récupère son POA. Si il récupère le POA, le cashback 1 FIGO revient à l'utilisateur. Si il n'est pas récupéré avant 1 semaine, alors il est envoyé à l'organisateur
});
