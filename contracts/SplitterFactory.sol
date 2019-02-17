pragma solidity ^0.5.0;
import "./Splitter.sol";
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract SplitterFactory is Ownable {

  event LogCreateSplitter(address _actor, uint _percentage, address _splitterAddress);

  modifier onlyOwner() {
      require(isOwner(), "not authorized");
      _;
  }

  Splitter[] public splitters;
  address[] public splittersAddresses;

  function createSplitter(address payable _actor, uint _percentage) public onlyOwner{
    require(_actor != address(0), 'invalid address');
    address payable splitterAddress = address(new Splitter(owner()));
    Splitter splitter = Splitter(splitterAddress);
    splitter.createActor(_actor,_percentage);
    splitters.push(splitter);
    splittersAddresses.push(splitterAddress);
    emit LogCreateSplitter(_actor, _percentage, splitterAddress);
  }

  function appendSplitter(address payable splitterAddress, address payable _actor, uint _percentage) public{
    Splitter splitter = Splitter(splitterAddress);
    splitter.createActor(_actor,_percentage);
    splitters.push(splitter);
  }

  function getSplitters()public view returns (address[] memory a ) {
   return splittersAddresses;
}

/*
  function getSplitterOwner(address payable _splitterAddress) public view returns (address){
    Splitter splitter = Splitter(_splitterAddress);
    return splitter.owner();
  }
*/

}
