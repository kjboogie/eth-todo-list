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

  //we are creating an event so thaat we can trigger functions of our contract through blockchain.
  // or blockchain can access our functions from contract
  event TaskCreated(
  uint id,
  string content,
  bool completed
  );

  event taskCompleted(
    uint id,
    bool completed 
    );

  // constructor runs default whenever smartContract is deployed, So we ar      e adding some default tasks in Todo List
  constructor() public {
    createTask("Check Out Boogie");
  }

  //function to create new task
  function createTask(string memory _content) public {
    tasksCount ++;
    tasks[tasksCount] = Task(tasksCount, _content, false);
    emit TaskCreated(tasksCount, _content, false);
  }


  // funtion to seperate completed task
  function toggleCompleted(uint _id) public {
    // read task out of mapping "tasks"
    Task memory _task = tasks[_id];    
    _task.completed = !_task.completed; // it changes complete status to false if true or vise-versa
    tasks[_id] = _task;  // putting back task back to mapping
    emit taskCompleted(_id, _task.completed);
  }

}