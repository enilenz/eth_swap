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

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event justStrings (
        string description,
        string value
    );

    function buyTokens() public payable {
        uint tokenAmount = msg.value * rate;

        require(token.balanceOf(address(this)) >= tokenAmount, 'insufficient funds');

        token.transfer(msg.sender, tokenAmount);


        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
        emit justStrings('description of string', 'value of string');

    }

    function sellTokens(uint _amount) public {
        require(token.balanceOf(msg.sender) >= _amount);
        
        address payable customer = payable(msg.sender);
        
        uint etherAmount = _amount / rate;

        require(address(this).balance >= etherAmount);
        
        token.transferFrom(msg.sender, address(this), _amount);
        customer.transfer(etherAmount);

        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}