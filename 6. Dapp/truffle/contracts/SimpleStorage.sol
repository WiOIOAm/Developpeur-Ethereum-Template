// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract SimpleStorage {
    uint256 value;
    string greeter;
    event valueChanged(uint256 _value);

    function read() public view returns (uint256) {
        return value;
    }

    function write(uint256 newValue) public {
        value = newValue;
        emit valueChanged(newValue);
    }

    function setGreet(string memory _greet) public {
        greeter = _greet;
    }

    function greet() public view returns (string memory) {
        return greeter;
    }
}
