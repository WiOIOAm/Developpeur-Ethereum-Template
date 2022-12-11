const Fillgood = artifacts.require("Fillgood");
const Figo = artifacts.require("Figo");
const ExperienceTicketing = artifacts.require("ExperienceTicketing");

module.exports = async function (deployer, _network) {
  // DEPLOY FIGO
  await deployer.deploy(Figo);
  const figo = await Figo.deployed();

  // DEPLOY TICKETING
  await deployer.deploy(ExperienceTicketing, "FillGoodExperiences", "FGEXP");
  const ticketing = await ExperienceTicketing.deployed();

  // DEPLOY PROTOCOL
  await deployer.deploy(Fillgood, figo.address, ticketing.address);
  const fillgood = await Fillgood.deployed();
};
