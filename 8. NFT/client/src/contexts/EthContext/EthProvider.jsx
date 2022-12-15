import React, { useReducer, useCallback, useEffect, useContext } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import fillGoodartifact from "contracts/Fillgood";
import figoArtifact from "contracts/FIGO";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getContractData = useCallback(async () => {
    if (
      state.contract &&
      state.figoContract &&
      state.accounts &&
      state.accounts[0]
    ) {
      try {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        const contract = state.contract;
        const figoContract = state.figoContract;

        // get contract Owner
        const owner = await contract.methods.owner().call({ from: account });
        const figo = await figoContract.methods.balanceOf(account).call();

        // Partner
        let partnerExperiences = [];
        const partner = await contract.methods.getSelfAsPartner().call({
          from: account,
        });
        if (partner.experiencesIds) {
          partnerExperiences = await Promise.all(
            partner.experiencesIds.map(async (id) => {
              return await contract.methods.getExperience(id).call({
                from: account,
              });
            })
          );
        }

        // get all Fillgood experiencies
        let experiences = [];
        const experienceIds = await contract.methods.experienceIds().call({
          from: account,
        });
        if (experienceIds) {
          experiences = await Promise.all(
            [...experienceIds].map(async (id) => {
              return await contract.methods.getExperience(parseInt(id)).call({
                from: account,
              });
            })
          );
        }

        const participationsIds =
          (await contract.methods
            .getParticipationsIds()
            .call({ from: account })) || [];
        const participations = await Promise.all(
          participationsIds.map(async (id) => {
            return {
              experienceId: parseInt(id),
              ...(await contract.methods
                .getParticipation(id)
                .call({ from: account })),
              ...(await contract.methods.getExperience(id).call({
                from: account,
              })),
            };
          })
        );

        // create user profile
        const me = {
          address: account,
          isOwner: account === owner,
          figo: web3.utils.fromWei(figo, "ether"),
          participations,
          experiences: partnerExperiences,
        };

        dispatch({
          type: actions.update,
          data: {
            me,
            errorMessage: null,
            experiences,
          },
        });

        return;
      } catch (error) {
        console.error("getContractData", error);
      }
    }
  }, [state.accounts, state.contract, state.figoContract]);

  const reload = useCallback(async (artifact, figoArtifact) => {
    if (artifact && figoArtifact) {
      try {
        /**
         * CONTRACT INIT
         */
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        const { abi: figoAbi } = figoArtifact;

        // Fillgood Contract
        let address, contract;
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        // FIGO contract
        let figoAddress, figoContract;
        figoAddress = figoArtifact.networks[networkID].address;
        figoContract = new web3.eth.Contract(figoAbi, figoAddress);

        dispatch({
          type: actions.init,
          data: {
            artifact,
            figoArtifact,
            web3,
            networkID,
            contract,
            figoContract,
            accounts,
            errorMessage: null,
          },
        });
        getContractData();
      } catch (err) {
        /**
         * when opening the application, if metamask is not connected
         * keep in memory the artifact to connect without reloading the page
         */
        dispatch({
          type: actions.error,
          data: err.message,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (state.askConnection > 0) {
      const init = async () => {
        try {
          const artifact = fillGoodartifact;
          const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
          const accounts = await web3.eth.requestAccounts();
          const networkID = await web3.eth.net.getId();
          const { abi } = artifact;
          const { abi: figoAbi } = figoArtifact;

          // fillgood contract
          let address, contract;
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          // FIGO contract
          let figoAddress, figoContract;
          figoAddress = figoArtifact.networks[networkID].address;
          figoContract = new web3.eth.Contract(figoAbi, figoAddress);

          dispatch({
            type: actions.init,
            data: {
              artifact,
              figoArtifact,
              web3,
              networkID,
              contract,
              figoContract,
              accounts,
              errorMessage: null,
            },
          });
          getContractData();
        } catch (err) {
          dispatch({
            type: actions.error,
            data: err.message,
          });
        }
      };

      init();
    }
  }, [state.askConnection]);

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
            figoArtifact: state.figoArtifact,
          },
        });
        reload(state.artifact, state.figoArtifact);
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
