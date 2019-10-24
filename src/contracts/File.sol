pragma solidity ^0.5.0;
contract File {
//smart contract
string fileHash='QmbN76A1SYeDaN3z1NwyncsHyyCyDroGE9hLU5EL9GfwK1';//global
string account;
string[2][10] table = [['0x9F44A2e74943d2233c2232185768B8627d8Fe5C0',''],
['0xae4272F02887FF1B8fedF7864ba4841F73fd7Bb2',''],
['0xce0FEc4B6Dd87a5be6c4151c45ae4CD5A8508C6e',''],
['0x49fe3d50FA3ac255150B943a0f0aAA8275175A3f',''],
['0x44359EECEFbDAb93FB8c82639161D0B03ac1714C',''],
['0x2f63668C2AFD2c97FE2729E376262BFdcA59A61F',''],
['0x15b52C7C1A1686193DEEF300C4012a5D12F31ADA',''],
['0x405359b59C62d1D9cDAB2b6A04c0fEaEf2f3847A',''],
['0x512200CEe7f828D664df8D61af857B1a683B4Aad',''],
['0x11b4015Dec42BACd6EFc52B349dDE00C49C2a62b','']
];
function compareStrings (string memory a, string memory b) public view returns (bool) {
           return(keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
       }
//write
function set (string memory _account,string memory _fileHash) public {
      account = _account;
      fileHash = _fileHash;
      for(uint i = 0; i < 10; i++){
         if(compareStrings(account,table[i][0])){
             table[i][1] = fileHash;
         }
      }


}
//read
function get(string memory _account)  public returns(string memory){
    account = _account;
    for(uint i = 0; i < 10; i++){
if(compareStrings(account,table[i][0])){
             if(compareStrings(table[i][1],'')){
                 return fileHash = 'QmbN76A1SYeDaN3z1NwyncsHyyCyDroGE9hLU5EL9GfwK1';
             }
             else{
             fileHash = table[i][1];
             return fileHash;
             }
}

    }
}
//function setstate() public view returns (string memory){
           //return fileHash ;
//}

}