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
  bytes32[] public splitterNames;

  function createSplitter(address payable _actor, uint _percentage, bytes32 _name) public onlyOwner{
    require(_actor != address(0), 'invalid address');
    address payable splitterAddress = address(new Splitter(owner()));
    Splitter splitter = Splitter(splitterAddress);
    splitter.createActor(_actor,_percentage);
    splitters.push(splitter);
    splittersAddresses.push(splitterAddress);
    splitterNames.push(_name);
    emit LogCreateSplitter(_actor, _percentage, splitterAddress);
  }

  function appendSplitter(address payable splitterAddress, address payable _actor, uint _percentage) public{
    Splitter splitter = Splitter(splitterAddress);
    splitter.createActor(_actor,_percentage);
    splitters.push(splitter);
  }

  //TODO: return el address y el nombre
  //TODO: guardar el nombre
  function getSplitters()public view returns (address[] memory, bytes32[] memory) {
   return (splittersAddresses,splitterNames);
}

/*
  function getSplitterOwner(address payable _splitterAddress) public view returns (address){
    Splitter splitter = Splitter(_splitterAddress);
    return splitter.owner();
  }
*/

}
