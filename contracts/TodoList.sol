// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

//Contacts are crrated using "contract" keyword
contract TodoList {

 //State variable inside solidity are actually written to the blockchain.
 //They actually represents state of the smart contract on the blockchain
  uint public tasksCount = 0;

  // Solidity allows you to define you data types through structs
  struct Task {
    uint id;
    string content;
    bool completed; 
  }
  
  //mapping in solidity is like associated array or hash in other programing languages. Key-Value pair.
  mapping(uint => Task) public tasks;

  // constructor runs default whenever smartContract is deployed, So we aree adding some default tasks in Todo List
  constructor() public {
    createTask("Check Out Boogie");
  }

  function createTask(string memory _content) public {
    tasksCount ++;
    tasks[tasksCount] = Task(tasksCount,_content, false);
  }

}