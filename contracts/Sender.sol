pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Sender is Ownable {

    uint authorizedBalanceTotal;
    mapping(address => uint) userToBalance;

    modifier hasEnoughFunds(uint _authorizeBalance) {
        require(_authorizeBalance + authorizedBalanceTotal <= address(this).balance, "Can't authorize more balance than available");
        _;
    }

    function addFundsToContract() external payable onlyOwner {
        address(this).balance += msg.value;
    }    

    function addFundsToUser(uint _funds, address _user) external onlyOwner hasEnoughFunds {
        userToBalance[_user] += _funds;
        authorizedBalanceTotal += _funds;
    }

    function getMoneyFromContract(address _to, address _from, uint _amount) external {
        require(userToBalance[_from] >= _amount, "User has not enough funds");
        _to.transfer(_amount);
        userToBalance[_from] -= _amount;
        authorizedBalanceTotal -= _amount;
    }
}