import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setGreeter }) {
  const { state: { contract, accounts,networkID} } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [greetValue, setGreetValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };const handleInputGreetChange = e => {
    if (/^\w+$|^$/.test(e.target.value)) {
      setGreetValue(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };
   const greet = async () => {
    const value = await contract.methods.greet().call({ from: accounts[0] });
    console.log("GREET", value)
    setGreeter(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };
   const writeGreet = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (greetValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    await contract.methods.setGreet(greetValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      ChainID : {networkID}

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

       <button onClick={greet}>
        greet()
      </button>

      <div onClick={writeGreet} className="input-btn">
        setGreeter(<input
          type="text"
          placeholder="string"
          value={greetValue}
          onChange={handleInputGreetChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
