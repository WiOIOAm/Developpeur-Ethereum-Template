## Table of Contents

1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Run testing](#runtesting)
5. [CI](#ci)
6. [FAQs](#faqs)
7. [Crédits](#credits)

### General Info

---

The second project of Alyra's developer course requires us to prove our skills in testing solidity contracts. In addition, we should to show our ability to integrate into team projects.

## Technologies

---

A list of technologies used within the project:

- [truffle](https://github.com/trufflesuite/truffle): Version ^5.6.1
- [truffle-assertions](https://github.com/rkalis/truffle-assertions): Version ^0.9.2
- [eth-gas-reporter](https://github.com/cgewecke/eth-gas-reporter): Version ^0.2.25
- [@openzeppelin/test-helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers): Version ^0.5.16
- [@openzeppelin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts): Version ^4.7.3

## Installation

---

Before running tests, please clone then install

```
$ git clone https://github.com/julie-ramadanoski/Developpeur-Ethereum-Template.git
$ cd 4.\ Truffle\ \&\ CI-CD/
$ yarn install
```

## Run testing

---

Before running test you must lauch Truffle development environnement in a separate terminal.

```
$ yarn develop
```

then in another terminal

```
$ yarn test
```

## CI

---

Husky configured at the top of the projetct for pre-commit action :

- lint this exercice with prettier and solidity extension
- testing this exercice

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

## Testing Coverage

---

### Screenshot

![first exercice testing result](https://cdn.discordapp.com/attachments/1018853513138274315/1031316704011227186/unknown.png)

## Credits

---

the cobe base of original contract is not mine. Many thanks to:

- [@lecascyril](https://github.com/lecascyril/CodesRinkeby/blob/main/voting.sol) - correction of exercice

## Licence

---

MIT
