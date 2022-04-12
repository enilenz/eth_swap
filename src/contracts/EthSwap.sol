//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.21 <0.9.0;

import "./Token.sol";

contract EthSwap{

    string public name = "Eth swap exchange";
    Token public token;
    uint public rate = 100;

    constructor(Token _token) public {
       token = _token;
    }

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    function buyTokens() public payable {
        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);

        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }
}