pragma solidity ^0.5.0;

import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Splitter{

    using SafeMath for uint256;

    struct Actor{
        address payable account; 
        uint percentage;
    }
    
    address public owner;
    address public splitterAddress;
    uint currentTotalPercentage = 0;
    mapping(address => uint) public balances;
    mapping(address => uint) public percentages;   
    mapping(address => Actor) public addresstoActor;
    Actor[] public actors;

    constructor(address _owner) public {
        owner = _owner;
    } 

    function createActor(address payable _actor, uint _percentage) public {
        uint nextPercentage = currentTotalPercentage.add(_percentage);
        require(nextPercentage <= 100,"percentage has to be between 1 and 100");
        Actor memory actor = Actor(_actor,_percentage);
        currentTotalPercentage = nextPercentage;
        actors.push(actor);
    }

    function splitMoney(uint value) public {
        for (uint index = 0; index < actors.length; index++) {
            uint amountToTransfer = split(value, actors[index].percentage);
            actors[index].account.transfer(amountToTransfer);
        }
    }

     function split(uint _amount, uint _percentage) private pure returns(uint){
        return _amount.mul(_percentage).div(100);
    }

    function restSplit(uint _number, uint _percentageOwner, uint _percentagePartner) private pure returns(uint){
        uint hundred = 100;
        uint percentage = hundred.sub(_percentageOwner.add(_percentagePartner));
        return _number.mul(percentage).div(100);
    }

    function() external payable {
        splitMoney(msg.value);
    }
}
