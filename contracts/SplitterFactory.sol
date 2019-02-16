pragma solidity ^0.5.0;
import "./Splitter.sol";
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract SplitterFactory is Ownable {

  event LogCreateSplitter(address _actor, uint _percentage, address _splitterAddress);

  modifier onlyOwner() {
      require(isOwner(), "not authorized");
      _;
  }

  Splitter[] public splitters ;

  function createSplitter(address _actor, uint _percentage) public onlyOwner{
    require(_actor != address(0), 'invalid address');
    address splitterAddress = address(new Splitter(owner()));
    Splitter splitter = Splitter(splitterAddress);
    //TODO: Create splitter and check if percentage is less than 100
    splitter.createActor(_actor,_percentage);
    splitters.push(splitter);
    emit LogCreateSplitter(_actor, _percentage, splitterAddress);
  }

  function getSplitterOwner(address _splitterAddress) public view returns (address){
    Splitter splitter = Splitter(_splitterAddress);
    return splitter.owner();
  }

}
