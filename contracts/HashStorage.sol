pragma solidity >=0.4.21 <0.6.0;

contract HashStorage {

  // state variables
  struct HashInfo{
  uint fileHashId;
  address fileSigner;
  string ipfsFileHash;
  }

  // mapping an id(fileHashId) to each HashInfo
  mapping (uint => HashInfo) hashInfos;
  // create a counter to increment the fileHashId
  uint hashCounter;

  // Set ipfs File Hash on the blockchain
  function set(string memory _ipfsFileHash) public {
    // increment the hasconter for adding a new hash
    hashCounter++;

    // store this hash
    hashInfos[hashCounter] = HashInfo(
      hashCounter,
      msg.sender, //We retrieve the adress of the account that signed the transaction
      _ipfsFileHash
    );
  }

  //get the number of hash stored on the blockchain
  function getNumberOfIpfsFileHash() public view returns (uint) {
    return hashCounter;
  }

  //get the last hash that have been stored on the blockchain
  function getLastFileHash() public view returns (string memory) {
    return (hashInfos[hashCounter].ipfsFileHash);
  }

  // Get ipfs File Hash by HashId
  function getFileHashById(uint _fileHashId) public view returns (address txsigner, string memory ipfsFileHash) {
    return(
      hashInfos[_fileHashId].fileSigner,
      hashInfos[_fileHashId].ipfsFileHash
      );
  }
}
