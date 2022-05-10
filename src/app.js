//Here we create Javascript app that talks with blockchain
//const Web3 = require('web3');


App = {

  loading: false,
  contracts: {},

    // here we will mention all the futions defined below to load when page is reloaded.
    load: async () => {
        //Load app...
       await App.loadWeb3()
       await App.loadAccount()
       await App.loadContract()
       await App.render()
      //  web3.eth.defaultAccount = App.account
    },
    
    // Connection to the blockchain : Follow metamask connect to blockchain with Web3 documentation
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },

    //retrive the account
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0];
      // web3.eth.defaultAccount = App.account;
     web3.eth.defaultAccount=web3.eth.accounts[0];
      //console.log(App.account);
      console.log(web3.eth.defaultAccount);
    },

    //retrive the contracts
    loadContract: async () => {
      // create a javascript version of the smart contract i.e. passing our contract into a variable todoList
      const todoList = await $.getJSON('TodoList.json')
      // then covering todoList varible with truffle so that through Web3 , blockchain can interact with data and all the functions
      //we define in our contracts. 
      App.contracts.TodoList = TruffleContract(todoList)
      App.contracts.TodoList.setProvider(App.web3Provider)
    
      //Hydrate the smart contract with the values from the Blockchain
       App.todoList = await App.contracts.TodoList.deployed()
    },

    render: async () => {
      //Prevent Double Render Error
      if (App.loading){
        return
      }

      //Update app loading state to true so that loading icon visible on UI and content(i.e. our todoList) is hidden
      //through setLoading function define below
      App.setLoading(true)

      // Render Account to UI
      $('#account').html(App.account)
      // Render tasks 
      await App.renderTasks()
      
      //Update app loading state to false so that loading icon get hidden on UI and  content(i.e. our todoList) is visible
      //through setLoading function define below
      App.setLoading(false)
    },

     renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.tasksCount()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
   
  },

  createTasks: async () => {
    App.setLoading(true)
    const content = $('#newTask').val()
   await App.todoList.createTask(content)
    window.location.reload()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskID = e.target.name
    await App.todoList.toggleCompleted(taskID)
    window.location.reload()
  },
    //function to display loading icon or content i.e. our todoList on UI 
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $("#content")
      if(boolean){
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }

    
}
$(() => {
    $(window).load(() => {
      App.load()
    })
  })

//   $(() => {
//     $(window).load(() => {
//       App.load()
//     })
//   })
