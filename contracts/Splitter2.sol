pragma solidity ^0.5.0;

contract SplitterAlone{

    struct Actor{
        address payable account; 
        uint amount;
    }
    
    function processSpliter(uint[] memory amounts, address payable[] memory addresses)  public payable {
        for (uint index = 0; index < amounts.length; index++) {
              addresses[index].transfer(amounts[index]);
        }
     
    }
}
