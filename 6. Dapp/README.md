## Table of Contents

1. [General Info](#general-info)
1. [CI](#ci)
1. [Documentation](#documentation)
1. [Theming](#theming)
1. [Truffle Technologies](#truffle-technologies)
1. [Installation](#installation)
1. [Run tests](#run-testing)
1. [FAQs](#faqs)
1. [Crédits](#credits)

### General Info

---

The third project of Alyra's developer course, requires us to prove our skills in frontend developpement. We'll be able to dialog with the blockchain via a Decentralized Application. In addition, we should to show our ability to deploy secure applications, smarts contracts including.

This repository is based on reactbox. `truffle` directory contains smart contracts developpement environnement. `client` directory is the front office built-in ReactRs.

## CI

---

### Husky

Husky configured at the top of the project for pre-commit actions :

- lint this exercice with prettier and solidity extension
- generate documentation
- testing smart contract
- adding updated files in commit

### Vercel

Vercel is connected to this repository :
[deploy client side](developpeur-ethereum-template-vqzt2mfv4-jenelius.vercel.app) developpeur-ethereum-template-vqzt2mfv4-jenelius.vercel.app

## Documentation

---

### Solidocs2

Smart contracts docs are availlable from front office
Please find MD format documentation in the `./client/src/docs` directory.

### Storybook

Please read developper documentation for ReactJS components in [storybook live application](https://636d3b6242ab8408095073c6-htlrbgfuok.chromatic.com)

To [publish your storybook project](https://storybook.js.org/docs/react/sharing/publish-storybook) in live add your `CHROMATIC_PROJECT_TOKEN` in `client/.env`

## Theming

---

Theme : Minimal Free – Client & Admin Dashboard

This application is contruct with [MUI REACT Template](https://github.com/minimal-ui-kit/material-kit-react)

## Truffle Technologies

---

A list of technologies used within the project:

- [@openzeppelin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts): Version ^4.7.3
- [@openzeppelin/test-helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers): Version ^0.5.16
- [dotenv](https://github.com/motdotla/dotenv) Version ^16.0.3
- [@truffle/hdwallet-provider](github.com/trufflesuite/truffle): Version ^2.0.10
- [eth-gas-reporter](https://github.com/cgewecke/eth-gas-reporter): Version ^0.2.25
- [sovryn-solidoc](https://github.com/DistributedCollective/solidoc2#develop): Version develop
- [truffle](https://github.com/trufflesuite/truffle): Version ^5.6.4
- [truffle-assertions](https://github.com/rkalis/truffle-assertions): Version ^0.9.2

## Installation

---

Before running tests, please clone then install

```
$ git clone https://github.com/julie-ramadanoski/Developpeur-Ethereum-Template.git
$ cd 6.\ Dapp/truffle
$ yarn install
$ cd  6.\ Dapp/client
$ yarn install
```

## Run Truffle tests

---

Before running test you must lauch Truffle development environnement in a separate terminal.

```
$ cd 6.\ Dapp/truffle/
$ yarn develop
```

then in another terminal

```
$ cd 6.\ Dapp/truffle/
$ yarn test
```

## FAQs

---

A list of frequently asked questions

1. **Yarn command not found**
   Sure you can use npm instead. please refer to [yarn installation guide](https://yarnpkg.com/getting-started/install)
2. **Something went wrong while attempting to connect to the network at http://127.0.0.1:9545.**
   there is some possibilities to solve this error:

- Make sure you've got truffle developpement environnement is running in an other terminal
- checking the portin `truffle-config.js` . By default 9545 or 8545 are used.

## Gaz fees mesurment

---

**NOTE**: HardhatEVM and ganache-cli implement the Ethereum blockchain. To get accurate gas measurements for other chains you may need to run your tests against development clients developed specifically for those networks.

### Screenshot

![first exercice testing result](https://julie-ramadanoski.dev/wp-content/uploads/2022/10/tp2Gaz-fees.png)

## Testing Coverage

---

## Credits

---

the cobe base of original contract is not mine. Many thanks to:

- [@lecascyril](https://github.com/lecascyril/CodesRinkeby/blob/main/voting.sol) - correction of exercice

## Licence

---

MIT
