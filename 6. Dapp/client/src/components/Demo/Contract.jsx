import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Contract({ value, greeter }) {
  const spanEle = useRef(null);
  const spanEle2 = useRef(null);
  const [eventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  const {
    state: { contract },
  } = useEth();

  useEffect(() => {
    (async function () {
      let oldEvents = await contract.getPastEvents("valueChanged", {
        fromBlock: 0,
        toBlock: "latest",
      });
      let oldies = [];
      oldEvents.forEach((event) => {
        oldies.push(event.returnValues._value + ", ");
      });
      setOldEvents(oldies);

      await contract.events
        .valueChanged({ fromBlock: "earliest" })
        .on("data", (event) => {
          let lesevents = event.returnValues._value;
          console.log("lesevents", lesevents);
          setEventValue(lesevents);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    spanEle2.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value, greeter]);

  return (
    <code>
      {`contract SimpleStorage {
  uint256 value = `}
      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>
      {`;
    string greeter = `}
      <span className="secondary-color" ref={spanEle2}>
        <strong>"{greeter}"</strong>
      </span>
      {`;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }

  function setGreet(string memory _greet) public {
      greeter = _greet;
  }

  function greet() public view returns (string memory) {
      return greeter;
  }

  Events arriving: `}
      {eventValue}
      {` Old events: `}
      {oldEvents}
    </code>
  );
}

export default Contract;
