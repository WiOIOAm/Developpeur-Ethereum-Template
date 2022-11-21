import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getContractData = async (contract, account) => {
    // get contract Owner
    const owner = await contract.methods.owner().call({ from: account });

    // create user profile
    const getSelfVoter = await contract.methods.me().call({ from: account });
    const me = {
      address: account,
      isOwner: account === owner,
      isRegistered: !!getSelfVoter?.isRegistered,
      hasVoted: !!getSelfVoter?.hasVoted,
      votedProposalId: parseInt(getSelfVoter?.votedProposalId || 0),
    };

    let proposals = false;
    let nbVotes = false;
    if (me.isRegistered) {
      // get proposals an count of votes
      proposals = await contract.methods.getProposals().call({ from: account });

      nbVotes = proposals?.reduce((prev, curr) => prev + parseInt(curr[1]), 0);
    }

    // get count of voters
    const nbVoters = await contract.methods.nbVoters().call({ from: account });
    const winningProposalId = await contract.methods
      .winningProposalID()
      .call({ from: account });

    // get Voting current step
    const currentStep = await contract.methods
      .workflowStatus()
      .call({ from: account });

    // get past events
    let oldEvents = await contract.getPastEvents("allEvents", {
      fromBlock: 0,
      toBlock: "latest",
    });
    let oldies = [];
    oldEvents.forEach(({ event, returnValues, blockHash, blockNumber, id }) => {
      oldies.push({
        event,
        value: returnValues[0],
        blockHash,
        blockNumber,
        id,
      });
    });

    return {
      me,
      currentStep,
      proposals,
      nbVotes,
      nbVoters,
      winningProposalId,
      oldEvents: oldies,
    };
  };

  const init = useCallback(async (artifact) => {
    if (artifact) {
      try {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);

        // get last event and update app data
        await contract.events
          .allEvents({ fromBlock: "earliest" })
          .on("data", async ({ event, returnValues }) => {
            const freshEvent = {
              event,
              value:
                event === "WorkflowStatusChange"
                  ? returnValues[1]
                  : returnValues[0],
            };
            const appData = await getContractData(contract, accounts[0]);

            dispatch({
              type: actions.update,
              data: { freshEvent, ...appData },
            });
          });

        // get contract data
        const appData = await getContractData(contract, accounts[0]);
        dispatch({
          type: actions.init,
          data: {
            artifact,
            web3,
            accounts,
            networkID,
            contract,
            ...appData,
          },
        });
      } catch (err) {
        /**
         * when opening the application, if metamask is not connected
         * keep in memory the artifact to connect without reloading the page
         */
        dispatch({
          type: actions.init,
          data: { ...initialState, artifact },
        });
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    if (!!window.ethereum) {
      const events = ["chainChanged", "accountsChanged"];
      const handleChange = () => {
        /**
         * when changing account or chain
         * reset application data
         * keep in memory the artifact to connect without reloading the page
         */
        dispatch({
          type: actions.init,
          data: { ...initialState, artifact: state.artifact },
        });
        init(state.artifact);
      };

      events.forEach((e) => window.ethereum.on(e, handleChange));
      return () => {
        events.forEach((e) => window.ethereum.removeListener(e, handleChange));
      };
    }
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
