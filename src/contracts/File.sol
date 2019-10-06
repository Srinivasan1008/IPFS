pragma solidity ^0.5.0;
contract File {
//smart contract
string fileHash;//global
//write
function set (string memory _fileHash) public{
      fileHash = _fileHash;
}
//read
function get() public view returns (string memory)
{
    return fileHash;
}
}