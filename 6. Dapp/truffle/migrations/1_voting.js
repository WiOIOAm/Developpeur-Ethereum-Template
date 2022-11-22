// Import du smart contract "Voting"
const Voting = artifacts.require("Voting");
module.exports = (deployer, network, accounts) => {
  // Deployer le smart contract!
  deployer.deploy(Voting, {
    from: accounts[2],
  });
};
