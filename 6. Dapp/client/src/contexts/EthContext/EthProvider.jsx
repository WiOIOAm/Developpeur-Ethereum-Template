import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateFreshEvent = async (error, { event, returnValues }) => {
    if (error) {
      console.error("updateAppDataOnEvent", error);
    } else {
      const freshEvent = {
        event,
        value:
          event === "WorkflowStatusChange" ? returnValues[1] : returnValues[0],
      };

      dispatch({
        type: actions.update,
        data: { freshEvent },
      });
    }
  };

  const getContractData = useCallback(async () => {
    if (state.contract && state.accounts && state.accounts[0]) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      const account = accounts[0];
      const contract = state.contract;

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
        proposals = await contract.methods
          .getProposals()
          .call({ from: account });

        nbVotes = proposals?.reduce(
          (prev, curr) => prev + parseInt(curr[1]),
          0
        );
      }

      // get count of voters
      const nbVoters = await contract.methods
        .nbVoters()
        .call({ from: account });
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
      oldEvents.forEach(
        ({ event, returnValues, blockHash, blockNumber, id }) => {
          oldies.push({
            event,
            value: returnValues[0],
            blockHash,
            blockNumber,
            id,
          });
        }
      );

      return {
        me,
        currentStep,
        proposals,
        nbVotes,
        nbVoters,
        winningProposalId,
        oldEvents: oldies,
      };
    }
  }, [state.accounts, state.contract]);

  /**
   * ON FRESH EVENT UPDATE DATA
   */
  useEffect(() => {
    const getAppData = async () => {
      const appData = await getContractData();

      dispatch({
        type: actions.update,
        data: {
          ...appData,
        },
      });
    };
    getAppData();

    return () => {};
  }, [getContractData, state.freshEvent]);

  const reload = useCallback(async (artifact) => {
    if (artifact) {
      try {
        /**
         * CONTRACT INIT
         */
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;

        let address, contract;
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);

        dispatch({
          type: actions.init,
          data: {
            artifact,
            web3,
            networkID,
            contract,
            accounts,
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
    const init = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;

        let address, contract;
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        /**
         * EVENTS
         */
        const allEvents = contract.events.allEvents(
          { fromBlock: "latest" },
          updateFreshEvent
        );

        dispatch({
          type: actions.init,
          data: {
            artifact,
            web3,
            networkID,
            contract,
            accounts,
            allEvents,
          },
        });
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, []);

  /**
   * ON ACCOUNT OR CHAIN CHANGED RELOAD APP
   * when changing account or chain
   * reset application data
   * keep in memory the artifact to connect without reloading the page
   * keep once event trigger
   */
  useEffect(() => {
    if (!!window.ethereum) {
      const events = ["chainChanged", "accountsChanged"];
      const handleChange = (e) => {
        dispatch({
          type: actions.init,
          data: {
            ...initialState,
            artifact: state.artifact,
            allEvents: state.allEvents,
          },
        });
        reload(state.artifact);
      };

      events.forEach((e) => window.ethereum.on(e, () => handleChange(e)));
      return () => {
        events.forEach((e) =>
          window.ethereum.removeListener(e, () => handleChange(e))
        );
      };
    }
  }, [reload, state.allEvents, state.artifact]);

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
