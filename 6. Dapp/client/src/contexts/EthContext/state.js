const actions = {
  init: "INIT",
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  me: null,
  currentStep: null,
  proposals: null,
  nbVotes: null,
  nbVoters: null,
  winningProposalId: null,
  oldEvents: null,
  freshEvent: null,
  allEvents: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
    case actions.update:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
