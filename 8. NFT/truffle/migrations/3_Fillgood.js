const Fillgood = artifacts.require("Fillgood");
const Figo = artifacts.require("Figo");
const ExperienceTicketing = artifacts.require("ExperienceTicketing");

module.exports = async function (deployer, _network, accounts) {
  // DEPLOY FIGO
  await deployer.deploy(Figo);
  const figo = await Figo.deployed();

  await figo.faucet(accounts[1], "30000000000000000000000");
  await figo.faucet(accounts[2], "200000000000000000000");

  // DEPLOY TICKETING
  await deployer.deploy(ExperienceTicketing, "FillGoodExperiences", "FGEXP");
  const ticketing = await ExperienceTicketing.deployed();

  // DEPLOY PROTOCOL
  await deployer.deploy(Fillgood, figo.address, ticketing.address);
  const fillgood = await Fillgood.deployed();
  await figo.approve(fillgood.address, "10000000000000000000000000", {
    from: accounts[1],
  });
  await fillgood.buyPack(1, { from: accounts[1] });
  res = await fillgood.addExperience(
    10, //_nbTickets,
    2000000000000000000n, // _price, 2 FIGO
    1000000000000000000n, //_reward 1 FIGO
    1702314345, //_date,  10/12/2023
    "Séance de muscu au bureau", // _name,
    "Fitness", // _experienceType,
    "3 rue colonel Roux 05000 GAP", // _meetingPlace, mon bureau
    { from: accounts[1] }
  );
};
