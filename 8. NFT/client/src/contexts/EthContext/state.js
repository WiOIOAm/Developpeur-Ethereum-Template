const actions = {
  init: "INIT",
  update: "UPDATE",
  askConnection: "ASK_CONNECTION",
  loading: "LOADING",
  error: "ERROR",
  success: "SUCCESS",
};

const initialState = {
  // blockchain connection
  artifact: null,
  figoArtifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  figoContract: null,
  // dapp data
  me: null,
  askConnection: 0,
  oldEvents: null,
  freshEvent: null,
  allEvents: null,
  experiences: null,
  //
  isLoading: null,
  isSuccess: false,
  errorMessage: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
    case actions.update:
      return { ...state, ...data };
    case actions.askConnection:
      return { ...state, askConnection: state.askConnection + 1 };
    case actions.error:
      return { ...state, errorMessage: data };
    case actions.loading:
      return { ...state, isLoading: data };
    case actions.success:
      return { ...state, isSuccess: data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
