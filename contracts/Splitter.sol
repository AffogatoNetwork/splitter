pragma solidity ^0.5.0;

import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Splitter{

    using SafeMath for uint256;

    struct Actor{
        uint balance;
        address account;
    }
    
    address public owner;
    address public splitterAddress;
    mapping(address => uint) public balances;
    mapping(address => uint) public percentages;   

    constructor(address _owner) public {
        owner = _owner;
    } 
}
