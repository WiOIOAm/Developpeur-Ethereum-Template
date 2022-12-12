## Table of Contents

1. [General Info](#general-info)
1. [CI](#ci)
1. [Documentation](#documentation)
1. [Theming](#theming)
1. [Truffle Technologies](#truffle-technologies)
1. [Installation](#installation)
1. [Run tests](#run-tests)
1. [FAQs](#faqs)
1. [Crédits](#credits)
1. [Licence](#licence)

### General Info

---

Welcome to Fillgood, the application that rewards athletes and organizers!
Alyra's final certification project will be on the imposed figure of the NFT market place

[Développé par : Julie Ramadanoski](https://www.linkedin.com/in/julie-ramadanoski/)

[DApp deployed on vercel](https://alyra-certification-fillgood.vercel.app/)

[Accès au depot git](https://github.com/julie-ramadanoski/Developpeur-Ethereum-Template/tree/6799f1c172e5dba8f87b9f6627c2f6b16a0ee507/8.%20NFT)

[Vidéo de démo](https://youtu.be/IFG3l74yJP4)

### Views

![landing page Fillgood](https://julie-ramadanoski.dev/wp-content/uploads/2022/12/screenshootlanding.png)

## CI

---

This repository is based on reactbox. `truffle` directory contains smart contracts developpement environnement. `client` directory is the front office built-in ReactRs.

### Husky

Husky configured at the top of the project for pre-commit actions :

- lint this exercice with prettier and solidity extension
- generate documentation
- testing smart contract
- adding updated files in commit

### Vercel

Vercel is connected to this repository :
[deploy client side](https://alyra-certification-fillgood.vercel.app/) https://alyra-certification-fillgood.vercel.app/

## Documentation

---

### Solidocs2

Smart contracts docs are availlable from front office
Please find MD format documentation in the `./client/src/docs` directory.

## Theming

---

Theme : BLK• React

The front office is made with [blk-design-system-react](https://demos.creative-tim.com/blk-design-system-react/?_ga=2.131294991.1229066061.1670408682-1201696954.1670408682#/components)

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
$ cd 8.\ NFT/truffle/
$ yarn install

$ cd  8.\ NFT/client/
$ yarn install
```

## Run Truffle tests

---

Before running test you must lauch Truffle development environnement in a separate terminal.

```
$ cd 8.\ NFT/truffle/
$ yarn develop
```

then in another terminal

```
$ cd 8.\ NFT/truffle/
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

## Run tests

---

**NOTE**: HardhatEVM and ganache-cli implement the Ethereum blockchain. To get accurate gas measurements for other chains you may need to run your tests against development clients developed specifically for those networks.

## Testing

![tests lists](https://julie-ramadanoski.dev/wp-content/uploads/2022/12/fillgoodtests.png)

### Gaz fees

![gaz costs](https://julie-ramadanoski.dev/wp-content/uploads/2022/12/fillgoodGaz.png)

---

## Credits

---

- [@julie-ramadanoski](https://github.com/julie-ramadanoski/Developpeur-Ethereum-Template/tree/master/8.%20NFT) - creation of smart contract and Dapp

## Licence

---

UNLICENCIED - this code is not open source.
